"use client"

import { useEffect, useState } from "react"
import { BookOpen, FileText, Film, Image as ImageIcon } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface Stats {
  videos: number
  photos: number
  books: number
  research: number
}

const DEFAULT_STATS: Stats = { videos: 45, photos: 200, books: 120, research: 85 }

export default function LibrarySection() {
  const [stats, setStats] = useState<Stats>(DEFAULT_STATS)

  useEffect(() => {
    fetch(`${API}/api/stats/`)
      .then(r => r.json())
      .then((data: Stats) => setStats(data))
      .catch(() => {})
  }, [])

  const categories = [
    {
      icon: Film,
      title: "الفيديوهات",
      count: stats.videos,
      desc: "مقاطع فيديو تعليمية وتوثيقية في القانون الدولي الإنساني",
      id: "videos",
    },
    {
      icon: ImageIcon,
      title: "الصور",
      count: stats.photos,
      desc: "صور من الفعاليات والمؤتمرات والأنشطة التدريبية",
      id: "gallery",
    },
    {
      icon: BookOpen,
      title: "الكتب والمنشورات",
      count: stats.books,
      desc: "مجموعة شاملة من الكتب والمنشورات المتخصصة في القانون الإنساني",
      id: "books",
    },
    {
      icon: FileText,
      title: "البحوث والدراسات",
      count: stats.research,
      desc: "أبحاث ودراسات أعدّها خبراء ومتخصصون في المجال",
      id: "research",
    },
  ]

  const total = stats.videos + stats.photos + stats.books + stats.research

  return (
    <section id="library" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-(--teal)/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-bold text-primary mb-4 tracking-[0.2em] uppercase">مصادر المعرفة</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 text-balance">
            المكتبة <span className="text-primary">الرقمية</span>
          </h2>
          <div className="section-divider mx-auto max-w-sm mb-6" />
          <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
            مكتبة رقمية شاملة تضم مصادر القانون الدولي الإنساني من فيديوهات وصور وكتب وأبحاث
          </p>
        </div>

        {/* Library Layout */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Feature Image Card */}
          <div className="lg:col-span-2 glass-card rounded-3xl overflow-hidden group relative min-h-105">
            <img
              src="/images/library-bg.jpg"
              alt="مكتبة معهد دونان"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
            <div className="absolute bottom-0 right-0 left-0 p-7">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                مكتبة معهد دونان
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                اكتشف مجموعتنا الشاملة من المراجع والمصادر في القانون الدولي الإنساني
              </p>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold text-primary glow-text">+{total}</span>
                <span className="text-sm text-muted-foreground">مرجع ومصدر</span>
              </div>
            </div>
          </div>

          {/* Category Cards Grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            {categories.map((cat, i) => (
              <div
                key={i}
                id={cat.id}
                className="glass-card rounded-2xl p-6 group hover:scale-[1.03] hover:border-primary/30 transition-all duration-500 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start gap-4">
                  <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300 shrink-0">
                    <cat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                        {cat.title}
                      </h4>
                      <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/15">
                        {cat.count}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
