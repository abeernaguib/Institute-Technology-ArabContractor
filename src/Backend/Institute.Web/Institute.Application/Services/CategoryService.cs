using Institute.Application.DTOs;
using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Domain.Entities;
using Institute.Domain.specifications.CourseSpec;
using Institute.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Institute.Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Planwork> _planworkRepository;

        public CategoryService(IRepository<Planwork> planworkRepository)
        {
            _planworkRepository = planworkRepository;
        }

        public async Task<List<CategoryTreeDto>> GetCategoryTreeAsync()
        {
            var allPlanworks = (await _planworkRepository.GetAllAsync()).ToList();

            // ids that have at least one child
            var parentIds = allPlanworks
                .Where(x => x.ParentId.HasValue)
                .Select(x => x.ParentId!.Value)
                .ToHashSet();

            // CHANGED: a category = flagged as a section (DetailsFlag) OR has children.
            // It no longer depends on CourseDesc, so a course without a description
            // is not mistaken for a category, and a section with a description is not dropped.
            var categories = allPlanworks
                .Where(x => x.DetailsFlag == true || parentIds.Contains(x.ChildId))
                .Where(x => x.MainFlag == true)
                .OrderBy(x => x.Priority)
                .ToList();

            List<CategoryTreeDto> Build(int? parentId)
            {
                return categories
                    .Where(x => x.ParentId == parentId)
                    .OrderBy(x => x.Priority ?? int.MaxValue)
                    .Select(x => new CategoryTreeDto
                    {
                        Id = x.ChildId,
                        Slug = x.Slug,
                        Title = x.ServiceTitle,
                        Children = Build(x.ChildId)
                    })
                    .ToList();
            }

            return Build(null);
        }

        // ══════════════════════════════════════════════════════════════
        // ✱ CHANGED: آخر الكورسات المتاحة
        // الكورس الحقيقي = مش قسم (DetailsFlag != true) ومالوش أبناء
        // لو أي أب فوقه MainFlag != true (مش متعلّم عليه "عرض قسم رئيسي")
        // الكورس بيختفي معاه
        // ⚠ الكورس نفسه MainFlag بتاعه مش بيتفحص (الافتراضي false للكورسات)
        // الفلترة بتحصل قبل Take عشان الكورسات المخفية ما تاخدش أماكن
        // ══════════════════════════════════════════════════════════════
        public async Task<IReadOnlyList<Planwork>> GetLatestCoursesAsync(int count = 20)
        {
            var all = (await _planworkRepository.GetAllAsync()).ToList();
            var byId = all.ToDictionary(x => x.ChildId);

            var parentIds = all
                .Where(x => x.ParentId.HasValue)
                .Select(x => x.ParentId!.Value)
                .ToHashSet();

            // true لو أي أب فوق الكورس مخفي
            bool HasHiddenAncestor(Planwork p)
            {
                var visited = new HashSet<int> { p.ChildId };   // حماية من الـ Infinite Loop
                var parentId = p.ParentId;

                while (parentId.HasValue && visited.Add(parentId.Value))
                {
                    if (!byId.TryGetValue(parentId.Value, out var parent))
                        return false;

                    if (parent.MainFlag != true)               // مش متعلّم عليه = مخفي
                        return true;

                    parentId = parent.ParentId;
                }
                return false;
            }

            return all
                .Where(p => p.DetailsFlag != true && !parentIds.Contains(p.ChildId)) // كورس حقيقي
                .Where(p => !HasHiddenAncestor(p))                                   // كل الآباء ظاهرين
                .OrderByDescending(p => p.ChildId)                                   // الأحدث دخولاً
                .Take(count)
                .ToList();
        }
    }
}