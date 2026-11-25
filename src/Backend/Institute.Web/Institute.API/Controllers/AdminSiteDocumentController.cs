using Institute.Application.Interfaces.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Institute.API.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    [Authorize]
    public class AdminSiteDocumentController : ControllerBase
    {
        private const long MaxBytes = 20 * 1024 * 1024;
        private static readonly string[] Protected = { "AnnualTrainingPlan", "StrategicPlan" };
        private readonly ISiteDocumentService _service;

        public AdminSiteDocumentController(ISiteDocumentService service) => _service = service;

        private static string? ValidatePdf(IFormFile file)
        {
            if (file.Length == 0) return "لم يتم اختيار ملف";
            if (file.Length > MaxBytes) return "الحد الأقصى لحجم الملف 20 ميجا";
            var isPdf = string.Equals(Path.GetExtension(file.FileName), ".pdf", StringComparison.OrdinalIgnoreCase)
                        && file.ContentType == "application/pdf";
            return isPdf ? null : "مسموح بملفات PDF فقط";
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

        [HttpPost]
        [RequestSizeLimit(MaxBytes)]
        public async Task<IActionResult> Create([FromForm] CreateSiteDocumentDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Title))
                return BadRequest(new { message = "العنوان مطلوب" });

            if (dto.File != null)
            {
                var err = ValidatePdf(dto.File);
                if (err != null) return BadRequest(new { message = err });
            }

            return Ok(await _service.CreateAsync(dto));
        }

        [HttpPut("{docKey}")]
        public async Task<IActionResult> Update(string docKey, [FromBody] UpdateSiteDocumentDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Title))
                return BadRequest(new { message = "العنوان مطلوب" });

            var result = await _service.UpdateAsync(docKey, dto);
            return result == null ? NotFound(new { message = "الملف غير موجود" }) : Ok(result);
        }

        [HttpDelete("{docKey}")]
        public async Task<IActionResult> Delete(string docKey)
        {
            if (Protected.Contains(docKey, StringComparer.OrdinalIgnoreCase))
                return BadRequest(new { message = "لا يمكن حذف هذه الوثيقة الأساسية" });

            var ok = await _service.DeleteAsync(docKey);
            return ok ? Ok(new { message = "تم الحذف" }) : NotFound(new { message = "الملف غير موجود" });
        }

        [HttpPost("{docKey}/file")]
        [RequestSizeLimit(MaxBytes)]
        public async Task<IActionResult> Upload(string docKey, IFormFile file)
        {
            if (file == null) return BadRequest(new { message = "لم يتم اختيار ملف" });
            var err = ValidatePdf(file);
            if (err != null) return BadRequest(new { message = err });

            var result = await _service.UploadAsync(docKey, file);
            return result == null ? NotFound(new { message = "الملف غير موجود" }) : Ok(result);
        }
    }
}