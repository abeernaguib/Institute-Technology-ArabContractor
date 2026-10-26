using Institute.API.DTOs;
using Institute.API.Helpers;
using Institute.Application.Exceptions;
using Institute.Application.Interfaces;
using Institute.Application.Interfaces.IService;
using Institute.Domain.Entities;
using Institute.Domain.Enums;
using Institute.Domain.specifications.CourseSpec;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Security.Claims;
using Institute.Domain;

namespace Institute.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly IRepository<Planwork> _planRepo;
        private readonly IRepository<PlanFile> _fileRepo;
        private readonly IRepository<Enrollment> _enrollmentRepo;
        private readonly IClerkService _clerkService;
        private readonly IRepository<AppUser> _userRepo;
        private readonly ICategoryService _categoryService;
        private readonly IRepository<Order> _orderRepo;
        private readonly IRepository<PlanworkRound> _roundRepo;
        private readonly IRoundSelectionService _roundSelection;

        public CourseController(
            IRepository<Planwork> planRepo,
            IRepository<PlanFile> fileRepo,
            IRepository<Enrollment> enrollmentRepo,
            IClerkService clerkService,
            IRepository<AppUser> userRepo,
            ICategoryService categoryService,
            IRepository<Order> orderRepo,
            IRepository<PlanworkRound> roundRepo,
            IRoundSelectionService roundSelection)
        {
            _planRepo = planRepo;
            _fileRepo = fileRepo;
            _enrollmentRepo = enrollmentRepo;
            _clerkService = clerkService;
            _userRepo = userRepo;
            _categoryService = categoryService;
            _orderRepo = orderRepo;
            _roundRepo = roundRepo;
            _roundSelection = roundSelection;
        }

        // ══════════════════════════════════════════════════════════════
        // HELPERS — Course vs Section
        // ✱ CHANGED: الكورس الحقيقي لم يعد يعتمد على CourseDate
        // (CourseDate بيتحدّث من الـ Rounds، فالكورس بدون مواعيد تاريخه null
        //  وكان بيختفي). دلوقتي الكورس = مش قسم (DetailsFlag != true)
        //  ومالوش أبناء. الأقسام = DetailsFlag == true أو عندها أبناء.
        // ══════════════════════════════════════════════════════════════
        private static HashSet<int> GetParentIds(IEnumerable<Planwork> planworks) =>
            planworks
                .Where(x => x.ParentId.HasValue)
                .Select(x => x.ParentId!.Value)
                .ToHashSet();

        private static bool IsCourse(Planwork p, HashSet<int> parentIds) =>
            p.DetailsFlag != true && !parentIds.Contains(p.ChildId);

        // ══════════════════════════════════════════════════════════════
        // HELPERS — Rounds
        // LoadRoundsLookupAsync: بيجيب كل الدورات الفعّالة مجمّعة بالـ PlanworkId
        // ToRoundDtos: بيحوّل الدورات لـ DTO مرتبة بتاريخ البداية
        // ══════════════════════════════════════════════════════════════
        private async Task<ILookup<int, PlanworkRound>> LoadRoundsLookupAsync()
        {
            var all = await _roundRepo.GetAllAsync();
            return all.Where(r => r.IsActive).ToLookup(r => r.PlanworkId);
        }

        private static List<RoundDto> ToRoundDtos(IEnumerable<PlanworkRound> rounds) =>
            rounds.OrderBy(r => r.StartDate)
                  .Select(r => new RoundDto
                  {
                      Id = r.Id,
                      StartDate = r.StartDate.ToString("yyyy-MM-dd"),
                      EndDate = r.EndDate.ToString("yyyy-MM-dd"),
                      IsBookable = RoundRules.IsBookable(r)
                  })
                  .ToList();

        // ══════════════════════════════════════════════════════════════
        // GET /api/course/programs/{slug}/courses
        // بيجيب كل الكورسات اللي تحت برنامج معين عن طريق الـ Slug بتاعه
        // بيشتغل Recursive عشان يجمع الكورسات من كل المستويات
        // سواء كانت مباشرة تحت البرنامج أو تحت محاور/عناوين تنظيمية
        // ✱ الكورسات بدون مواعيد بتظهر (Date = null و Rounds = [])
        // ✱ CHANGED: الترتيب حسب الـ Priority اللي الأدمن حطه
        //   (الصفر / الفاضي بييجي في الآخر)، وعند التساوي بالـ Id
        // ══════════════════════════════════════════════════════════════
        [HttpGet("programs/{slug}/courses")]
        public async Task<IActionResult> GetProgramCourses(string slug)
        {
            // جيب كل الـ Planworks والـ Files مرة واحدة من الـ DB
            var planworks = (await _planRepo.GetAllAsync()).ToList();
            var files = (await _fileRepo.GetAllAsync()).ToList();

            // دور على البرنامج بالـ Slug — لو مش موجود رجع 404
            var program = planworks.FirstOrDefault(x => x.Slug == slug);
            if (program == null)
                return NotFound();

            var programId = program.ChildId;

            // جمع الكورسات Recursive من كل المستويات
            var courses = GetCoursesRecursive(planworks, files, programId);

            // ضيف الدورات (Rounds) لكل كورس
            var roundsLookup = await LoadRoundsLookupAsync();
            foreach (var c in courses)
                c.Rounds = ToRoundDtos(roundsLookup[c.Id]);

            return Ok(new ProgramCoursesDto
            {
                ProgramId = program.ChildId,
                Slug = program.Slug,
                ProgramName = program.ServiceTitle,
                // CHANGED: order by admin priority (0 / empty goes last), ties by Id
                Courses = courses
                    .OrderBy(c => c.Priority > 0 ? 0 : 1)
                    .ThenBy(c => c.Priority)
                    .ThenBy(c => c.Id)
                    .ToList()
            });
        }

        // ══════════════════════════════════════════════════════════════
        // HELPER — GetCoursesRecursive (Entry Point)
        // نقطة الدخول للـ Recursive — بتبدأ بـ HashSet فاضي
        // الـ HashSet ده بيحمي من الـ Infinite Loop
        // لو في ChildId اتزار قبل كده بيتجاهله
        // ══════════════════════════════════════════════════════════════
        private List<CourseCardDto> GetCoursesRecursive(
            List<Planwork> planworks,
            List<PlanFile> files,
            int parentId)
        {
            return GetCoursesRecursive(
                planworks,
                files,
                parentId,
                new HashSet<int>(),
                GetParentIds(planworks)
            );
        }

        // ══════════════════════════════════════════════════════════════
        // HELPER — GetCoursesRecursive (Core Logic)
        // بتجمع الكورسات من مستوى معين وكل المستويات اللي تحته
        // ✱ CHANGED: كورس حقيقي = IsCourse (مش قسم ومالوش أبناء)
        // عنوان تنظيمي = أي حاجة تانية (بيتنزل فيه Recursive)
        // ✱ NEW: بيرجع Priority مع كل كورس عشان الترتيب النهائي
        // ══════════════════════════════════════════════════════════════
        private List<CourseCardDto> GetCoursesRecursive(
            List<Planwork> planworks,
            List<PlanFile> files,
            int parentId,
            HashSet<int> visited,
            HashSet<int> parentIds)
        {
            var result = new List<CourseCardDto>();

            // حماية من الـ Infinite Loop
            if (visited.Contains(parentId))
                return result;

            visited.Add(parentId);

            // جيب الكورسات المباشرة تحت الـ parentId
            var directCourses = planworks
                .Where(x => x.ParentId == parentId && IsCourse(x, parentIds))
                .OrderBy(x => x.Priority)
                .Select(c => new CourseCardDto
                {
                    Id = c.ChildId,
                    Priority = c.Priority ?? 0,          // NEW
                    Slug = c.Slug,
                    Title = c.ServiceTitle,
                    Place = c.CoursePlace,
                    Date = c.CourseDate,
                    Description = c.CourseDesc,
                    Cost = c.PlanCost,
                    IsOnline = c.IsOnline,
                    OnlineCost = c.OnlineCost
                })
                .ToList();

            result.AddRange(directCourses);

            // جيب العناوين التنظيمية (الأقسام)
            // وانزل فيها Recursive عشان تجيب الكورسات اللي جوّاها
            var childrenIds = planworks
                .Where(x => x.ParentId == parentId && !IsCourse(x, parentIds))
                .Select(x => x.ChildId)
                .ToList();

            foreach (var childId in childrenIds)
            {
                result.AddRange(
                    GetCoursesRecursive(planworks, files, childId, visited, parentIds)
                );
            }

            return result;
        }

        // ══════════════════════════════════════════════════════════════
        // GET /api/course/{slug}
        // بيجيب تفاصيل كورس واحد كامل عن طريق الـ Slug بتاعه
        // بيرجع كل البيانات + الملفات المرفقة مرتبة بالـ Priority
        // ✱ CHANGED: الكورس بيظهر حتى لو مفيش مواعيد (Date = null, Rounds = [])
        // ملاحظة: لا يرجع رابط الاجتماع هنا لأن الـ endpoint عام
        // ══════════════════════════════════════════════════════════════
        [HttpGet("{slug}")]
        public async Task<IActionResult> GetCourseById(string slug)
        {
            var planworks = (await _planRepo.GetAllAsync()).ToList();
            var files = (await _fileRepo.GetAllAsync()).ToList();
            var parentIds = GetParentIds(planworks);

            // دور على الكورس بالـ Slug
            var course = planworks.FirstOrDefault(x =>
                x.Slug == slug &&
                IsCourse(x, parentIds)
            );

            if (course == null)
                return NotFound();

            // جيب الملفات المرتبطة بالكورس ده مرتبة بالـ Priority
            var courseFiles = files
                .Where(f => f.PlanId == course.ChildId)
                .OrderBy(f => f.FilePeriorty)
                .Select(f => new CourseFileDto
                {
                    Title = f.FileTitle,
                    FileName = f.FileName
                })
                .ToList();

            var dto = new CourseDto
            {
                Id = course.ChildId,
                Slug = course.Slug,
                Title = course.ServiceTitle,
                Description = course.CourseDesc,
                Place = course.CoursePlace,
                Date = course.CourseDate,
                Days = course.CourseDays,
                Content = course.CourseContent,
                Cost = course.PlanCost,
                Files = courseFiles,
                IsOnline = course.IsOnline,
                OnlineCost = course.OnlineCost
            };

            dto.Rounds = ToRoundDtos((await LoadRoundsLookupAsync())[course.ChildId]);

            return Ok(dto);
        }

        // ══════════════════════════════════════════════════════════════
        // GET /api/course/latest
        // بيجيب آخر 20 كورس متاحين
        // ✱ CHANGED: CategoryService.GetLatestCoursesAsync بقت بتستبعد
        //   أي كورس أحد آبائه مش متعلّم عليه "عرض قسم رئيسي" (MainFlag != true)
        // ══════════════════════════════════════════════════════════════
        [HttpGet("latest")]
        public async Task<IActionResult> GetLatestCourses()
        {
            var courses = await _categoryService.GetLatestCoursesAsync(20);
            // ✱ CHANGED: ما نرجعش الـ Entity كامل (فيه PlanUser/PlanPass/OnlineLink)
            var result = courses.Select(c => new
            {
                childId = c.ChildId,
                parentId = c.ParentId,
                slug = c.Slug,
                serviceTitle = c.ServiceTitle,
                courseDesc = c.CourseDesc,
                coursePlace = c.CoursePlace,
                courseDate = c.CourseDate,
                planCost = c.PlanCost,
                isOnline = c.IsOnline,
                onlineCost = c.OnlineCost
            });
            return Ok(result);
        }

        // GET /api/course/sponsored
        // ✱ CHANGED: الأربع كورسات اللي بتظهر جوه كل قسم ممول
        //   بقت بترتيب الـ Priority اللي الأدمن حطه (الصفر / الفاضي في الآخر)
        //   بدل ما كانت بتعرض أحدث أربعة
        [HttpGet("sponsored")]
        public async Task<IActionResult> GetSponsored()
        {
            var planworks = (await _planRepo.GetAllAsync()).ToList();
            var parentIds = GetParentIds(planworks);
            var noFiles = new List<PlanFile>();

            var result = planworks
                .Where(p => p.SponsorFlag)
                .OrderBy(p => p.Priority)
                .Select(p =>
                {
                    // ✱ CHANGED: same rule as the rest of the controller — no CourseDate dependency
                    var isCourse = IsCourse(p, parentIds);

                    if (isCourse)
                    {
                        return (object)new
                        {
                            type = "course",
                            id = p.ChildId,
                            slug = p.Slug,
                            title = p.ServiceTitle,
                            sponsorDesc = p.SponsorDesc,
                            description = p.CourseDesc,
                            place = p.CoursePlace,
                            date = p.CourseDate,
                            cost = p.PlanCost,
                            isOnline = p.IsOnline,
                            onlineCost = p.OnlineCost
                        };
                    }

                    var all = GetCoursesRecursive(planworks, noFiles, p.ChildId)
                        .OrderBy(c => c.Priority > 0 ? 0 : 1)
                        .ThenBy(c => c.Priority)
                        .ThenBy(c => c.Id)
                        .ToList();

                    return (object)new
                    {
                        type = "category",
                        id = p.ChildId,
                        slug = p.Slug,
                        title = p.ServiceTitle,
                        sponsorDesc = p.SponsorDesc,
                        coursesCount = all.Count,
                        courses = all.Take(4).ToList()
                    };
                })
                .ToList();

            return Ok(result);
        }

        // ══════════════════════════════════════════════════════════════
        // GET /api/course/my-courses
        // بيجيب كل الكورسات اللي اليوزر المسجل دخول سجل فيها
        // سواء كانت مدفوعة (ليها OrderId) أو مجانية (OrderId = null)
        // ✱ CHANGED: بيرجع كمان UserId و PurchasedOnline و OnlineLink
        // رابط الاجتماع بيتبعت بس لو اليوزر اشترى أونلاين
        // ✱ NEW: بيرجع كمان RoundId و RoundStart و RoundEnd
        // ══════════════════════════════════════════════════════════════
        [HttpGet("my-courses")]
        public async Task<IActionResult> GetMyCourses()
        {
            // جيب الـ User الحالي من Clerk
            var clerkUserId = _clerkService.GetAuthenticatedUserId(User);
            if (clerkUserId == null)
                return Unauthorized();

            var appUser = await _userRepo.GetByClerkIdAsync(clerkUserId);
            if (appUser == null)
                return NotFound("User not found in local DB");

            // جيب كل الـ Enrollments بتاعت اليوزر ده
            var allEnrollments = await _enrollmentRepo.GetAllAsync();
            var userEnrollments = allEnrollments
                .Where(e => e.UserId == appUser.Id)
                .ToList();

            var allPlanworks = (await _planRepo.GetAllAsync()).ToList();

            // Lookup للدورات بالـ Id (بتشمل كل الدورات حتى غير الفعّالة
            // عشان اليوزر المسجل يشوف دورته حتى لو اتقفلت)
            var roundsById = (await _roundRepo.GetAllAsync()).ToDictionary(r => r.Id);

            // عمل Join يدوي بين Enrollment و Planwork
            // IsFree = true لو مفيش OrderId (كورس مجاني)
            var courses = userEnrollments
                .Select(e =>
                {
                    var plan = allPlanworks.FirstOrDefault(p => p.ChildId == e.PlanworkId);
                    if (plan == null) return null;

                    PlanworkRound? round = null;
                    if (e.RoundId.HasValue) roundsById.TryGetValue(e.RoundId.Value, out round);

                    return new
                    {
                        ChildId = plan.ChildId,
                        CoursePlace = plan.CoursePlace,
                        CourseDate = plan.CourseDate,
                        ServiceTitle = plan.ServiceTitle,
                        Slug = plan.Slug,
                        EnrolledAt = e.EnrolledAt,
                        OrderId = e.OrderId,
                        UserId = e.UserId,                                   // ✱ NEW
                        Cost = plan.PlanCost,
                        IsFree = e.OrderId == null,
                        IsOnline = plan.IsOnline,                            // الكورس متاح أونلاين
                        OnlineCost = plan.OnlineCost,
                        PurchasedOnline = e.IsOnline,                        // ✱ NEW: اليوزر اشترى أونلاين
                        OnlineLink = e.IsOnline ? plan.OnlineLink : null,    // ✱ NEW: الرابط لمشتري الأونلاين فقط
                        RoundId = e.RoundId,                                 // NEW
                        RoundStart = round?.StartDate.ToString("yyyy-MM-dd"),// NEW
                        RoundEnd = round?.EndDate.ToString("yyyy-MM-dd")     // NEW
                    };
                })
                .Where(c => c != null)
                .ToList();

            return Ok(courses);
        }

        // ══════════════════════════════════════════════════════════════
        // POST /api/course/enroll-free/{planworkId}
        // [Authorize] — محتاج يكون اليوزر مسجل دخول
        // بيسجل اليوزر في كورس مجاني مباشرة من غير Cart أو Payment
        // بيعمل Order وهمي بـ 0 جنيه عشان الـ DB مش بتقبل OrderId = null
        // Body (اختياري): { "roundId": 12 } — EmptyBodyBehavior.Allow
        // بيخلي الـ Frontend القديم (من غير Body) يشتغل زي ما هو
        // ✱ CHANGED: شلنا شرط CourseDate != null. التسجيل من غير موعد متاح
        //   بيتمنع من _roundSelection.ResolveAsync (راجع ملاحظة تحت)
        // ══════════════════════════════════════════════════════════════
        [HttpPost("enroll-free/{planworkId}")]
        [Authorize]
        public async Task<IActionResult> EnrollInFreeCourse(
            int planworkId,
            [FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Allow)] EnrollFreeDto? dto)
        {
            // جيب الـ User الحالي
            var clerkUserId = _clerkService.GetAuthenticatedUserId(User);
            if (clerkUserId == null)
                return Unauthorized();

            var appUser = await _userRepo.GetByClerkIdAsync(clerkUserId);
            if (appUser == null)
                return NotFound("المستخدم غير موجود.");

            // تحقق إن الكورس موجود وفعلاً مجاني (PlanCost = 0 أو null)
            var planworks = (await _planRepo.GetAllAsync()).ToList();
            var parentIds = GetParentIds(planworks);
            var course = planworks.FirstOrDefault(p =>
                p.ChildId == planworkId &&
                IsCourse(p, parentIds) &&
                (p.PlanCost == null || p.PlanCost == 0));

            if (course == null)
                return BadRequest(new { message = "الكورس غير موجود أو غير مجاني." });

            // منع التسجيل المكرر في نفس الكورس
            var alreadyEnrolled = await _enrollmentRepo.AnyAsync(
                e => e.UserId == appUser.Id && e.PlanworkId == planworkId);

            if (alreadyEnrolled)
                return Ok(new { message = "أنت مسجل في هذا الكورس بالفعل.", alreadyEnrolled = true });

            // تحقق من الدورة (Round) المختارة
            // ⚠ لازم ResolveAsync يرمي BusinessRuleException لو مفيش موعد متاح
            PlanworkRound? round;
            try
            {
                round = await _roundSelection.ResolveAsync(planworkId, dto?.RoundId);
            }
            catch (BusinessRuleException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            // أنشئ Order وهمي بـ 0 جنيه
            var freeOrder = new Order
            {
                UserId = appUser.Id,
                TotalAmount = 0,
                Status = OrderStatus.Paid,
                OrderNumber = Guid.NewGuid().ToString("N")
            };
            await _orderRepo.AddAsync(freeOrder);
            await _orderRepo.SaveChangesAsync();

            // أنشئ الـ Enrollment مرتبط بالـ Order الوهمي
            await _enrollmentRepo.AddAsync(new Enrollment
            {
                UserId = appUser.Id,
                PlanworkId = planworkId,
                OrderId = freeOrder.Id,
                RoundId = round?.Id,
                EnrolledAt = DateTime.UtcNow,
                IsOnline = false                                             // الكورسات المجانية دائماً حضوري
            });
            await _enrollmentRepo.SaveChangesAsync();

            return Ok(new
            {
                message = "تم تسجيلك في الكورس المجاني بنجاح.",
                alreadyEnrolled = false,
                courseTitle = course.ServiceTitle,
                courseSlug = course.Slug
            });
        }
    }
}