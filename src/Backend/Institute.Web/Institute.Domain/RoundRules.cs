using Institute.Domain.Entities;

namespace Institute.Domain;

public static class RoundRules
{
    // 0 = a round can only be bought BEFORE its start day (strict rule A).
    // Set to N to allow buying until N-1 days after the start date.
    public const int GraceDays = 0;

    private static readonly TimeZoneInfo CairoTz = FindCairo();

    private static TimeZoneInfo FindCairo()
    {
        foreach (var id in new[] { "Egypt Standard Time", "Africa/Cairo" })
        {
            try { return TimeZoneInfo.FindSystemTimeZoneById(id); } catch { }
        }
        return TimeZoneInfo.Utc;
    }

    public static DateTime TodayCairo() =>
        TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, CairoTz).Date;

    public static bool IsBookable(PlanworkRound r) =>
        r.IsActive && r.StartDate.Date.AddDays(GraceDays) > TodayCairo();
}