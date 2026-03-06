// app/page.tsx
import { Navbar }       from '@/components/landing/Navbar'
import { Hero }         from '@/components/landing/Hero'
import { Stats }        from '@/components/landing/Stats'
import { Features }     from '@/components/landing/Features'
import { Pricing }      from '@/components/landing/Pricing'
import { Testimonials } from '@/components/landing/Testimonials'
import { FAQ }          from '@/components/landing/FAQ'
import { CTA, Footer }  from '@/components/landing/CTA'
import { SectionReveal } from '@/components/landing/SectionReveal'

export const metadata = {
  title: 'Weiiz.ink — Ubah Bio Jadi Mesin Penghasil Uang',
  description: 'Platform bio link #1 Indonesia. Jual produk digital, terima pembayaran, kelola affiliate, dan analitik lengkap — semua dari satu link.',
  openGraph: {
    title: 'Weiiz.ink — Platform Bio Link #1 Indonesia',
    description: 'Satu link. Banyak benefit. 14.200+ creator sudah bergabung.',
    url: 'https://weiiz.ink',
    siteName: 'Weiiz.ink',
    type: 'website',
  },
}

export default function LandingPage() {
  return (
    <div style={{ background: '#050c18' }}>
      {/* Navbar — client (scroll detection) */}
      <Navbar />

      {/* Hero — client (animations) */}
      <Hero />

      {/* Stats — client (animated counters) */}
      <SectionReveal>
        <Stats />
      </SectionReveal>

      {/* Features — server */}
      <SectionReveal>
        <Features />
      </SectionReveal>

      {/* Pricing — client (toggle) */}
      <SectionReveal>
        <Pricing />
      </SectionReveal>

      {/* Testimonials — server */}
      <SectionReveal>
        <Testimonials />
      </SectionReveal>

      {/* FAQ — client (accordion) */}
      <SectionReveal>
        <FAQ />
      </SectionReveal>

      {/* CTA — server */}
      <SectionReveal>
        <CTA />
      </SectionReveal>

      {/* Footer — server */}
      <Footer />
    </div>
  )
}
