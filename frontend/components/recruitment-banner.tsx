"use client"

import { useState, useRef } from "react"
import { toast } from "sonner"
import { UserPlus, X, Upload, CheckCircle, Sparkles, Loader2 } from "lucide-react"

export default function RecruitmentBanner() {
  const [showModal, setShowModal] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState("")
  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const form = formRef.current!
    const formData = new FormData()
    formData.append("full_name", (form.elements.namedItem("full_name") as HTMLInputElement).value)
    formData.append("nationality", (form.elements.namedItem("nationality") as HTMLInputElement).value)
    formData.append("country", (form.elements.namedItem("country") as HTMLSelectElement).value)
    formData.append("city", (form.elements.namedItem("city") as HTMLInputElement).value)
    formData.append("specialization", (form.elements.namedItem("specialization") as HTMLInputElement).value)
    const file = fileInputRef.current?.files?.[0]
    if (file) formData.append("document", file)

    try {
      const res = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        body: formData,
      })
      if (res.ok) {
        toast.success("تم التسجيل بنجاح", {
          description: "شكراً لتقديمك. سنتواصل معك عند توفر فرصة تدريبية مناسبة.",
          duration: 5000,
        })
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setShowModal(false)
          setFileName("")
          formRef.current?.reset()
        }, 3000)
      } else {
        const data = await res.json()
        const msg = Object.values(data).flat().join(" | ")
        toast.error("حدث خطأ", { description: msg })
      }
    } catch {
      toast.error("تعذّر الاتصال بالخادم", { description: "يرجى المحاولة مرة أخرى لاحقاً." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Prominent Fixed Banner */}
      <section className="relative py-10 lg:py-14 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-linear-to-l from-primary/5 via-background to-(--teal)/5" />
        <div className="absolute inset-0 geometric-pattern opacity-15" />
        <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-(--teal)/8 blur-[80px]" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 lg:p-12 relative overflow-hidden glow-gold">
            {/* Top decorative border */}
            <div className="absolute top-0 right-0 left-0 h-1 bg-linear-to-l from-transparent via-primary/60 to-transparent" />

            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-primary/10 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-tr from-(--teal)/10 to-transparent rounded-tr-full" />

            <div className="relative">
              {/* Icon and header */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="h-6 w-6 text-primary animate-pulse-glow" />
                <h2 className="text-xl lg:text-2xl font-extrabold text-primary text-center">
                  دعوة للانضمام إلى الهيئة التدريبية
                </h2>
                <Sparkles className="h-6 w-6 text-primary animate-pulse-glow" />
              </div>

              {/* Message */}
              <p className="text-sm lg:text-base text-secondary-foreground leading-[1.9] text-center max-w-5xl mx-auto mb-6">
                يدعو معهد دونان للاستشارات والتدريب الكفاءات من المواطنين والمقيمين في دول مجلس التعاون لدول الخليج العربية إلى الانضمام إلى الهيئة التدريبية للمعهد بنظام الدوام الجزئي. وعلى الراغبين ممن يمتلكون خبرة تخصصية في مجال القانون الدولي الإنساني التكرم بإرسال ما يلي:
              </p>

              {/* Requirements list */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <div className="glass rounded-xl px-5 py-3 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">1</span>
                  <span className="text-sm text-foreground font-medium">السيرة الذاتية (محدثة)</span>
                </div>
                <div className="glass rounded-xl px-5 py-3 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">2</span>
                  <span className="text-sm text-foreground font-medium">اسم المادة التدريبية المقترحة متضمنة المحاور والعناوين الفرعية</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center mb-8 max-w-4xl mx-auto leading-relaxed">
                وسيتم التواصل مع المتقدمين عند توفر فرصة لإلقاء محاضرة أو تقديم دورة أو تنفيذ ورشة تدريبية تتوافق مع تخصصاتهم، وذلك ضمن النطاق الجغرافي المرتبط بمقر إقامة المحاضر/المدرب قدر الإمكان.
              </p>

              {/* CTA */}
              <div className="flex justify-center">
                <button
                  onClick={() => setShowModal(true)}
                  className="group relative overflow-hidden flex items-center gap-3 px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base transition-all duration-300 hover:shadow-[0_0_50px_oklch(0.78_0.15_75/0.4)]"
                >
                  <UserPlus className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span className="relative z-10">سجّل الآن</span>
                  <div className="absolute inset-0 bg-linear-to-l from-(--gold-light) to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={() => !submitted && !loading && setShowModal(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-2xl glass-strong rounded-3xl p-8 lg:p-10 animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              disabled={loading}
              className="absolute top-4 left-4 p-2 rounded-xl glass text-muted-foreground hover:text-foreground transition-colors"
              aria-label="إغلاق"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Decorative top line */}
            <div className="absolute top-0 right-0 left-0 h-1 bg-linear-to-l from-transparent via-primary to-transparent rounded-t-3xl" />

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20 animate-in zoom-in duration-500">
                  <CheckCircle className="h-10 w-10 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground">تم التسجيل بنجاح</h3>
                <p className="text-sm text-muted-foreground text-center">
                  شكراً لتقديمك. سنتواصل معك عند توفر فرصة تدريبية مناسبة.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
                    <UserPlus className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">نموذج التسجيل</h3>
                  <p className="text-sm text-muted-foreground">
                    للانضمام إلى الهيئة التدريبية لمعهد دونان
                  </p>
                </div>

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
                        className="w-full rounded-xl bg-input/50 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                        placeholder="الاسم الثلاثي"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        الجنسية <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        name="nationality"
                        required
                        className="w-full rounded-xl bg-input/50 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                        placeholder="الجنسية"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        الدولة <span className="text-destructive">*</span>
                      </label>
                      <select
                        name="country"
                        required
                        className="w-full rounded-xl bg-input/50 border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all appearance-none"
                      >
                        <option value="">اختر الدولة</option>
                        <option value="oman">سلطنة عُمان</option>
                        <option value="saudi">المملكة العربية السعودية</option>
                        <option value="uae">الإمارات العربية المتحدة</option>
                        <option value="kuwait">الكويت</option>
                        <option value="qatar">قطر</option>
                        <option value="bahrain">البحرين</option>
                        <option value="other">أخرى</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        المدينة <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        className="w-full rounded-xl bg-input/50 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                        placeholder="مدينة الإقامة"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      مجال التخصص <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      required
                      className="w-full rounded-xl bg-input/50 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                      placeholder="مجال التخصص في القانون الدولي الإنساني"
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      تحميل الوثائق (السيرة الذاتية + المادة التدريبية المقترحة)
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-border hover:border-primary/40 bg-input/30 cursor-pointer transition-all group">
                      <Upload className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors mb-2" />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {fileName || "اضغط لتحميل الملفات أو اسحبها هنا"}
                      </span>
                      <span className="text-[10px] text-muted-foreground/60 mt-1">
                        PDF, DOC, DOCX
                      </span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:shadow-[0_0_30px_oklch(0.78_0.15_75/0.3)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <UserPlus className="h-5 w-5" />
                    )}
                    {loading ? "جاري الإرسال..." : "إرسال الطلب"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
