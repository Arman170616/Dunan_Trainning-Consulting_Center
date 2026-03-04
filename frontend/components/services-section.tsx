"use client"

import { useEffect, useState } from "react"
import { BookOpen, GraduationCap, Users, Clock, ChevronDown, ChevronUp } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface Lecture {
  id: number
  title: string
  duration: string
  topics: string[]
  color: string
  order: number
}

const DEFAULT_LECTURES: Lecture[] = [
  {
    id: 1,
    title: "مقدمة عن القانون الدولي الإنساني",
    duration: "90 دقيقة",
    color: "primary",
    order: 1,
    topics: [
      "التعريف",
      "النشأة والتطور",
      "مصادر القانون",
      "العلاقة بين القانون الدولي الإنساني وقانون حقوق الإنسان",
      "المبادئ الأساسية للقانون",
      "المسؤولية المباشرة وغير المباشرة",
      "تصنيف النزاعات المسلحة",
      "استخدامات الإشارات الدولية",
    ],
  },
  {
    id: 2,
    title: "الاستهداف في سياق القانون الدولي الإنساني",
    duration: "60 دقيقة",
    color: "teal",
    order: 2,
    topics: [
      "أهمية وصف الأهداف",
      "خصائص الأهداف",
      "مراحل دورة الاستهداف",
      "الإطار القانوني والأخلاقي للاستهداف",
      "الأهداف العسكرية المشروعة في القانون الدولي الإنساني",
      "معايير تحديد الأهداف",
      "التدابير الاحتياطية قبل الهجوم",
      "تطبيق مبادئ القانون الدولي الإنساني على سير العمليات العدائية",
    ],
  },
]

export default function ServicesSection() {
  const [lectures, setLectures] = useState<Lecture[]>(DEFAULT_LECTURES)
  const [courseCount, setCourseCount] = useState("30+")
  const [trainerCount, setTrainerCount] = useState("50+")
  const [expanded, setExpanded] = useState<Record<number, boolean>>({})

  useEffect(() => {
    fetch(`${API}/api/lectures/`)
      .then(r => r.json())
      .then((data: Lecture[]) => { if (data.length) setLectures(data) })
      .catch(() => {})

    fetch(`${API}/api/courses/`)
      .then(r => r.json())
      .then((data: unknown[]) => { if (data.length) setCourseCount(`${data.length}+`) })
      .catch(() => {})

    fetch(`${API}/api/trainers/`)
      .then(r => r.json())
      .then((data: unknown[]) => { if (data.length) setTrainerCount(`${data.length}+`) })
      .catch(() => {})
  }, [])

  const toggle = (id: number) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }))

  const serviceCards = [
    { icon: BookOpen, title: "المحاضرات", desc: "محاضرات متخصصة في القانون الدولي الإنساني يقدمها خبراء دوليون", count: `${lectures.length}+` },
    { icon: GraduationCap, title: "الدورات التدريبية", desc: "دورات مكثفة لتأهيل الكوادر الوطنية في مجال القانون الإنساني", count: courseCount },
    { icon: Users, title: "المحاضرين والمدربين", desc: "نخبة من الخبراء والمتخصصين في القانون الدولي الإنساني", count: trainerCount },
  ]

  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-(--teal)/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-bold text-primary mb-4 tracking-[0.2em] uppercase">ما نقدمه</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 text-balance">
            خدماتنا <span className="text-primary">التدريبية</span>
          </h2>
          <div className="section-divider mx-auto max-w-sm mb-6" />
          <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
            نقدّم مجموعة متنوعة من المحاضرات والدورات التدريبية المتخصصة في مجال القانون الدولي الإنساني
          </p>
        </div>

        {/* Service Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {serviceCards.map((item, i) => (
            <div key={i} className="glass-card rounded-2xl p-7 group hover:scale-[1.03] hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-4 left-4 text-5xl font-extrabold text-primary/5 select-none">{item.count}</div>
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-5 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-3">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lectures Detail */}
        <div id="lectures" className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground text-center mb-10">
            تفاصيل <span className="text-primary">المحاضرات</span>
          </h3>

          <div className="flex flex-col gap-6">
            {lectures.map((lecture, idx) => {
              const isTeal = lecture.color === "teal"
              const isOpen = !!expanded[lecture.id]
              const colorCls = isTeal ? "text-(--teal)" : "text-primary"
              const bgBorder = isTeal ? "bg-(--teal)/10 border-(--teal)/20" : "bg-primary/10 border-primary/20"
              const topLine = isTeal
                ? "bg-linear-to-l from-transparent via-(--teal)/50 to-transparent"
                : "bg-linear-to-l from-transparent via-primary/50 to-transparent"
              const numBg = isTeal ? "bg-(--teal)/15 text-(--teal)" : "bg-primary/15 text-primary"

              return (
                <div key={lecture.id} className="glass-card rounded-3xl overflow-hidden relative">
                  <div className={`absolute top-0 right-0 left-0 h-1 ${topLine}`} />
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border shrink-0 ${bgBorder}`}>
                          <BookOpen className={`h-6 w-6 ${colorCls}`} />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-foreground">
                            المحاضرة {idx === 0 ? "الأولى" : idx === 1 ? "الثانية" : idx === 2 ? "الثالثة" : `${idx + 1}`}
                          </h4>
                          <p className={`${colorCls} font-semibold text-sm mt-1`}>{lecture.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 glass rounded-full px-4 py-2 w-fit">
                        <Clock className={`h-4 w-4 ${colorCls}`} />
                        <span className="text-sm font-medium text-foreground">{lecture.duration}</span>
                      </div>
                    </div>

                    <div className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-150" : "max-h-0"}`}>
                      <div className="grid sm:grid-cols-2 gap-3 mb-4">
                        {lecture.topics.map((topic, ti) => (
                          <div key={ti} className="flex items-start gap-3 glass rounded-xl px-4 py-3">
                            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold shrink-0 mt-0.5 ${numBg}`}>
                              {ti + 1}
                            </span>
                            <span className="text-sm text-secondary-foreground leading-relaxed">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => toggle(lecture.id)}
                      className={`flex items-center gap-2 text-sm font-semibold ${colorCls} hover:opacity-80 transition-colors mt-2`}
                    >
                      {isOpen ? "إخفاء المحتويات" : "عرض المحتويات"}
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
