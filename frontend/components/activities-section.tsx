"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin, ArrowLeft } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface Activity {
  id: number
  title: string
  date: string
  location: string
  description: string
  tag: string
  tag_color: string
  image_url: string | null
}

const DEFAULT_ACTIVITIES: Activity[] = [
  {
    id: 1,
    title: "ورشة عمل القانون الدولي الإنساني",
    date: "2026-03-15",
    location: "مسقط، سلطنة عُمان",
    description: "ورشة عمل متخصصة حول تطبيقات القانون الدولي الإنساني في النزاعات المعاصرة",
    tag: "ورشة عمل",
    tag_color: "primary",
    image_url: null,
  },
  {
    id: 2,
    title: "مؤتمر حماية المدنيين",
    date: "2026-04-22",
    location: "الدوحة، قطر",
    description: "مؤتمر إقليمي يجمع خبراء القانون الدولي لمناقشة آليات حماية المدنيين",
    tag: "مؤتمر",
    tag_color: "teal",
    image_url: null,
  },
  {
    id: 3,
    title: "دورة تدريبية للقوات المسلحة",
    date: "2026-05-10",
    location: "أبوظبي، الإمارات",
    description: "برنامج تدريبي مكثف لتأهيل أفراد القوات المسلحة على مبادئ القانون الإنساني",
    tag: "دورة تدريبية",
    tag_color: "primary",
    image_url: null,
  },
  {
    id: 4,
    title: "ندوة مصادر القانون الدولي",
    date: "2026-06-05",
    location: "الكويت",
    description: "ندوة أكاديمية حول مصادر القانون الدولي الإنساني: الاتفاقيات المكتوبة والعرف الدولي",
    tag: "ندوة",
    tag_color: "teal",
    image_url: null,
  },
]

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("ar-OM", { day: "numeric", month: "long", year: "numeric" })
  } catch {
    return dateStr
  }
}

export default function ActivitiesSection() {
  const [activities, setActivities] = useState<Activity[]>(DEFAULT_ACTIVITIES)

  useEffect(() => {
    fetch(`${API}/api/activities/`)
      .then(r => r.json())
      .then((data: Activity[]) => { if (data.length) setActivities(data) })
      .catch(() => {})
  }, [])

  return (
    <section id="activities" className="relative py-24 lg:py-32 overflow-hidden animated-bg">
      <div className="absolute inset-0 geometric-pattern opacity-10" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/6 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-bold text-primary mb-4 tracking-[0.2em] uppercase">فعالياتنا</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 text-balance">
            الأنشطة <span className="text-primary">والفعاليات</span>
          </h2>
          <div className="section-divider mx-auto max-w-sm mb-6" />
          <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
            نقدّم مجموعة متنوعة من الأنشطة والفعاليات التي تهدف إلى تعزيز المعرفة بالقانون الدولي الإنساني
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {activities.map((act, i) => (
            <div
              key={act.id ?? i}
              className="glass-card rounded-3xl p-7 lg:p-8 group hover:scale-[1.02] hover:border-primary/25 transition-all duration-500 relative overflow-hidden"
            >
              {/* Decorative top line */}
              <div className={`absolute top-0 right-0 left-0 h-0.5 ${
                act.tag_color === "teal" ? "bg-linear-to-l from-transparent via-(--teal)/50 to-transparent" : "bg-linear-to-l from-transparent via-primary/50 to-transparent"
              }`} />

              {/* Tag */}
              <div className="mb-5">
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold border ${
                  act.tag_color === "teal"
                    ? "bg-(--teal)/10 text-(--teal) border-(--teal)/20"
                    : "bg-primary/10 text-primary border-primary/20"
                }`}>
                  {act.tag}
                </span>
              </div>

              <h4 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {act.title}
              </h4>

              <p className="text-sm text-muted-foreground leading-[1.8] mb-6">{act.description}</p>

              <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground mb-6">
                <span className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {formatDate(act.date)}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {act.location}
                </span>
              </div>

              <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all group/btn">
                التفاصيل
                <ArrowLeft className="h-4 w-4 transition-transform group-hover/btn:-translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
