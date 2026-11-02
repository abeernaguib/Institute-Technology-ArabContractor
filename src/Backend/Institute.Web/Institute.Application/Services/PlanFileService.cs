using Institute.Application.DTOs.AdminDtos;
using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Domain.Entities;
using Institute.Domain.specifications.AdminSpec.Planfiles;
using Microsoft.Extensions.Configuration;

namespace Institute.Application.Services
{
    public class PlanFileService : IPlanFileService
    {
        private readonly IRepository<PlanFile> _planFileRepo;
        private readonly IBlobStorage _blobStorage;
        private readonly IConfiguration _config;

        private const string Container = "icemt";
        private const string Folder = "planfiles";

        public PlanFileService(
            IRepository<PlanFile> planFileRepo,
            IBlobStorage blobStorage,
            IConfiguration config)
        {
            _planFileRepo = planFileRepo;
            _blobStorage = blobStorage;
            _config = config;
        }

        // ── GET FILES ───────────────────────────────
        public async Task<IEnumerable<PlanFileDto>> GetFilesAsync(int planId)
        {
            var spec = new PlanFilesByPlanIdSpec(planId);

            var files = await _planFileRepo.GetAllWithSpecAsync(spec);

            return files.Select(x => new PlanFileDto
            {
                PlanId = x.PlanId,
                FileId = x.FileId,
                FileTitle = x.FileTitle,
                FilePeriorty = x.FilePeriorty,

                // ✅ يرجع URL كامل
                FileName = BuildFileUrl(x.FileName)
            });
        }

        // ── ADD ─────────────────────────────────────
        public async Task AddAsync(CreatePlanFileDto dto)
        {
            var spec = new PlanFilesByPlanIdSpec(dto.PlanId);

            var existingFiles =
                await _planFileRepo.GetAllWithSpecAsync(spec);

            int nextFileId = existingFiles.Any()
                ? existingFiles.Max(x => x.FileId) + 1
                : 1;

            // ✅ Upload To Azure Blob
            var uploadedFileName = await _blobStorage.UploadFileAsync(
                dto.File,
                Container,
                Folder);

            var planFile = new PlanFile
            {
                PlanId = dto.PlanId,
                FileId = nextFileId,
                FileTitle = dto.FileTitle,
                FilePeriorty = dto.FilePeriorty,

                // ✅ اسم الملف فقط
                FileName = uploadedFileName
            };

            await _planFileRepo.AddAsync(planFile);

            await _planFileRepo.SaveChangesAsync();
        }

        // ── UPDATE ──────────────────────────────────
        // Updates title / priority, and replaces the file only when a new one is sent.
        public async Task<bool> UpdateAsync(int fileId, UpdatePlanFileDto dto)
        {
            var spec = new PlanFileByIdSpec(dto.PlanId, fileId);

            var file = await _planFileRepo.GetByIdWithSpecAsync(spec);

            if (file == null)
                return false;

            if (dto.FileTitle != null)
                file.FileTitle = dto.FileTitle;

            if (dto.FilePeriorty.HasValue)
                file.FilePeriorty = dto.FilePeriorty;

            string? oldName = null;

            if (dto.File != null && dto.File.Length > 0)
            {
                oldName = file.FileName;

                file.FileName = await _blobStorage.UploadFileAsync(
                    dto.File,
                    Container,
                    Folder);
            }

            _planFileRepo.Update(file);

            await _planFileRepo.SaveChangesAsync();

            // the replaced file is no longer needed (unless it has the same name = it was overwritten in place)
            if (oldName != null &&
                !string.Equals(oldName, file.FileName, StringComparison.OrdinalIgnoreCase))
            {
                await DeleteBlobIfUnusedAsync(oldName);
            }

            return true;
        }

        // ── DELETE ──────────────────────────────────
        public async Task<bool> DeleteAsync(int planId, int fileId)
        {
            var spec = new PlanFileByIdSpec(planId, fileId);

            var file =
                await _planFileRepo.GetByIdWithSpecAsync(spec);

            if (file == null)
                return false;

            var oldName = file.FileName;

            _planFileRepo.Delete(file);

            await _planFileRepo.SaveChangesAsync();

            await DeleteBlobIfUnusedAsync(oldName);

            return true;
        }

        // ── Helpers ─────────────────────────────────
        // Removes the blob only if no other PlanFile row still points to the same file name
        private async Task DeleteBlobIfUnusedAsync(string? fileName)
        {
            if (string.IsNullOrWhiteSpace(fileName)) return;

            var stillUsed = await _planFileRepo.AnyAsync(f => f.FileName == fileName);

            if (!stillUsed)
                await _blobStorage.DeleteFileAsync(fileName, Container, Folder);
        }

        // ── BUILD FILE URL ──────────────────────────
        private string? BuildFileUrl(string? fileName)
        {
            if (string.IsNullOrWhiteSpace(fileName))
                return null;

            var baseUrl = _config["AzureStorage:BaseUrl"];

            return $"{baseUrl?.TrimEnd('/')}/planfiles/{fileName}";
        }
    }
}