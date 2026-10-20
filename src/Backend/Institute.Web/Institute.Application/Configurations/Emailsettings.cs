namespace Institute.Application.Configurations
{
    public class EmailSettings
    {
        public bool Enabled { get; set; } = true;

        // SMTP account that SENDS the mail
        public string Host { get; set; } = "";
        public int Port { get; set; } = 587;
        public string UserName { get; set; } = "";
        public string Password { get; set; } = "";   // put in env var / user-secrets, NOT appsettings.json
        public string FromAddress { get; set; } = "";
        public string FromName { get; set; } = "ICMET";

        // Who RECEIVES the "order paid" notification (personal email now, company email later)
        public List<string> OrderNotificationRecipients { get; set; } = new();
    }
}