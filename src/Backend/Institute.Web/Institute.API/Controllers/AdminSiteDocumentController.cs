using Institute.Application.Interfaces.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Institute.API.Controllers
{
    // Admin: /api/admin/AdminSiteDocument
    [Route("api/admin/[controller]")]
    [ApiController]
    [Authorize]   // replace with the same attribute/policy used on your other admin controllers if different
    public class AdminSiteDocumentController : ControllerBase
    {
        private const long MaxBytes = 20 * 1024 * 1024; // 20MB
        private readonly ISiteDocumentService _service;

        public AdminSiteDocumentController(ISiteDocumentService service) => _service = service;

        // GET /api/admin/AdminSiteDocument
        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

        // POST /api/admin/AdminSiteDocument/{docKey}/file   (form-data key: "file")
        [HttpPost("{docKey}/file")]
        [RequestSizeLimit(MaxBytes)]
        public async Task<IActionResult> Upload(string docKey, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { message = "لم يتم اختيار ملف" });

            if (file.Length > MaxBytes)
                return BadRequest(new { message = "الحد الأقصى لحجم الملف 20 ميجا" });

            var isPdf = string.Equals(Path.GetExtension(file.FileName), ".pdf", StringComparison.OrdinalIgnoreCase)
                        && file.ContentType == "application/pdf";
            if (!isPdf)
                return BadRequest(new { message = "مسموح بملفات PDF فقط" });

            var result = await _service.UploadAsync(docKey, file);
            return result == null ? NotFound(new { message = "الملف غير موجود" }) : Ok(result);
        }
    }
}