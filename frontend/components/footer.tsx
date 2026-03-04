import { Heart, Phone, Mail, MessageCircle } from "lucide-react"

const quickLinks = [
  { label: "الرئيسية", href: "#hero" },
  { label: "عن المعهد", href: "#about" },
  { label: "خدماتنا", href: "#services" },
  { label: "الأنشطة والفعاليات", href: "#activities" },
]

const resources = [
  { label: "المكتبة الرقمية", href: "#library" },
  { label: "مصادر القانون الدولي الإنساني", href: "#ihl-sources" },
  { label: "الوسائط المتعددة", href: "#media" },
  { label: "تواصل معنا", href: "#contact" },
]

const sitemap = [
  { label: "الرئيسية", href: "#hero" },
  { label: "كلمة المدير العام", href: "#director" },
  { label: "الرؤية والرسالة", href: "#vision" },
  { label: "الأهداف", href: "#goals" },
  { label: "الهيكل التنظيمي", href: "#structure" },
  { label: "هيئة التدريب", href: "#trainers" },
  { label: "المحاضرات والدورات", href: "#services" },
  { label: "الأنشطة والفعاليات", href: "#activities" },
  { label: "الفيديوهات والصور", href: "#media" },
  { label: "الكتب والبحوث", href: "#library" },
  { label: "الاتفاقيات المكتوبة", href: "#conventions" },
  { label: "القانون العرفي", href: "#customary-law" },
  { label: "السوابق القضائية", href: "#case-law" },
  { label: "تواصل معنا", href: "#contact" },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-border/30 overflow-hidden">
      <div className="absolute inset-0 animated-bg opacity-40" />
      <div className="absolute inset-0 geometric-pattern opacity-5" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-primary/5" />
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 28 28"
                  fill="none"
                  className="text-primary relative z-10"
                >
                  <path d="M14 2L2 8v12l12 6 12-6V8L14 2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M14 10l-4 2v4l4 2 4-2v-4l-4-2z" fill="currentColor" opacity="0.7" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold text-primary">معهد دونان</span>
                <p className="text-[10px] text-muted-foreground">للاستشارات والتدريب</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-[1.8] max-w-md mb-6">
              مؤسسة رائدة في مجال القانون الدولي الإنساني، نعمل على نشر الوعي وتعزيز ثقافة حماية الكرامة الإنسانية من خلال التدريب والاستشارات وبناء القدرات في دول مجلس التعاون لدول الخليج العربية.
            </p>

            {/* Contact in footer */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/96872220480"
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs text-muted-foreground hover:text-green-400 hover:border-green-500/20 transition-all"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span dir="ltr">+968 7222 0480</span>
              </a>
              <a
                href="mailto:info@dunant-institute.org"
                className="glass rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs text-muted-foreground hover:text-primary hover:border-primary/20 transition-all"
              >
                <Mail className="h-3.5 w-3.5" />
                <span dir="ltr">info@dunant-institute.org</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-5">روابط سريعة</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-5">المصادر</h4>
            <ul className="flex flex-col gap-3">
              {resources.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-5">خريطة الموقع</h4>
            <ul className="flex flex-col gap-3">
              {sitemap.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="inline-block w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="section-divider mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {'جميع الحقوق محفوظة'} &copy; {new Date().getFullYear()} {'معهد دونان للاستشارات والتدريب'}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {'صُنع بـ'}
            <Heart className="h-3 w-3 text-primary fill-primary" />
            {'لخدمة الإنسانية'}
          </p>
        </div>
      </div>
    </footer>
  )
}
