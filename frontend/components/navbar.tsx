"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface SubItem {
  label: string
  href: string
}

interface NavLink {
  label: string
  href: string
  children?: SubItem[]
}

const navLinks: NavLink[] = [
  { label: "الرئيسية", href: "#hero" },
  {
    label: "عن المعهد",
    href: "#about",
    children: [
      { label: "كلمة المدير العام", href: "#director" },
      { label: "الرؤية", href: "#vision" },
      { label: "الأهداف", href: "#goals" },
      { label: "الهيكل التنظيمي", href: "#structure" },
      { label: "هيئة التدريب", href: "#trainers" },
    ],
  },
  {
    label: "خدماتنا",
    href: "#services",
    children: [
      { label: "المحاضرات", href: "#lectures" },
      { label: "الدورات", href: "#courses" },
      { label: "المحاضرين والمدربين", href: "#trainers-list" },
    ],
  },
  { label: "الأنشطة والفعاليات", href: "#activities" },
  {
    label: "المكتبة",
    href: "#library",
    children: [
      { label: "الفيديوهات", href: "#videos" },
      { label: "الصور", href: "#gallery" },
      { label: "الكتب والمنشورات", href: "#books" },
      { label: "البحوث والدراسات", href: "#research" },
    ],
  },
  {
    label: "مصادر القانون الدولي الإنساني",
    href: "#ihl-sources",
    children: [
      { label: "الاتفاقيات المكتوبة", href: "#conventions" },
      { label: "القانون العرفي", href: "#customary-law" },
      { label: "السوابق القضائية", href: "#case-law" },
    ],
  },
  { label: "تواصل معنا", href: "#contact" },
]

const DEFAULT_NEWS = [
  "يدعو معهد دونان للاستشارات والتدريب الكفاءات من المواطنين والمقيمين في دول مجلس التعاون للانضمام إلى الهيئة التدريبية",
  "افتتاح التسجيل في دورة مقدمة عن القانون الدولي الإنساني",
  "تعاون جديد مع اللجنة الدولية للصليب الأحمر في مجال التدريب",
  "إطلاق برنامج الاستهداف في سياق القانون الدولي الإنساني",
]

function DropdownMenu({ items, isOpen }: { items: SubItem[]; isOpen: boolean }) {
  return (
    <div
      className={`absolute top-full right-0 mt-2 min-w-55 glass-strong rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      <div className="py-2">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.href}
            className="block px-5 py-2.5 text-sm text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null)
  const [newsItems, setNewsItems] = useState<string[]>(DEFAULT_NEWS)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    fetch(`${API}/api/news/`)
      .then(r => r.json())
      .then((data: { title: string }[]) => {
        if (data.length) setNewsItems(data.map(n => n.title))
      })
      .catch(() => {})
  }, [])

  const handleMouseEnter = (index: number) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setOpenDropdown(index)
  }

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 200)
  }

  return (
    <>
      {/* Top Bar with contact info */}
      <div className="hidden lg:block bg-primary/5 border-b border-primary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-6">
              <a
                href="https://wa.me/+96872220480"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                dir="ltr"
              >
                <Phone className="h-3 w-3" />
                <span>+968 7222 0480</span>
              </a>
              <a
                href="mailto:info@dunant-institute.org"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-3 w-3" />
                <span dir="ltr">info@dunant-institute.org</span>
              </a>
            </div>
            <span className="text-xs text-muted-foreground">
              معهد دونان للاستشارات والتدريب
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-nav py-2" : "glass-nav py-3"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-3 group shrink-0">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-primary/5" />
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 28 28"
                  fill="none"
                  className="text-primary relative z-10"
                >
                  <path
                    d="M14 2L2 8v12l12 6 12-6V8L14 2z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path d="M14 8L8 11v6l6 3 6-3v-6l-6-3z" fill="currentColor" opacity="0.3" />
                  <path d="M14 10l-4 2v4l4 2 4-2v-4l-4-2z" fill="currentColor" opacity="0.7" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-primary leading-tight">معهد دونان للاستشارات والتدريب</span>
                <span className="text-[9px] text-muted-foreground/70 leading-tight">شركة الحلول الاستراتيجية الشاملة ش.م.م</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-0.5">
              {navLinks.map((link, index) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.children && handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href={link.href}
                    className="flex items-center gap-1 px-3 py-2 text-[13px] font-medium rounded-lg text-secondary-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    {link.label}
                    {link.children && <ChevronDown className="h-3 w-3 opacity-50" />}
                  </a>
                  {link.children && (
                    <DropdownMenu items={link.children} isOpen={openDropdown === index} />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2.5 rounded-xl glass text-foreground"
              aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`xl:hidden overflow-hidden transition-all duration-500 ${
              isOpen ? "max-h-[80vh] mt-4 overflow-y-auto" : "max-h-0"
            }`}
          >
            <div className="glass-card rounded-2xl p-3 flex flex-col gap-0.5">
              {/* Mobile contact info */}
              <div className="flex items-center gap-4 px-4 py-3 border-b border-border/50 mb-2">
                <a
                  href="https://api.whatsapp.com/send?phone=96872220480"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                  dir="ltr"
                >
                  <Phone className="h-3 w-3 text-primary" />
                  +968 7222 0480
                </a>
                <a
                  href="mailto:info@dunant-institute.org"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <Mail className="h-3 w-3 text-primary" />
                  <span dir="ltr">info@dunant-institute.org</span>
                </a>
              </div>

              {navLinks.map((link, index) => (
                <div key={link.href}>
                  <div className="flex items-center">
                    <a
                      href={link.href}
                      onClick={() => !link.children && setIsOpen(false)}
                      className="flex-1 px-4 py-3 text-sm font-medium text-secondary-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                    >
                      {link.label}
                    </a>
                    {link.children && (
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === index ? null : index)}
                        className="p-3 text-muted-foreground"
                        aria-label="توسيع"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            mobileExpanded === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  {link.children && mobileExpanded === index && (
                    <div className="mr-6 mb-2 flex flex-col gap-0.5 border-r-2 border-primary/20 pr-4">
                      {link.children.map((child, ci) => (
                        <a
                          key={ci}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* News Ticker */}
      <div className="bg-primary/10 border-b border-primary/10 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-2 gap-4">
            <span className="shrink-0 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              آخر الأخبار
            </span>
            <div className="overflow-hidden flex-1 relative">
              <div className="animate-marquee whitespace-nowrap flex gap-16">
                {[...newsItems, ...newsItems].map((item, i) => (
                  <span key={i} className="text-xs text-secondary-foreground inline-block">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
