using Institute.Domain.Entities;

namespace Institute.API.Helpers
{
    public static class NewsPicHelper
    {
        // NULL priority goes last, PicId breaks ties
        public static List<NewsPic> Ordered(IEnumerable<NewsPic>? pics) =>
            (pics ?? Enumerable.Empty<NewsPic>())
                .OrderBy(p => p.PicPeriorty ?? int.MaxValue)
                .ThenBy(p => p.PicId)
                .ToList();

        // cover = first start-up image, otherwise the first image
        public static NewsPic? GetCover(IEnumerable<NewsPic>? pics)
        {
            var ordered = Ordered(pics);
            return ordered.FirstOrDefault(p => p.StartUpPic == true) ?? ordered.FirstOrDefault();
        }
    }
}