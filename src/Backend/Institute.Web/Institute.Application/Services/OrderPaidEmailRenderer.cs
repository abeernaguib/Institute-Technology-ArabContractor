using System.Text;

namespace Institute.Application.Services
{
    /// <summary>
    /// Builds the "order paid" email HTML entirely in the backend (no external template file).
    /// All values passed in MUST already be HTML-encoded (Enc / Dash in OrderNotificationService).
    /// </summary>
    public static class OrderPaidEmailRenderer
    {
        private const string Font = "Tahoma, Arial, sans-serif";
        private const string Navy = "#10264d", Blue = "#1a3c6e", Orange = "#e07b00";
        private const string Bg = "#f2f4f8", Text = "#222222", Muted = "#6b7280", Line = "#e5e7eb", Head = "#f3f5f9";
        private const string BrandAr = "المعهد التكنولوجي لهندسة التشييد والإدارة";

        public static string Render(
            IReadOnlyDictionary<string, string> v,
            IReadOnlyList<IReadOnlyDictionary<string, string>> items,
            IReadOnlyList<string> warnings)
        {
            var sb = new StringBuilder(16 * 1024);

            sb.Append("<!DOCTYPE html><html dir=\"rtl\" lang=\"ar\"><head><meta charset=\"utf-8\"/>")
              .Append("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>")
              .Append("<title>طلب جديد #").Append(v["OrderId"]).Append("</title></head>")
              .Append("<body style=\"margin:0;padding:0;background-color:").Append(Bg).Append("\">")
              .Append("<table role=\"presentation\" dir=\"rtl\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color:").Append(Bg).Append("\"><tbody><tr>")
              .Append("<td align=\"center\" style=\"padding:24px 12px\">")
              .Append("<table role=\"presentation\" dir=\"rtl\" width=\"640\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;max-width:640px;background-color:#ffffff;border-radius:8px\"><tbody>");

            // ── Header ──
            sb.Append("<tr><td style=\"background-color:").Append(Navy).Append(";padding:20px 24px;border-radius:8px 8px 0 0\">")
              .Append("<table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr>")
              .Append("<td style=\"vertical-align:middle;text-align:right\">")
              .Append("<div style=\"font-family:").Append(Font).Append(";font-size:12px;color:#9fb3d9\">").Append(BrandAr).Append("</div>")
              .Append("<div style=\"font-family:").Append(Font).Append(";font-size:20px;font-weight:bold;color:#ffffff\">تم دفع طلب جديد ✅</div></td>")
              .Append("<td style=\"vertical-align:middle;text-align:left\"><span style=\"font-family:").Append(Font)
              .Append(";font-size:13px;color:#ffffff;background-color:").Append(Orange)
              .Append(";padding:5px 12px;border-radius:14px\">طلب #").Append(v["OrderId"]).Append("</span></td>")
              .Append("</tr></tbody></table></td></tr>");

            // ── Body ──
            sb.Append("<tr><td style=\"padding:8px 24px 24px 24px;font-family:").Append(Font).Append(";color:").Append(Text).Append("\">");

            sb.Append("<div style=\"font-family:").Append(Font).Append(";font-size:16px;line-height:28px;color:").Append(Text)
              .Append(";padding:18px 0 0 0;text-align:right\">اشترى المستخدم <b style=\"display:inline-block\">")
              .Append(v["FullName"]).Append("</b> <b style=\"display:inline-block\">").Append(v["WhatBought"])
              .Append("</b> بإجمالي <b style=\"color:").Append(Orange).Append("\">").Append(v["Total"]).Append("</b>.</div>");

            if (warnings.Count > 0)
            {
                sb.Append("<div style=\"font-family:").Append(Font)
                  .Append(";font-size:13px;background-color:#fff4e5;border:1px solid #f0b95a;border-radius:6px;padding:10px 12px;margin-top:16px;color:#7a4a00\">")
                  .Append("<b>⚠ تنبيه للمراجعة</b>");
                foreach (var w in warnings)
                    sb.Append("<div style=\"margin-top:4px\">• ").Append(w).Append("</div>");
                sb.Append("</div>");
            }

            Section(sb, "بيانات المشتري", () =>
            {
                Kv(sb, "الاسم", v["FullName"]);
                Kv(sb, "الإيميل", v["Email"]);
                if (v.TryGetValue("Phone", out var phone))
                    Kv(sb, "رقم الموبايل", phone, ltr: true);
                Kv(sb, "اسم المستخدم", v["Username"]);
                Kv(sb, "رقم المستخدم", v["UserId"]);
            });

            Section(sb, "بيانات الطلب", () =>
            {
                Kv(sb, "رقم الطلب", v["OrderId"]);
                Kv(sb, "المرجع", v["OrderNumber"]);
                Kv(sb, "حالة الطلب", v["OrderStatus"]);
                Kv(sb, "تاريخ إنشاء الطلب", v["CreatedAt"]);
            });

            Section(sb, "بيانات الدفع", () =>
            {
                Kv(sb, "طريقة الدفع", v["PaymentMethod"]);
                Kv(sb, "حالة الدفع", v["PaymentStatus"]);
                Kv(sb, "المبلغ المدفوع", v["PaidAmount"]);
                Kv(sb, "تاريخ الدفع", v["PaidAt"]);
                Kv(sb, "مرجع الدفع", v["PaymentRef"]);
                Kv(sb, "رقم جلسة الدفع", v["SessionId"]);
            });

            Section(sb, "الكورسات", () => CoursesTable(sb, items, v), raw: true);

            // ── Total ──
            sb.Append("<table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-top:20px;background-color:")
              .Append(Head).Append(";border-radius:6px\"><tbody><tr>")
              .Append("<td style=\"font-family:").Append(Font).Append(";font-size:15px;color:").Append(Muted).Append(";padding:14px 16px;text-align:right\">الإجمالي</td>")
              .Append("<td style=\"font-family:").Append(Font).Append(";font-size:22px;font-weight:bold;color:").Append(Orange)
              .Append(";padding:14px 16px;text-align:left\">").Append(v["Total"]).Append("</td></tr></tbody></table>");

            sb.Append("</td></tr>");

            // ── Footer ──
            sb.Append("<tr><td style=\"font-family:").Append(Font).Append(";font-size:12px;color:").Append(Muted)
              .Append(";padding:14px 24px;background-color:").Append(Head)
              .Append(";border-radius:0 0 8px 8px;text-align:center\">هذا إشعار تلقائي من منصة ").Append(BrandAr)
              .Append(" — لا ترد على هذا الإيميل.</td></tr>");

            sb.Append("</tbody></table></td></tr></tbody></table></body></html>");
            return sb.ToString();
        }

