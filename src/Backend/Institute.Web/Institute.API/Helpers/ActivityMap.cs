namespace Institute.API.Helpers
{
    public static class ActivityMap
    {
        // controller (+ route) -> sidebar tab id + part inside the tab
        public static (string Section, string? Sub) Resolve(string controller, string path)
        {
            var c = controller.ToLowerInvariant();
            var p = path.ToLowerInvariant();

            switch (c)
            {
                case "adminteam": return ("team", null);
                case "admincustomer": return ("customers", null);
                case "adminprotocol": return ("protocols", null);
                case "admincertifications": return ("siteCerts", null);
                case "adminnews": return ("news", null);
                case "adminlecturer": return ("lecturers", null);
                case "adminbook": return ("books", "الكتب");
                case "adminbookstype": return ("books", "أنواع الكتب");
                case "adminplanwork": return ("planwork", p.Contains("round") ? "مواعيد الانعقاد" : "بيانات الدورة");
                case "adminplanfiles": return ("planwork", "ملفات الدورة");
                case "adminplanemails": return ("planwork", "إيميلات المشتركين حضورياً");
                case "refund": return ("refunds", null);
                case "adminusers": return ("settings", "المديرون");
                case "userpermissions": return ("settings", "صلاحيات الأدمن");
                case "admin":
                    if (p.Contains("attendance")) return ("attendance", null);
                    if (p.Contains("certificate") || p.Contains("upload")) return ("certificates", null);
                    if (p.Contains("planwork")) return ("courses", null);
                    if (p.Contains("user")) return ("users", null);
                    return ("other", null);
                default: return ("other", null);
            }
        }

        public static string EntityLabel(string entity) => entity switch
        {
            "TeamMember" => "عضو فريق العمل",
            "Planwork" => "دورة",
            "PlanFile" => "ملف دورة",
            "PlanEnrolledEmail" => "إيميل مشترك حضوري",
            "PlanworkRound" => "موعد انعقاد",
            "Lecturer" => "محاضر",
            "Customer" => "عميل",
            "Book" => "كتاب",
            "BooksType" => "نوع كتب",
            "Dailynews" => "خبر",
            "NewsPic" => "صورة خبر",
            "CertificationItem" => "شهادة / خطاب شكر",
            "ProtocolGroup" => "مجموعة بروتوكولات",
            "ProtocolItem" => "بروتوكول",
            "Enrollment" => "تسجيل",
            "Certificate" => "شهادة متدرب",
            "RefundRequest" => "طلب استرداد",
            "AppUser" => "مستخدم",
            "UserPermission" => "صلاحية مستخدم",
            _ => entity
        };

        public static string Field(string name) => name switch
        {
            "Name" => "الاسم",
            "Role" => "المنصب",
            "Level" => "المستوى",
            "DisplayOrder" => "ترتيب العرض",
            "IsActive" => "ظاهر / مفعّل",
            "Email" => "البريد الإلكتروني",
            "Details" => "التفاصيل",
            "Pic" => "الصورة",
            "Logo" => "الشعار",
            "Title" => "العنوان",
            "LinkUrl" => "الرابط",
            "LinkText" => "نص الرابط",
            "Type" => "النوع",
            "PlanCost" => "سعر الدورة",
            "OnlineCost" => "سعر الأونلاين",
            "IsOnline" => "أونلاين",
            "OnlineLink" => "رابط الأونلاين",
            "CourseContent" => "محتوى الدورة",
            "CourseDate" => "تاريخ الدورة",
            "CourseDays" => "أيام الدورة",
            "CourseDesc" => "وصف الدورة",
            "CoursePlace" => "مكان الدورة",
            "MainFlag" => "رئيسية",
            "DetailsFlag" => "عرض التفاصيل",
            "SpecialFlag" => "مميزة",
            "SponsorFlag" => "مُرعاة",
            "SponsorDesc" => "وصف الرعاية",
            "ParentId" => "القسم الأب",
            "StartDate" => "تاريخ البداية",
            "EndDate" => "تاريخ النهاية",
            "FileName" => "اسم الملف",
            "FileTitle" => "عنوان الملف",
            "FilePeriorty" => "ترتيب الملف",
            "Status" => "الحالة",
            "AdminNote" => "ملاحظة الأدمن",
            "RejectionReason" => "سبب الرفض",
            "Amount" => "المبلغ",
            "IsManager" => "مدير (Manager)",
            "IsAdmin" => "أدمن (Admin)",
            "Attended" => "الحضور",
            "Author" => "المؤلف",
            "TypeName" => "اسم النوع",
            "LecturerName" => "اسم المحاضر",
            "Telephone" => "الهاتف",
            "ATitel" => "عنوان الخبر",
            "ADetails" => "تفاصيل الخبر",
            "ShowFlag" => "ظاهر",
            "Approved" => "معتمد",
            "AppUserId" => "المستخدم",
            "PermissionId" => "الصلاحية",
            "PlanId" => "رقم الدورة",
            "PlanworkId" => "رقم الدورة",
            "UserId" => "رقم المستخدم",
            _ => name
        };
    }
}