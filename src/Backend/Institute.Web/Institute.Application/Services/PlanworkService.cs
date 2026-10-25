using Institute.Application.DTOs;
using Institute.Application.DTOs.AdminDtos;
using Institute.Application.Exceptions;
using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Institute.Application.Services
{
    public class PlanworkService : IPlanworkService
    {
        private readonly IRepository<Planwork> _repo;

        public PlanworkService(IRepository<Planwork> repo)
        {
            _repo = repo;
        }

        // ================= MAPPING =================
        private static PlanworkDto ToDto(Planwork x) => new PlanworkDto
        {
            ChildId = x.ChildId,
            ParentId = x.ParentId,
            ServiceTitle = x.ServiceTitle,
            Priority = x.Priority,
            MainFlag = x.MainFlag,
            DetailsFlag = x.DetailsFlag,   // DetailsFlag == "this is a parent / section"
            SpecialFlag = x.SpecialFlag,   // read only (legacy) - no longer written
            SponsorFlag = x.SponsorFlag,
            SponsorDesc = x.SponsorDesc,
            CourseDesc = x.CourseDesc,
            CoursePlace = x.CoursePlace,
            CourseDate = x.CourseDate,     // read only - maintained by the rounds service
            CourseDays = x.CourseDays,
            CourseContent = x.CourseContent,
            PlanCost = x.PlanCost,
            IsOnline = x.IsOnline,
            OnlineLink = x.OnlineLink,
            OnlineCost = x.OnlineCost,
            Slug = x.Slug,
            SKU = x.SKU
        };

        // Copies the editable fields. NOT touched here: CourseDate (rounds),
        // SpecialFlag / PlanUser / PlanPass (legacy, unused).
        private static void Apply(Planwork e, CreatePlanworkDto dto)
        {
            var isParent = dto.DetailsFlag == true;

            e.ParentId = dto.ParentId;
            e.ServiceTitle = dto.ServiceTitle?.Trim();
            e.Priority = dto.Priority;
            e.MainFlag = dto.MainFlag;
            e.DetailsFlag = isParent;
            e.SponsorFlag = dto.SponsorFlag;
            e.SponsorDesc = dto.SponsorFlag ? dto.SponsorDesc : null;
            e.CourseDesc = dto.CourseDesc;
            e.CourseContent = dto.CourseContent;

            // course-only fields: a parent (section) never carries them
            e.CoursePlace = isParent ? null : dto.CoursePlace;
            e.CourseDays = isParent ? null : dto.CourseDays;
            e.PlanCost = isParent ? null : dto.PlanCost;
            e.IsOnline = !isParent && dto.IsOnline;
            e.OnlineLink = e.IsOnline ? dto.OnlineLink : null;
            e.OnlineCost = e.IsOnline ? dto.OnlineCost : null;

            e.Slug = string.IsNullOrWhiteSpace(dto.Slug) ? null : dto.Slug.Trim();
            e.SKU = string.IsNullOrWhiteSpace(dto.SKU) ? null : dto.SKU.Trim();
        }

        // ================= AUTO SLUG / SKU =================
        // Slug = the name itself (Arabic or English), spaces -> "-", symbols removed.
        // A number is added ONLY if another record already has the same slug.
        private async Task<string> BuildUniqueSlugAsync(string? title, int selfId)
        {
            var s = Regex.Replace((title ?? "").Trim().ToLowerInvariant(), @"[\u064B-\u0652\u0640]", ""); // tashkeel / tatweel
            s = Regex.Replace(s, @"[^\p{L}\p{N}\s-]", " ");
            s = Regex.Replace(s.Trim(), @"[\s-]+", "-").Trim('-');
            if (s.Length > 80) s = s.Substring(0, 80).Trim('-');
            if (s.Length == 0) return $"course-{selfId}";

            var all = await _repo.GetAllAsync();
            var taken = new HashSet<string>(
                all.Where(x => x.ChildId != selfId && !string.IsNullOrEmpty(x.Slug))
                   .Select(x => x.Slug!),
                StringComparer.OrdinalIgnoreCase);

            var candidate = s;
            var n = 2;
            while (taken.Contains(candidate)) candidate = $"{s}-{n++}";
            return candidate;
        }

        // parent's SKU prefix + padded id   (ENG-CIV-015 -> ENG-CIV-017)
        private async Task<string> BuildSkuAsync(int id, int? parentId)
        {
            var prefix = "CRS";
            if (parentId.HasValue)
            {
                var parent = await _repo.GetByIdAsync(parentId.Value);
                if (!string.IsNullOrWhiteSpace(parent?.SKU))
                {
                    var baseSku = Regex.Replace(parent!.SKU!, @"-\d+$", "");
                    if (!string.IsNullOrWhiteSpace(baseSku)) prefix = baseSku;
                }
            }
            return $"{prefix}-{id:D3}";
        }

        private async Task FillSlugAndSkuAsync(Planwork e)
        {
            if (string.IsNullOrWhiteSpace(e.Slug)) e.Slug = await BuildUniqueSlugAsync(e.ServiceTitle, e.ChildId);
            if (string.IsNullOrWhiteSpace(e.SKU)) e.SKU = await BuildSkuAsync(e.ChildId, e.ParentId);
        }

        // ================= RULES =================
        private async Task ValidateAsync(int? selfId, CreatePlanworkDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.ServiceTitle))
                throw new BusinessRuleException("الأسم مطلوب");

            if (dto.ParentId.HasValue)
            {
                if (selfId.HasValue && dto.ParentId == selfId)
                    throw new BusinessRuleException("لا يمكن أن يكون السجل أباً لنفسه");

                var parent = await _repo.GetByIdAsync(dto.ParentId.Value);
                if (parent == null)
                    throw new BusinessRuleException("الأب المحدد غير موجود");
            }
        }

        // ================= GET ALL =================
        public async Task<List<PlanworkDto>> GetAllAsync()
        {
            var data = await _repo.GetAllAsync();
            return data.Select(ToDto).ToList();
        }

        // ================= TREE =================
        public async Task<List<CategoryTreeDto>> GetTreeForAdminAsync()
        {
            var all = await _repo.GetAllAsync();
            var ordered = all.OrderBy(x => x.Priority ?? int.MaxValue).ToList();

            List<CategoryTreeDto> Build(int? parentId)
            {
                return ordered
                    .Where(x => x.ParentId == parentId)
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

        // ================= GET BY ID =================
        public async Task<PlanworkDto?> GetByIdAsync(int id)
        {
            var x = await _repo.GetByIdAsync(id);
            return x == null ? null : ToDto(x);
        }

        // ================= CREATE (returns the new id) =================
        public async Task<int> CreateAsync(CreatePlanworkDto dto)
        {
            await ValidateAsync(null, dto);

            var entity = new Planwork();
            Apply(entity, dto);

            await _repo.AddAsync(entity);
            await _repo.SaveChangesAsync();          // ChildId is generated here

            // slug / sku need the id, so they are filled right after the insert
            if (string.IsNullOrWhiteSpace(entity.Slug) || string.IsNullOrWhiteSpace(entity.SKU))
            {
                await FillSlugAndSkuAsync(entity);
                await _repo.SaveChangesAsync();
            }

            return entity.ChildId;
        }

        // ================= UPDATE =================
        public async Task<bool> UpdateAsync(int id, CreatePlanworkDto dto)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return false;

            await ValidateAsync(id, dto);

            Apply(entity, dto);
            await FillSlugAndSkuAsync(entity);       // blank slug / sku -> auto

            await _repo.SaveChangesAsync();
            return true;
        }

        // ================= DELETE =================
        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return false;

            _repo.Delete(entity);
            await _repo.SaveChangesAsync();
            return true;
        }
    }
}