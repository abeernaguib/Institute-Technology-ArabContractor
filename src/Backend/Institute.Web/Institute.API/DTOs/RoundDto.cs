namespace Institute.API.DTOs
{
    public class RoundDto
    {
        public int Id { get; set; }
        public string StartDate { get; set; } = "";
        public string EndDate { get; set; } = "";
        public bool IsBookable { get; set; }   // decided by the server (Cairo time)
    }
}