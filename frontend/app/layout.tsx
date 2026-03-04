import type { Metadata, Viewport } from 'next'
import { Noto_Kufi_Arabic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const notoKufi = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-noto-kufi',
})

export const metadata: Metadata = {
  title: 'معهد دونان للاستشارات والتدريب | القانون الدولي الإنساني',
  description: 'معهد دونان للاستشارات والتدريب - مؤسسة رائدة في مجال القانون الدولي الإنساني في منطقة الخليج العربي. تدريب واستشارات وبناء قدرات في القانون الإنساني واتفاقيات جنيف.',
  keywords: [
    'القانون الدولي الإنساني',
    'القانون الإنساني',
    'قانون الحرب',
    'قانون النزاعات المسلحة',
    'اتفاقيات جنيف',
    'دونان',
    'البروتوكولات الإضافية',
    'مصادر القانون الدولي الإنساني',
    'القانون العرفي',
    'اللجنة الوطنية للقانون الدولي الإنساني',
    'سالم المسهلي',
    'معهد دونان',
    'تدريب القانون الدولي',
    'استشارات قانونية',
    'القانون الإنساني الدولي',
    'حماية المدنيين في النزاعات المسلحة',
    'الخليج العربي',
    'سلطنة عمان',
    'Dunant Institute',
    'International Humanitarian Law',
    'IHL training',
    'Geneva Conventions',
    'law of armed conflict',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_OM',
    title: 'معهد دونان للاستشارات والتدريب | القانون الدولي الإنساني',
    description: 'معهد دونان للاستشارات والتدريب - مؤسسة رائدة في مجال القانون الدولي الإنساني في منطقة الخليج العربي. تدريب واستشارات وبناء قدرات في القانون الإنساني واتفاقيات جنيف.',
    siteName: 'معهد دونان للاستشارات والتدريب',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'معهد دونان للاستشارات والتدريب | القانون الدولي الإنساني',
    description: 'معهد دونان للاستشارات والتدريب - مؤسسة رائدة في مجال القانون الدولي الإنساني في منطقة الخليج العربي.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0e1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${notoKufi.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  )
}
