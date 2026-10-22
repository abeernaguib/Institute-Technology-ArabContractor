namespace Institute.Application.Configurations;

public class RoundsOptions
{
    // false = legacy behavior (no round required). Flip to true after rounds are in place.
    public bool Enforce { get; set; } = false;
}