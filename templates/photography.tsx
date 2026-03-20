"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: photography
// sections: luxury-hero, gallery-lightbox, agency-services, testimonial-cards, pricing-packages, booking-cta, footer-minimal
// ─────────────────────────────────────────────────────────────────────

const galleryItems = [
  { label: "Portrait — Soft Light", aspect: "portrait" },
  { label: "Wedding — Golden Hour", aspect: "landscape" },
  { label: "Editorial — Vogue Style", aspect: "portrait" },
  { label: "Engagement — Botanical Garden", aspect: "landscape" },
  { label: "Portrait — Studio Series", aspect: "portrait" },
  { label: "Wedding — Candid Joy", aspect: "landscape" },
  { label: "Fine Art — Abstract Form", aspect: "portrait" },
  { label: "Commercial — Brand Shoot", aspect: "landscape" },
]

const services = [
  { title: "Portrait Session", desc: "Individual and family portraits that reveal authentic character." },
  { title: "Wedding Photography", desc: "Full-day coverage of your most cherished day." },
  { title: "Engagement", desc: "Intimate sessions celebrating your love story." },
  { title: "Commercial", desc: "Brand imagery that elevates your business presence." },
  { title: "Fine Art Prints", desc: "Museum-quality archival prints for home or gallery." },
  { title: "Photo Editing", desc: "Professional retouching and color grading services." },
]

const testimonials = [
  {
    name: "Sophia & Daniel",
    role: "Wedding Clients",
    quote: "Elena made us feel completely at ease. The photos are beyond anything we imagined.",
  },
  {
    name: "Claire Bennett",
    role: "Brand Director",
    quote: "Our campaign imagery went from forgettable to award-worthy. Truly exceptional eye.",
  },
  {
    name: "Marcus Reyes",
    role: "Portrait Client",
    quote: "I never like photos of myself. Elena changed that in one session. Absolutely magical.",
  },
]

const packages = [
  {
    name: "Essential",
    price: "$1,800",
    duration: "4-hour session",
    features: ["4 hours coverage", "300+ edited images", "Online gallery", "Print release", "2-week delivery"],
  },
  {
    name: "Classic",
    price: "$2,800",
    duration: "8-hour session",
    features: [
      "8 hours coverage",
      "600+ edited images",
      "Online gallery",
      "Print release",
      "Second shooter",
      "1-week delivery",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$4,500",
    duration: "Full day",
    features: [
      "10+ hours coverage",
      "1,000+ edited images",
      "Online gallery",
      "Premium album",
      "Two shooters",
      "Engagement session",
      "Rush delivery",
    ],
  },
]

export default function PhotographyTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO: luxury-hero */}
      <section className="relative min-h-screen flex items-end pb-20 px-8 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542038310-1c4ec4ac5eb9?auto=format&fit=crop&w=1920&q=80"
          alt="Photography hero"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto animate-fade-in">
          <Badge className="mb-6 px-3 py-1 text-xs uppercase tracking-widest rounded-full border border-primary-foreground/60 text-primary-foreground bg-transparent [animation-delay:100ms]">
            New York · Available Worldwide
          </Badge>
          <h1 className="text-6xl md:text-8xl font-light text-primary-foreground leading-tight mb-6 max-w-3xl animate-fade-up [animation-delay:100ms]">
            Stories told
            <br />
            <em className="text-primary-foreground/70">through light.</em>
          </h1>
          <p className="text-primary-foreground/70 text-lg mb-10 max-w-md animate-fade-up [animation-delay:200ms]">
            Elena Vasquez Photography — portrait &amp; wedding photographer capturing authentic moments with cinematic
            beauty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up [animation-delay:300ms]">
            <Button
              size="lg"
              className="px-8 rounded-none font-medium tracking-wide bg-background text-foreground hover:scale-105 transition-all duration-300 hover:shadow-lg"
            >
              View Portfolio
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 rounded-none font-medium tracking-wide border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 transition-all duration-300"
            >
              Book a Session
            </Button>
          </div>
        </div>
      </section>

      {/* GALLERY: gallery-lightbox */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-light mb-3 text-foreground">Portfolio</h2>
          <p className="text-muted-foreground text-sm uppercase tracking-widest">A selection of recent work</p>
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`relative overflow-hidden bg-muted cursor-pointer group break-inside-avoid hover:scale-105 transition-all duration-300 ${item.aspect === "portrait" ? "aspect-[2/3]" : "aspect-video"}`}
            >
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <span className="text-4xl opacity-30 text-muted-foreground">◈</span>
              </div>
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-300 flex items-center justify-center">
                <span className="text-background text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity px-4 text-center">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="bg-border" />

      {/* SERVICES: agency-services */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-light mb-3 text-foreground">Services</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
            Each session is thoughtfully crafted to reflect your unique story.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-background p-8 hover:bg-muted transition-colors hover:scale-105 duration-300"
            >
              <h3 className="text-lg font-semibold mb-2 text-foreground">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS: testimonial-cards */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-light text-center mb-16 text-foreground">Client Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="text-center hover:scale-105 transition-all duration-300">
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="w-8 h-px bg-border mx-auto mb-4" />
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING: pricing-packages */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-light mb-3 text-foreground">Investment</h2>
          <p className="text-muted-foreground text-sm">Tailored packages for every milestone.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              className={`rounded-none hover:shadow-lg hover:scale-105 transition-all duration-300 ${pkg.highlighted ? "border-foreground border-2 bg-card" : "border-border bg-card"}`}
            >
              <CardHeader className="pb-4 border-b border-border">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{pkg.duration}</p>
                <CardTitle className="text-xl font-light mb-1 text-card-foreground">{pkg.name}</CardTitle>
                <span className="text-3xl font-semibold text-foreground">{pkg.price}</span>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-muted-foreground">—</span> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full rounded-none font-medium hover:scale-105 transition-all duration-300 hover:shadow-lg ${pkg.highlighted ? "bg-primary text-primary-foreground" : "bg-transparent border border-foreground text-foreground hover:bg-muted"}`}
                >
                  Inquire
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* BOOKING: booking-cta */}
      <section className="py-24 px-6 bg-primary">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-5xl font-light text-primary-foreground mb-5">
            Let&apos;s create something
            <br />
            <em>beautiful</em> together.
          </h2>
          <p className="text-primary-foreground/70 mb-10 text-base">
            Limited sessions available each month. Reach out early to secure your date.
          </p>
          <Button
            size="lg"
            className="px-10 rounded-none font-medium tracking-wide bg-background text-foreground hover:scale-105 transition-all duration-300 hover:shadow-lg"
          >
            Book Your Session
          </Button>
        </div>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="border-t border-border py-10 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xl font-light text-foreground">Elena Vasquez Photography</span>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Portfolio
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
          <p className="text-muted-foreground text-xs">© 2026 Elena Vasquez. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
