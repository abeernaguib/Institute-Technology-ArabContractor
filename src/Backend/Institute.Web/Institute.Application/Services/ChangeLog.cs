namespace Institute.Application.Services
{
    public static class ChangeLog
    {
        private static string Fmt(object? v) => v switch
        {
            null => "—",
            bool b => b ? "نعم" : "لا",
            string s => string.IsNullOrWhiteSpace(s) ? "—" : s,
            _ => v.ToString() ?? "—"
        };

        // Returns only the fields that actually changed.
        public static string Diff(params (string Field, object? Old, object? New)[] fields)
        {
            var parts = new List<string>();
            foreach (var (f, o, n) in fields)
                if (Fmt(o) != Fmt(n))
                    parts.Add($"{f}: من «{Fmt(o)}» إلى «{Fmt(n)}»");
            return string.Join(" | ", parts);
        }
    }
}