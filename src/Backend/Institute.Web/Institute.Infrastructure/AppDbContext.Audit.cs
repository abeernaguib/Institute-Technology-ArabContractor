using Institute.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Institute.Infrastructure;

public record FieldChange(string Field, string? Old, string? New, bool Long);
public record AuditChange(string Action, string Entity, string? Key, string? Label, List<FieldChange> Fields);

public partial class AppDbContext
{
    // filled on every SaveChanges, read and cleared by AdminActivityFilter
    public List<AuditChange> AuditChanges { get; } = new();

    private static readonly HashSet<string> SkipProps = new(StringComparer.OrdinalIgnoreCase)
        { "PasswordHash", "PasswordSalt", "UserPassword", "CreatedAt", "UpdatedAt" };

    private static readonly string[] LabelProps =
        { "Name", "Title", "CourseName", "CourseTitle", "PlanName", "LecturerName", "ATitel",
          "TypeName", "FileTitle", "Username", "Email", "RefNumber", "OrderNumber" };

    private sealed class Pending
    {
        public EntityEntry Entry = null!;
        public string Action = "";
        public string? Key;
        public string? Label;
        public List<FieldChange> Fields = new();
    }

    public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess,
        CancellationToken cancellationToken = default)
    {
        List<Pending> pending;
        try { pending = await CollectAsync(cancellationToken); } catch { pending = new(); }   // never break the real save

        var result = await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);

        foreach (var p in pending)
        {
            try
            {
                if (p.Action == "Create") p.Key = KeyOf(p.Entry);   // id exists only after save
                AuditChanges.Add(new AuditChange(p.Action, p.Entry.Metadata.ClrType.Name,
                                                 p.Key, p.Label, p.Fields));
            }
            catch { }
        }
        return result;
    }

    private async Task<List<Pending>> CollectAsync(CancellationToken ct)
    {
        ChangeTracker.DetectChanges();
        var list = new List<Pending>();

        foreach (var e in ChangeTracker.Entries().ToList())
        {
            if (e.Entity is AdminActivityLog) continue;
            if (e.State != EntityState.Added && e.State != EntityState.Modified
                && e.State != EntityState.Deleted) continue;

            var p = new Pending
            {
                Entry = e,
                Action = e.State == EntityState.Added ? "Create"
                       : e.State == EntityState.Deleted ? "Delete" : "Update",
                Label = LabelOf(e),
                Key = e.State == EntityState.Added ? null : KeyOf(e)
            };

            // For updates: the values that are in the database right now (= the "old" values)
            PropertyValues? dbValues = null;
            if (e.State == EntityState.Modified)
            {
                try { dbValues = await e.GetDatabaseValuesAsync(ct); } catch { }
            }

            foreach (var prop in e.Properties)
            {
                var name = prop.Metadata.Name;
                if (SkipProps.Contains(name) || prop.Metadata.IsPrimaryKey()) continue;
                if (prop.CurrentValue is byte[]) continue;

                if (e.State == EntityState.Modified)
                {
                    var oldVal = dbValues != null ? dbValues[name] : prop.OriginalValue;
                    if (Equals(oldVal, prop.CurrentValue)) continue;   // unchanged
                    p.Fields.Add(new FieldChange(name, Fmt(oldVal), Fmt(prop.CurrentValue),
                        IsLong(oldVal) || IsLong(prop.CurrentValue)));
                }
                else
                {
                    var v = prop.CurrentValue;
                    if (IsEmpty(v)) continue;
                    if (p.Fields.Count >= 8) break;
                    p.Fields.Add(e.State == EntityState.Added
                        ? new FieldChange(name, null, Fmt(v), IsLong(v))
                        : new FieldChange(name, Fmt(v), null, IsLong(v)));
                }
            }
            list.Add(p);
        }
        return list;
    }

    private static string? KeyOf(EntityEntry e)
    {
        var k = e.Metadata.FindPrimaryKey();
        if (k == null) return null;
        return string.Join("-", k.Properties.Select(pr => e.Property(pr.Name).CurrentValue?.ToString()));
    }

    private static string? LabelOf(EntityEntry e)
    {
        foreach (var n in LabelProps)
        {
            var pr = e.Properties.FirstOrDefault(x => x.Metadata.Name == n);
            if (pr?.CurrentValue is string s && !string.IsNullOrWhiteSpace(s))
                return s.Length > 80 ? s[..80] : s;
        }
        return null;
    }

    private static bool IsLong(object? v) => v is string s && s.Length > 120;   // rich text / base64

    private static bool IsEmpty(object? v) =>
        v == null
        || (v is string s && string.IsNullOrWhiteSpace(s))
        || (v is int i && i == 0)
        || (v is bool b && !b)
        || (v is DateTime d && d.Year < 2);

    private static string Fmt(object? v) => v switch
    {
        null => "—",
        bool b => b ? "نعم" : "لا",
        DateTime d => d.ToString("yyyy-MM-dd HH:mm"),
        string s => string.IsNullOrWhiteSpace(s) ? "—" : s,
        _ => v.ToString() ?? "—"
    };
}