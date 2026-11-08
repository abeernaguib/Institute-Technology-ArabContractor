using Institute.Application.DTOs;
using Microsoft.AspNetCore.Http;

namespace Institute.Application.Interfaces.IService
{
    public interface IGalleryService
    {
        // public
        Task<GalleryOverviewDto> GetPublicOverviewAsync();
        Task<GalleryAlbumDetailsDto?> GetPublicAlbumAsync(int id);

        // admin: read
        Task<GalleryOverviewDto> GetAdminOverviewAsync();
        Task<GalleryAlbumDetailsDto?> GetAlbumAsync(int id);

        // categories
        Task<GalleryCategoryDto> CreateCategoryAsync(GalleryCategoryInput input);
        Task<GalleryCategoryDto?> UpdateCategoryAsync(int id, GalleryCategoryInput input);
        Task<(bool Found, string? Error)> DeleteCategoryAsync(int id);

        // albums + photos
        Task<GalleryAlbumDto> CreateAlbumAsync(GalleryAlbumInput input);
        Task<GalleryAlbumDto?> UpdateAlbumAsync(int id, GalleryAlbumInput input);
        Task<bool> DeleteAlbumAsync(int id);
        Task<GalleryPhotoDto?> UploadPhotoAsync(int albumId, IFormFile file);
        Task<bool> DeletePhotoAsync(int photoId);
        Task<bool> SetCoverAsync(int albumId, int photoId);

        // video groups + videos
        Task<GalleryVideoGroupDto> CreateVideoGroupAsync(GalleryVideoGroupInput input);
        Task<GalleryVideoGroupDto?> UpdateVideoGroupAsync(int id, GalleryVideoGroupInput input);
        Task<bool> DeleteVideoGroupAsync(int id);
        Task<GalleryVideoDto?> AddVideoAsync(int groupId, GalleryVideoInput input);
        Task<GalleryVideoDto?> UpdateVideoAsync(int id, GalleryVideoInput input);
        Task<bool> DeleteVideoAsync(int id);
    }
}