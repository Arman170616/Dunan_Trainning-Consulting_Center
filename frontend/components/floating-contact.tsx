"use client"

import { useState } from "react"
import { Phone, MessageCircle, X } from "lucide-react"

const PHONE = "+96872220480"
const WHATSAPP = "https://wa.me/96872220480"

export default function FloatingContact() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {/* Expanded buttons */}
      {open && (
        <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-4 fade-in duration-200">
          {/* WhatsApp */}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-2xl shadow-lg transition-all duration-200 group"
          >
            <MessageCircle className="h-5 w-5 shrink-0" />
            <span className="text-sm font-semibold whitespace-nowrap" dir="ltr">+968 7222 0480</span>
          </a>

          {/* Phone */}
          <a
            href={`tel:${PHONE}`}
            className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 rounded-2xl shadow-lg transition-all duration-200"
          >
            <Phone className="h-5 w-5 shrink-0" />
            <span className="text-sm font-semibold whitespace-nowrap" dir="ltr">+968 7222 0480</span>
          </a>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "إغلاق" : "تواصل معنا"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white shadow-xl transition-all duration-300 hover:scale-110"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}

        {/* Pulse ring */}
        {!open && (
          <span className="absolute h-14 w-14 rounded-full bg-green-400 opacity-40 animate-ping" />
        )}
      </button>
    </div>
  )
}
