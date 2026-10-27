using System.Text;

namespace Institute.Application.Services
{
    /// <summary>
    /// "Refund requested" email. All values passed in MUST already be HTML-encoded.
    /// </summary>
    public static class RefundRequestedEmailRenderer
    {
        private const string Font = "Tahoma, Arial, sans-serif";
        private const string Navy = "#10264d", Blue = "#1a3c6e", Red = "#c0392b";
        private const string Bg = "#f2f4f8", Text = "#222222", Muted = "#6b7280", Line = "#e5e7eb", Head = "#f3f5f9";
        private const string BrandAr = "المعهد التكنولوجي لهندسة التشييد والإدارة";

        public static string Render(IReadOnlyDictionary<string, string> v)
        {
            var sb = new StringBuilder(8 * 1024);

            sb.Append("<!DOCTYPE html><html dir=\"rtl\" lang=\"ar\"><head><meta charset=\"utf-8\"/>")
              .Append("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>")
              .Append("<title>طلب استرداد ").Append(v["RefNumber"]).Append("</title></head>")
              .Append("<body style=\"margin:0;padding:0;background-color:").Append(Bg).Append("\">")
              .Append("<table role=\"presentation\" dir=\"rtl\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color:").Append(Bg).Append("\"><tbody><tr>")
              .Append("<td align=\"center\" style=\"padding:24px 12px\">")
              .Append("<table role=\"presentation\" dir=\"rtl\" width=\"640\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;max-width:640px;background-color:#ffffff;border-radius:8px\"><tbody>");

            // Header
            sb.Append("<tr><td style=\"background-color:").Append(Navy).Append(";padding:20px 24px;border-radius:8px 8px 0 0\">")
              .Append("<table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr>")
              .Append("<td style=\"vertical-align:middle;text-align:right\">")
              .Append("<div style=\"font-family:").Append(Font).Append(";font-size:12px;color:#9fb3d9\">").Append(BrandAr).Append("</div>")
              .Append("<div style=\"font-family:").Append(Font).Append(";font-size:20px;font-weight:bold;color:#ffffff\">طلب استرداد جديد 🔔</div></td>")
              .Append("<td style=\"vertical-align:middle;text-align:left\"><span style=\"font-family:").Append(Font)
              .Append(";font-size:13px;color:#ffffff;background-color:").Append(Red)
              .Append(";padding:5px 12px;border-radius:14px\">").Append(v["RefNumber"]).Append("</span></td>")
              .Append("</tr></tbody></table></td></tr>");

            // Body
            sb.Append("<tr><td style=\"padding:8px 24px 24px 24px;font-family:").Append(Font).Append(";color:").Append(Text).Append("\">");

            sb.Append("<div style=\"font-family:").Append(Font).Append(";font-size:16px;line-height:28px;padding:18px 0 0 0;text-align:right\">")
              .Append("طلب المستخدم <b>").Append(v["FullName"]).Append("</b> استرداد كورس <b>").Append(v["Course"])
              .Append("</b> بمبلغ <b style=\"color:").Append(Red).Append("\">").Append(v["Amount"]).Append("</b>.</div>");

            Section(sb, "بيانات الطالب", () =>
            {
                Kv(sb, "الاسم", v["FullName"]);
                Kv(sb, "الإيميل", v["Email"]);
                Kv(sb, "رقم الموبايل", v["Phone"], ltr: true);
                Kv(sb, "رقم المستخدم", v["UserId"]);
            });

            Section(sb, "بيانات الطلب", () =>
            {
                Kv(sb, "رقم طلب الاسترداد", v["RefNumber"]);
                Kv(sb, "رقم الأوردر", v["OrderId"]);
                Kv(sb, "مرجع الأوردر", v["OrderNumber"]);
                Kv(sb, "الكورس", v["Course"]);
                Kv(sb, "مبلغ الاسترداد", v["Amount"]);
                Kv(sb, "تاريخ الطلب", v["RequestedAt"]);
            });

            Section(sb, "سبب الاسترداد", () =>
            {
                Kv(sb, "السبب", v["Reason"]);
                Kv(sb, "تفاصيل", v["Details"]);
            });

            Section(sb, "بيانات الحساب البنكي (مخفية جزئياً)", () =>
            {
                Kv(sb, "البنك", v["BankName"]);
                Kv(sb, "اسم صاحب الحساب", v["AccountHolder"]);
                Kv(sb, "رقم الحساب", v["AccountMasked"], ltr: true);
                Kv(sb, "IBAN", v["IbanMasked"], ltr: true);
            });

            sb.Append("<div style=\"font-family:").Append(Font).Append(";font-size:13px;color:").Append(Muted)
              .Append(";padding:16px 0 0 0\">راجع الطلب من لوحة التحكم (تبويب الاستردادات) للموافقة أو الرفض.</div>");

            sb.Append("</td></tr>");

            // Footer
            sb.Append("<tr><td style=\"font-family:").Append(Font).Append(";font-size:12px;color:").Append(Muted)
              .Append(";padding:14px 24px;background-color:").Append(Head)
              .Append(";border-radius:0 0 8px 8px;text-align:center\">هذا إشعار تلقائي من منصة ").Append(BrandAr)
              .Append(" — لا ترد على هذا الإيميل.</td></tr>");

            sb.Append("</tbody></table></td></tr></tbody></table></body></html>");
            return sb.ToString();
        }

        private static void Section(StringBuilder sb, string title, Action body)
        {
            sb.Append("<table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-top:20px\"><tbody>")
              .Append("<tr><td style=\"font-family:").Append(Font).Append(";font-size:15px;font-weight:bold;color:").Append(Blue)
              .Append(";padding:0 0 6px 0;border-bottom:2px solid ").Append(Red).Append("\">").Append(title).Append("</td></tr>")
              .Append("<tr><td style=\"padding-top:4px\"><table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody>");
            body();
            sb.Append("</tbody></table></td></tr></tbody></table>");
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
    }
}