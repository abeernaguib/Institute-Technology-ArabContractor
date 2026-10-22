namespace Institute.Application.Exceptions;

/// A user-facing rule violation (shown as HTTP 400, message in Arabic).
public class BusinessRuleException : Exception
{
    public BusinessRuleException(string message) : base(message) { }
}