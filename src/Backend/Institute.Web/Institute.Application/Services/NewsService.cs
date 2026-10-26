using Institute.Application.DTOs;
using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Institute.Application.Services
{
    public class NewsService : INewsService
    {
        private readonly IRepository<Dailynews> _newsRepo;
        private readonly IRepository<NewsPic> _picRepo;
        private readonly IBlobStorage _blobStorage;
        private readonly IConfiguration _config;

        private const string Container = "icemt";
        private const string Folder = "news";

        public NewsService(
            IRepository<Dailynews> newsRepo,
            IRepository<NewsPic> picRepo,
            IBlobStorage blobStorage,
            IConfiguration config)
        {
            _newsRepo = newsRepo;
            _picRepo = picRepo;
            _blobStorage = blobStorage;
            _config = config;
        }

        // ── CREATE ───────────────────────────────
        public async Task<NewsCreateUpdateDto> CreateAsync(NewsCreateUpdateDto dto)
        {
            var entity = new Dailynews
            {
                ATitel = dto.Title,
                ADetails = dto.Details,
                NewsDate = dto.Date,
                Approved = true,
                ShowFlag = dto.ShowFlag
            };

            await _newsRepo.AddAsync(entity);
            await _newsRepo.SaveChangesAsync();

            if (dto.Images != null && dto.Images.Any())
                await UploadAndSavePicsAsync(entity.NewsId, dto.Images, dto.NewPics);

            await EnsureStartUpAsync(entity.NewsId);

            return ToDto(entity, await GetExistingBlobNames(entity.NewsId));
        }

        // ── UPDATE ───────────────────────────────
        public async Task<NewsCreateUpdateDto?> UpdateAsync(int id, NewsCreateUpdateDto dto)
        {
            var entity = await _newsRepo.GetByIdAsync(id);
            if (entity == null) return null;

            entity.ATitel = dto.Title;
            entity.ADetails = dto.Details;
            entity.NewsDate = dto.Date;
            entity.ShowFlag = dto.ShowFlag;
            _newsRepo.Update(entity);
            await _newsRepo.SaveChangesAsync();

            // ✅ update checkbox + priority of existing images
            var pics = (await _picRepo.GetAllAsync()).Where(p => p.NewsId == id).ToList();
            if (dto.ExistingPics != null)
            {
                foreach (var m in dto.ExistingPics)
                {
                    var pic = pics.FirstOrDefault(p => p.PicId == m.PicId);
                    if (pic == null) continue;

                    pic.StartUpPic = m.StartUpPic;
                    pic.PicPeriorty = m.Priority;
                    _picRepo.Update(pic);
                }
                await _picRepo.SaveChangesAsync();
            }

            if (dto.Images != null && dto.Images.Any())
            {
                var lastPriority = pics.Max(p => p.PicPeriorty) ?? 0;
                await UploadAndSavePicsAsync(id, dto.Images, dto.NewPics, lastPriority);
            }

            await EnsureStartUpAsync(id);

            return ToDto(entity, await GetExistingBlobNames(id));
        }

        // ── DELETE NEWS ───────────────────────────
        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _newsRepo.GetByIdAsync(id);
            if (entity == null) return false;

            var pics = (await _picRepo.GetAllAsync())
                .Where(p => p.NewsId == id)
                .ToList();

            // امسح كل الصور من Azure أولاً
            foreach (var pic in pics)
            {
                if (!string.IsNullOrWhiteSpace(pic.ImageName))
                    await _blobStorage.DeleteFileAsync(pic.ImageName, Container, Folder);

                _picRepo.Delete(pic);
            }

            if (pics.Any())
                await _picRepo.SaveChangesAsync();

            _newsRepo.Delete(entity);
            await _newsRepo.SaveChangesAsync();

            return true;
        }

        // ── DELETE SINGLE IMAGE ───────────────────
        public async Task<bool> DeleteImageAsync(int newsId, int picId)
        {
            var pic = (await _picRepo.GetAllAsync())
                .FirstOrDefault(p => p.PicId == picId && p.NewsId == newsId);
            if (pic == null) return false;

            if (!string.IsNullOrWhiteSpace(pic.ImageName))
                await _blobStorage.DeleteFileAsync(pic.ImageName, Container, Folder);

            _picRepo.Delete(pic);
            await _picRepo.SaveChangesAsync();

            var remaining = (await _picRepo.GetAllAsync())
                .Where(p => p.NewsId == newsId)
                .OrderBy(p => p.PicPeriorty)
                .ToList();

            // renumber priority only — do NOT touch StartUpPic anymore
            for (int i = 0; i < remaining.Count; i++)
            {
                remaining[i].PicPeriorty = i + 1;
                _picRepo.Update(remaining[i]);
            }
            if (remaining.Any()) await _picRepo.SaveChangesAsync();

            await EnsureStartUpAsync(newsId);
            return true;
        }

        // ── UPLOAD MULTIPLE IMAGES ────────────────
        private async Task UploadAndSavePicsAsync(
            int newsId,
            List<IFormFile> images,
            List<NewsPicMetaDto>? metas,
            int startPriority = 0)
        {
            int next = startPriority + 1;

            for (int i = 0; i < images.Count; i++)
            {
                var meta = metas != null && i < metas.Count ? metas[i] : null;
                var blobPath = await _blobStorage.UploadFileAsync(images[i], Container, Folder);

                await _picRepo.AddAsync(new NewsPic
                {
                    NewsId = newsId,
                    ImageName = Path.GetFileName(blobPath),
                    StartUpPic = meta?.StartUpPic ?? (next == 1),
                    PicPeriorty = meta?.Priority ?? next
                });
                next++;
            }

            await _picRepo.SaveChangesAsync();
        }

        // a news item must always have at least one start-up image
        private async Task EnsureStartUpAsync(int newsId)
        {
            var pics = (await _picRepo.GetAllAsync())
                .Where(p => p.NewsId == newsId)
                .OrderBy(p => p.PicPeriorty)
                .ToList();

            if (pics.Count == 0 || pics.Any(p => p.StartUpPic == true)) return;

            pics[0].StartUpPic = true;
            _picRepo.Update(pics[0]);
            await _picRepo.SaveChangesAsync();
        }

        // ── GET ALL EXISTING BLOB NAMES ───────────
        private async Task<List<string?>> GetExistingBlobNames(int newsId)
        {
            return (await _picRepo.GetAllAsync())
                .Where(p => p.NewsId == newsId)
                .OrderBy(p => p.PicPeriorty)
                .Select(p => p.ImageName)
                .ToList();
        }

        // ── GET URL ───────────────────────────────
        private string? GetImageUrl(string? blobName)
        {
            if (string.IsNullOrWhiteSpace(blobName))
                return null;

            var baseUrl = _config["AzureStorage:BaseUrl"];
            return $"{baseUrl?.TrimEnd('/')}/news/{blobName.TrimStart('/')}";
        }

        // ── TO DTO ────────────────────────────────
        private NewsCreateUpdateDto ToDto(
            Dailynews entity,
            List<string?> blobNames)
        {
            return new NewsCreateUpdateDto
            {
                Id = entity.NewsId,
                Title = entity.ATitel,
                Details = entity.ADetails,
                Date = entity.NewsDate ?? DateTime.UtcNow,
                ImageUrl = blobNames.FirstOrDefault(),
                ImageUrls = blobNames,
                ShowFlag = entity.ShowFlag
            };
        }
    }
}