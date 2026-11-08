namespace Institute.Domain.Entities;

public partial class GalleryCategory
{
    public int Id { get; set; }
    public int Kind { get; set; }                 // 1 = photo albums, 2 = video groups
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}

public partial class GalleryAlbum
{
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public string Title { get; set; } = null!;
    public string? CoverPic { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}

public partial class GalleryPhoto
{
    public int Id { get; set; }
    public int AlbumId { get; set; }
    public string Pic { get; set; } = null!;
    public int DisplayOrder { get; set; }
}

public partial class GalleryVideoGroup
{
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public string Title { get; set; } = null!;
    public string Color { get; set; } = "#0865a8";
    public bool IsLtr { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}

public partial class GalleryVideo
{
    public int Id { get; set; }
    public int GroupId { get; set; }
    public string YoutubeId { get; set; } = null!;
    public string? Title { get; set; }
    public int DisplayOrder { get; set; }
}