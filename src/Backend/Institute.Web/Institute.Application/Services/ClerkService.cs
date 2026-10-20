using Institute.Application.DTOs;
using Institute.Application.Interfaces.IService;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Json;

namespace Institute.Application.Services
{
    public class ClerkService : IClerkService
    {
        private readonly HttpClient _client;
        private readonly IConfiguration _config;

        public ClerkService(HttpClient client, IConfiguration config)
        {
            _client = client;
            _config = config;

            _client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", _config["Clerk:SecretKey"]);
        }

        public async Task<ClerkUserDto?> GetUserAsync(string clerkUserId)
        {
            var res = await _client.GetAsync($"https://api.clerk.com/v1/users/{clerkUserId}");

            if (!res.IsSuccessStatusCode)
                return null;

            var json = await res.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(json);
            var root = doc.RootElement;

            // Phone is stored by the sign-up form in Clerk's unsafe_metadata.phone
            string? phone = null;
            if (root.TryGetProperty("unsafe_metadata", out var meta)
                && meta.ValueKind == JsonValueKind.Object
                && meta.TryGetProperty("phone", out var phoneEl)
                && phoneEl.ValueKind == JsonValueKind.String)
            {
                phone = phoneEl.GetString();
            }

            return new ClerkUserDto
            {
                ClerkUserId = clerkUserId,
                Email = root.GetProperty("email_addresses")[0]
                            .GetProperty("email_address").GetString()!,
                FirstName = root.GetProperty("first_name").GetString(),
                LastName = root.GetProperty("last_name").GetString(),
                Username = root.GetProperty("username").GetString(),
                Phone = phone
            };
        }

        public string? GetAuthenticatedUserId(ClaimsPrincipal user)
        {
            // Clerk بيضيف الـuser ID في claim باسم "sub"
            var claim = user.Claims.FirstOrDefault(c => c.Type == "sub");
            return claim?.Value;
        }
    }
}