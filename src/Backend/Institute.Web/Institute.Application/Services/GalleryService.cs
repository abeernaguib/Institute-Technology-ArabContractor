using System.Text.RegularExpressions;
using Institute.Application.DTOs;
using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Domain.Entities;
using Institute.Domain.specifications;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Institute.Application.Services
{
    public class GalleryService : IGalleryService
    {
        private readonly IRepository<GalleryCategory> _cats;
        private readonly IRepository<GalleryAlbum> _albums;
        private readonly IRepository<GalleryPhoto> _photos;
        private readonly IRepository<GalleryVideoGroup> _groups;
        private readonly IRepository<GalleryVideo> _videos;
        private readonly IBlobStorage _blob;
        private readonly IConfiguration _config;

        private const string Container = "icemt";
        private const string Folder = "gallery";
        private static readonly Regex YoutubeIdRegex = new(@"^[A-Za-z0-9_-]{11}$", RegexOptions.Compiled);

        public GalleryService(
            IRepository<GalleryCategory> cats, IRepository<GalleryAlbum> albums, IRepository<GalleryPhoto> photos,
            IRepository<GalleryVideoGroup> groups, IRepository<GalleryVideo> videos,
            IBlobStorage blob, IConfiguration config)
        {
            _cats = cats; _albums = albums; _photos = photos; _groups = groups; _videos = videos;
            _blob = blob; _config = config;
        }

        // ── helpers ───────────────────────────────────────────────────────
        // blob file name -> full URL; seeded values (/images/... or http...) are returned as they are
        private string? Url(string? pic)
        {
            if (string.IsNullOrWhiteSpace(pic)) return null;
            if (pic.StartsWith("http", StringComparison.OrdinalIgnoreCase) || pic.StartsWith("/")) return pic;
            return $"{_config["AzureStorage:BaseUrl"]?.TrimEnd('/')}/{Folder}/{pic}";
        }

        private static GalleryCategoryDto ToCategoryDto(GalleryCategory c) =>
            new(c.Id, c.Kind, c.Name, c.Description, c.DisplayOrder, c.IsActive);

        private static GalleryVideoDto ToVideoDto(GalleryVideo v) =>
            new(v.Id, v.YoutubeId, v.Title, v.DisplayOrder);

        private static string? Clean(string? s) => string.IsNullOrWhiteSpace(s) ? null : s.Trim();

        // Accepts the 11-character ID or a youtube.com / youtu.be link; returns null when invalid
        private static string? ExtractYoutubeId(string? input)
        {
            if (string.IsNullOrWhiteSpace(input)) return null;
            var s = input.Trim();
            if (YoutubeIdRegex.IsMatch(s)) return s;

            if (!Uri.TryCreate(s, UriKind.Absolute, out var uri)) return null;
            if (uri.Scheme != Uri.UriSchemeHttps && uri.Scheme != Uri.UriSchemeHttp) return null;

            var host = uri.Host.ToLowerInvariant();
            string? candidate = null;

            if (host == "youtu.be")
            {
                candidate = uri.AbsolutePath.Trim('/').Split('/')[0];
            }
            else if (host == "youtube.com" || host.EndsWith(".youtube.com"))
            {
                foreach (var part in uri.Query.TrimStart('?').Split('&', StringSplitOptions.RemoveEmptyEntries))
                {
                    var kv = part.Split('=', 2);
                    if (kv[0] == "v" && kv.Length == 2) { candidate = kv[1]; break; }
                }
                if (string.IsNullOrEmpty(candidate))
                {
                    var seg = uri.AbsolutePath.Trim('/').Split('/');
                    if (seg.Length >= 2 && (seg[0] == "embed" || seg[0] == "shorts" || seg[0] == "live"))
                        candidate = seg[1];
                }
            }

            return candidate != null && YoutubeIdRegex.IsMatch(candidate) ? candidate : null;
        }

        private async Task EnsureCategoryAsync(int categoryId, int kind)
        {
            var c = await _cats.GetByIdAsync(categoryId);
            if (c == null || c.Kind != kind) throw new ArgumentException("التصنيف غير صحيح.");
        }

        private async Task<bool> IsCategoryUsedAsync(int id) =>
            await _albums.AnyAsync(a => a.CategoryId == id) || await _groups.AnyAsync(g => g.CategoryId == id);

        // ── overview ──────────────────────────────────────────────────────
        public Task<GalleryOverviewDto> GetPublicOverviewAsync() => BuildOverviewAsync(onlyActive: true);
        public Task<GalleryOverviewDto> GetAdminOverviewAsync() => BuildOverviewAsync(onlyActive: false);

        private async Task<GalleryOverviewDto> BuildOverviewAsync(bool onlyActive)
        {
            var cats = (await _cats.GetAllAsync())
                .Where(c => !onlyActive || c.IsActive)
                .OrderBy(c => c.DisplayOrder).ThenBy(c => c.Id).ToList();
            var catIds = cats.Select(c => c.Id).ToHashSet();

            var photosByAlbum = (await _photos.GetAllAsync())
                .GroupBy(p => p.AlbumId)
                .ToDictionary(g => g.Key, g => g.OrderBy(p => p.DisplayOrder).ThenBy(p => p.Id).ToList());

            var albums = (await _albums.GetAllAsync())
                .Where(a => catIds.Contains(a.CategoryId) && (!onlyActive || a.IsActive))
                .OrderBy(a => a.DisplayOrder).ThenBy(a => a.Id)
                .Select(a =>
                {
                    photosByAlbum.TryGetValue(a.Id, out var ph);
                    var cover = a.CoverPic ?? ph?.FirstOrDefault()?.Pic;
                    return new GalleryAlbumDto(a.Id, a.CategoryId, a.Title, Url(cover), ph?.Count ?? 0, a.DisplayOrder, a.IsActive);
                }).ToList();

            var videosByGroup = (await _videos.GetAllAsync())
                .GroupBy(v => v.GroupId)
                .ToDictionary(g => g.Key, g => g.OrderBy(v => v.DisplayOrder).ThenBy(v => v.Id).Select(ToVideoDto).ToList());

            var groups = (await _groups.GetAllAsync())
                .Where(g => catIds.Contains(g.CategoryId) && (!onlyActive || g.IsActive))
                .OrderBy(g => g.DisplayOrder).ThenBy(g => g.Id)
                .Select(g => new GalleryVideoGroupDto(
                    g.Id, g.CategoryId, g.Title, g.Color, g.IsLtr, g.DisplayOrder, g.IsActive,
                    videosByGroup.TryGetValue(g.Id, out var vs) ? vs : new List<GalleryVideoDto>()))
                .ToList();

            return new GalleryOverviewDto(cats.Select(ToCategoryDto).ToList(), albums, groups);
        }

        // ── album details ─────────────────────────────────────────────────
        public Task<GalleryAlbumDetailsDto?> GetPublicAlbumAsync(int id) => BuildAlbumDetailsAsync(id, onlyActive: true);
        public Task<GalleryAlbumDetailsDto?> GetAlbumAsync(int id) => BuildAlbumDetailsAsync(id, onlyActive: false);

        private async Task<GalleryAlbumDetailsDto?> BuildAlbumDetailsAsync(int id, bool onlyActive)
        {
            var album = await _albums.GetByIdAsync(id);
            if (album == null || (onlyActive && !album.IsActive)) return null;

            if (onlyActive)
            {
                var cat = await _cats.GetByIdAsync(album.CategoryId);
                if (cat == null || !cat.IsActive) return null;
            }

            var photos = (await _photos.GetAllWithSpecAsync(new BaseSpecification<GalleryPhoto>(p => p.AlbumId == id)))
                .OrderBy(p => p.DisplayOrder).ThenBy(p => p.Id).ToList();

            var cover = album.CoverPic ?? photos.FirstOrDefault()?.Pic;

            return new GalleryAlbumDetailsDto(
                album.Id, album.CategoryId, album.Title, Url(cover), album.DisplayOrder, album.IsActive,
                photos.Select(p => new GalleryPhotoDto(p.Id, Url(p.Pic)!, p.Pic == cover)).ToList());
        }

        // ── categories ────────────────────────────────────────────────────
        private static void ApplyCategory(GalleryCategory e, GalleryCategoryInput i)
        {
            e.Kind = i.Kind;
            e.Name = i.Name.Trim();
            e.Description = Clean(i.Description);
            e.DisplayOrder = i.DisplayOrder;
            e.IsActive = i.IsActive;
        }

        public async Task<GalleryCategoryDto> CreateCategoryAsync(GalleryCategoryInput input)
        {
            var e = new GalleryCategory();
            ApplyCategory(e, input);
            await _cats.AddAsync(e);
            await _cats.SaveChangesAsync();
            return ToCategoryDto(e);
        }

        public async Task<GalleryCategoryDto?> UpdateCategoryAsync(int id, GalleryCategoryInput input)
        {
            var e = await _cats.GetByIdAsync(id);
            if (e == null) return null;
            if (e.Kind != input.Kind && await IsCategoryUsedAsync(id))
                throw new ArgumentException("لا يمكن تغيير نوع تصنيف مستخدم.");
            ApplyCategory(e, input);
            _cats.Update(e);
            await _cats.SaveChangesAsync();
            return ToCategoryDto(e);
        }

        public async Task<(bool Found, string? Error)> DeleteCategoryAsync(int id)
        {
            var e = await _cats.GetByIdAsync(id);
            if (e == null) return (false, null);
            if (await IsCategoryUsedAsync(id))
                return (true, "لا يمكن حذف تصنيف يحتوي على ألبومات أو مجموعات فيديو. انقلها أو احذفها أولاً.");
            _cats.Delete(e);
            await _cats.SaveChangesAsync();
            return (true, null);
        }

        // ── albums + photos ───────────────────────────────────────────────
        public async Task<GalleryAlbumDto> CreateAlbumAsync(GalleryAlbumInput input)
        {
            await EnsureCategoryAsync(input.CategoryId, 1);
            var e = new GalleryAlbum
            {
                CategoryId = input.CategoryId,
                Title = input.Title.Trim(),
                DisplayOrder = input.DisplayOrder,
                IsActive = input.IsActive
            };
            await _albums.AddAsync(e);
            await _albums.SaveChangesAsync();
            return new GalleryAlbumDto(e.Id, e.CategoryId, e.Title, null, 0, e.DisplayOrder, e.IsActive);
        }

        public async Task<GalleryAlbumDto?> UpdateAlbumAsync(int id, GalleryAlbumInput input)
        {
            var e = await _albums.GetByIdAsync(id);
            if (e == null) return null;
            await EnsureCategoryAsync(input.CategoryId, 1);

            e.CategoryId = input.CategoryId;
            e.Title = input.Title.Trim();
            e.DisplayOrder = input.DisplayOrder;
            e.IsActive = input.IsActive;
            _albums.Update(e);
            await _albums.SaveChangesAsync();

            var d = await BuildAlbumDetailsAsync(id, false);
            return new GalleryAlbumDto(e.Id, e.CategoryId, e.Title, d?.Cover, d?.Photos.Count ?? 0, e.DisplayOrder, e.IsActive);
        }

        public async Task<bool> DeleteAlbumAsync(int id)
        {
            var e = await _albums.GetByIdAsync(id);
            if (e == null) return false;
            _albums.Delete(e);               // photos are deleted by the database (ON DELETE CASCADE)
            await _albums.SaveChangesAsync();
            return true;
        }

        public async Task<GalleryPhotoDto?> UploadPhotoAsync(int albumId, IFormFile file)
        {
            var album = await _albums.GetByIdAsync(albumId);
            if (album == null) return null;

            var existing = await _photos.GetAllWithSpecAsync(new BaseSpecification<GalleryPhoto>(p => p.AlbumId == albumId));
            var next = existing.Select(p => p.DisplayOrder).DefaultIfEmpty(0).Max() + 1;

            var fullPath = await _blob.UploadFileAsync(file, Container, Folder);
            var name = Path.GetFileName(fullPath);

            var photo = new GalleryPhoto { AlbumId = albumId, Pic = name, DisplayOrder = next };
            await _photos.AddAsync(photo);
            await _photos.SaveChangesAsync();

            return new GalleryPhotoDto(photo.Id, Url(name)!, album.CoverPic == name);
        }

        public async Task<bool> DeletePhotoAsync(int photoId)
        {
            var p = await _photos.GetByIdAsync(photoId);
            if (p == null) return false;

            var album = await _albums.GetByIdAsync(p.AlbumId);
            if (album != null && album.CoverPic == p.Pic)
            {
                album.CoverPic = null;       // falls back to the first remaining photo
                _albums.Update(album);
            }

            _photos.Delete(p);
            await _photos.SaveChangesAsync();
            return true;
        }

        public async Task<bool> SetCoverAsync(int albumId, int photoId)
        {
            var album = await _albums.GetByIdAsync(albumId);
            var photo = await _photos.GetByIdAsync(photoId);
            if (album == null || photo == null || photo.AlbumId != albumId) return false;

            album.CoverPic = photo.Pic;
            _albums.Update(album);
            await _albums.SaveChangesAsync();
            return true;
        }

        // ── video groups + videos ─────────────────────────────────────────
        private static void ApplyGroup(GalleryVideoGroup e, GalleryVideoGroupInput i)
        {
            e.CategoryId = i.CategoryId;
            e.Title = i.Title.Trim();
            e.Color = i.Color;
            e.IsLtr = i.IsLtr;
            e.DisplayOrder = i.DisplayOrder;
            e.IsActive = i.IsActive;
        }

        private static GalleryVideoGroupDto ToGroupDto(GalleryVideoGroup g, List<GalleryVideoDto> videos) =>
            new(g.Id, g.CategoryId, g.Title, g.Color, g.IsLtr, g.DisplayOrder, g.IsActive, videos);

        public async Task<GalleryVideoGroupDto> CreateVideoGroupAsync(GalleryVideoGroupInput input)
        {
            await EnsureCategoryAsync(input.CategoryId, 2);
            var e = new GalleryVideoGroup();
            ApplyGroup(e, input);
            await _groups.AddAsync(e);
            await _groups.SaveChangesAsync();
            return ToGroupDto(e, new List<GalleryVideoDto>());
        }

        public async Task<GalleryVideoGroupDto?> UpdateVideoGroupAsync(int id, GalleryVideoGroupInput input)
        {
            var e = await _groups.GetByIdAsync(id);
            if (e == null) return null;
            await EnsureCategoryAsync(input.CategoryId, 2);
            ApplyGroup(e, input);
            _groups.Update(e);
            await _groups.SaveChangesAsync();

            var videos = (await _videos.GetAllWithSpecAsync(new BaseSpecification<GalleryVideo>(v => v.GroupId == id)))
                .OrderBy(v => v.DisplayOrder).ThenBy(v => v.Id).Select(ToVideoDto).ToList();
            return ToGroupDto(e, videos);
        }

        public async Task<bool> DeleteVideoGroupAsync(int id)
        {
            var e = await _groups.GetByIdAsync(id);
            if (e == null) return false;
            _groups.Delete(e);               // videos are deleted by the database (ON DELETE CASCADE)
            await _groups.SaveChangesAsync();
            return true;
        }

        public async Task<GalleryVideoDto?> AddVideoAsync(int groupId, GalleryVideoInput input)
        {
            var group = await _groups.GetByIdAsync(groupId);
            if (group == null) return null;

            var ytId = ExtractYoutubeId(input.Video)
                ?? throw new ArgumentException("رابط أو معرّف يوتيوب غير صحيح.");

            var order = input.DisplayOrder;
            if (order <= 0)
            {
                var existing = await _videos.GetAllWithSpecAsync(new BaseSpecification<GalleryVideo>(v => v.GroupId == groupId));
                order = existing.Select(v => v.DisplayOrder).DefaultIfEmpty(0).Max() + 1;
            }

            var e = new GalleryVideo { GroupId = groupId, YoutubeId = ytId, Title = Clean(input.Title), DisplayOrder = order };
            await _videos.AddAsync(e);
            await _videos.SaveChangesAsync();
            return ToVideoDto(e);
        }

        public async Task<GalleryVideoDto?> UpdateVideoAsync(int id, GalleryVideoInput input)
        {
            var e = await _videos.GetByIdAsync(id);
            if (e == null) return null;

            e.YoutubeId = ExtractYoutubeId(input.Video)
                ?? throw new ArgumentException("رابط أو معرّف يوتيوب غير صحيح.");
            e.Title = Clean(input.Title);
            e.DisplayOrder = input.DisplayOrder;
            _videos.Update(e);
            await _videos.SaveChangesAsync();
            return ToVideoDto(e);
        }

        public async Task<bool> DeleteVideoAsync(int id)
        {
            var e = await _videos.GetByIdAsync(id);
            if (e == null) return false;
            _videos.Delete(e);
            await _videos.SaveChangesAsync();
            return true;
        }
    }
}