        // ── building blocks ─────────────────────────────────────────
        private static void Section(StringBuilder sb, string title, Action body, bool raw = false)
        {
            sb.Append("<table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-top:20px\"><tbody>")
              .Append("<tr><td style=\"font-family:").Append(Font).Append(";font-size:15px;font-weight:bold;color:").Append(Blue)
              .Append(";padding:0 0 6px 0;border-bottom:2px solid ").Append(Orange).Append("\">").Append(title).Append("</td></tr>")
              .Append("<tr><td style=\"padding-top:4px\">");

            if (raw) body();
            else
            {
                sb.Append("<table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody>");
                body();
                sb.Append("</tbody></table>");
            }

            sb.Append("</td></tr></tbody></table>");
        }

        private static void Kv(StringBuilder sb, string label, string value, bool ltr = false)
        {
            var cell = "font-family:" + Font + ";font-size:14px;padding:8px 4px;border-bottom:1px solid " + Line + ";text-align:right;";
            sb.Append("<tr><td style=\"").Append(cell).Append("color:").Append(Muted).Append(";width:34%\">").Append(label).Append("</td>")
              .Append("<td style=\"").Append(cell).Append("color:").Append(Text).Append(";font-weight:bold;word-break:break-word;overflow-wrap:anywhere\">");
            if (ltr) sb.Append("<span dir=\"ltr\" style=\"display:inline-block\">").Append(value).Append("</span>");
            else sb.Append(value);
            sb.Append("</td></tr>");
        }

        private static void CoursesTable(StringBuilder sb, IReadOnlyList<IReadOnlyDictionary<string, string>> items,
                                         IReadOnlyDictionary<string, string> v)
        {
            var th = "font-family:" + Font + ";font-size:13px;color:" + Blue + ";background-color:" + Head +
                     ";padding:8px 6px;text-align:right;border-bottom:2px solid " + Line + ";";
            var td = "font-family:" + Font + ";font-size:13px;color:" + Text +
                     ";padding:8px 6px;text-align:right;vertical-align:top;border-bottom:1px solid " + Line + ";";

            sb.Append("<table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse\"><thead><tr>")
              .Append("<th style=\"").Append(th).Append("width:28px\">#</th>");
            foreach (var h in new[] { "الكورس", "التاريخ", "الأيام", "المكان", "النوع", "السعر" })
                sb.Append("<th style=\"").Append(th).Append("\">").Append(h).Append("</th>");
            sb.Append("</tr></thead><tbody>");

            foreach (var row in items)
            {
                sb.Append("<tr>");
                foreach (var key in new[] { "No", "Title", "Date", "Days", "Place", "Type", "Price" })
                    sb.Append("<td style=\"").Append(td).Append("font-weight:").Append(key == "Title" ? "bold" : "normal").Append("\">")
                      .Append(row[key]).Append("</td>");
                sb.Append("</tr>");
            }

            sb.Append("</tbody></table><div style=\"font-family:").Append(Font).Append(";font-size:13px;color:").Append(Muted)
              .Append(";padding:10px 4px 0 4px\">عدد الكورسات: ").Append(v["CourseCount"])
              .Append(" (حضوري: ").Append(v["OnsiteCount"]).Append(" • أونلاين: ").Append(v["OnlineCount"]).Append(")</div>");
        }
    }
}