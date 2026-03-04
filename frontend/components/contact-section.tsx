"use client"

import { useState, useRef } from "react"
import { toast } from "sonner"
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle, Loader2 } from "lucide-react"

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const form = formRef.current!
    const body = {
      full_name: (form.elements.namedItem("full_name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch("http://localhost:8000/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        toast.success("تم إرسال رسالتك بنجاح", {
          description: "سنتواصل معك في أقرب وقت ممكن.",
          duration: 5000,
        })
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          formRef.current?.reset()
        }, 4000)
      } else {
        const data = await res.json()
        toast.error("حدث خطأ", { description: Object.values(data).flat().join(" | ") })
      }
    } catch {
      toast.error("تعذّر الاتصال بالخادم", { description: "يرجى المحاولة مرة أخرى لاحقاً." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden animated-bg">
      <div className="absolute inset-0 geometric-pattern opacity-10" />
      <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-(--teal)/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-bold text-primary mb-4 tracking-[0.2em] uppercase">نحن هنا لمساعدتك</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 text-balance">
            تواصل <span className="text-primary">معنا</span>
          </h2>
          <div className="section-divider mx-auto max-w-sm" />
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="glass-card rounded-3xl p-7 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-primary/8 to-transparent rounded-bl-full" />
              <div className="relative">
                <h3 className="text-lg font-bold text-foreground mb-7">معلومات التواصل</h3>
                <div className="flex flex-col gap-6">
                  {/* Phone / WhatsApp */}
                  <a
                    href="https://wa.me/96872220480"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 border border-green-500/20 group-hover:bg-green-500/15 transition-all shrink-0">
                      <MessageCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground mb-0.5 group-hover:text-green-400 transition-colors">
                        الهاتف / واتساب
                      </div>
                      <div className="text-sm text-muted-foreground" dir="ltr">
                        +968 7222 0480
                      </div>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@dunant-institute.org"
                    className="flex items-start gap-4 group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-all shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground mb-0.5 group-hover:text-primary transition-colors">
                        البريد الإلكتروني
                      </div>
                      <div className="text-sm text-muted-foreground" dir="ltr">
                        info@dunant-institute.org
                      </div>
                    </div>
                  </a>

                  {/* Phone */}
                  <a href="tel:+96872220480" className="flex items-start gap-4 group">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-all shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground mb-0.5 group-hover:text-primary transition-colors">
                        الهاتف
                      </div>
                      <div className="text-sm text-muted-foreground" dir="ltr">
                        +968 7222 0480
                      </div>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground mb-0.5">العنوان</div>
                      <div className="text-sm text-muted-foreground">سلطنة عُمان</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="glass-card rounded-3xl overflow-hidden flex-1 min-h-45 relative">
              <div className="absolute inset-0 bg-linear-to-br from-secondary/40 to-secondary/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto h-8 w-8 text-primary/30 mb-2" />
                  <p className="text-xs text-muted-foreground">موقعنا على الخريطة</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-3xl p-7 lg:p-9 relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-0.5 bg-linear-to-l from-transparent via-primary/40 to-transparent" />

              <h3 className="text-lg font-bold text-foreground mb-7">أرسل لنا رسالة</h3>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20 animate-in zoom-in duration-500">
                    <CheckCircle className="h-10 w-10 text-green-400" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground">تم إرسال رسالتك بنجاح</h4>
                  <p className="text-sm text-muted-foreground">سنتواصل معك في أقرب وقت ممكن</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        الاسم الكامل <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        required
                        className="w-full rounded-xl bg-input/50 border border-border px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        البريد الإلكتروني <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full rounded-xl bg-input/50 border border-border px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                        placeholder="example@email.com"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      الموضوع <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      className="w-full rounded-xl bg-input/50 border border-border px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                      placeholder="موضوع الرسالة"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      الرسالة <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full rounded-xl bg-input/50 border border-border px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                      placeholder="اكتب رسالتك هنا..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group self-start flex items-center gap-3 px-10 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:shadow-[0_0_30px_oklch(0.78_0.15_75/0.3)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-0.5" />
                    )}
                    {loading ? "جاري الإرسال..." : "إرسال الرسالة"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
