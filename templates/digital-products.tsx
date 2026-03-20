"use client";


import { Accordion,AccordionContent,AccordionItem,AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: digital-products
// sections: saas-hero, ecom-cart-cta, testimonial-cards, pricing-tiers, faq-accordion, footer-minimal
// theme: globals.css CSS variables
// hero-image: https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1920&q=80
// ─────────────────────────────────────────────────────────────────────

const products = [
  { name: "Framer Website Bundle", category: "Website Templates", price: "$79", badge: "Bestseller", sales: "2.4K sales" },
  { name: "Lightroom Cinematic Presets", category: "Photo Presets", price: "$39", badge: "Top Rated", sales: "5.1K sales" },
  { name: "Figma Design System Pro", category: "UI Kits", price: "$129", badge: "New Release", sales: "890 sales" },
  { name: "Social Media Starter Pack", category: "Canva Templates", price: "$29", badge: "", sales: "3.2K sales" },
  { name: "Brand Identity Toolkit", category: "Branding Assets", price: "$59", badge: "Bestseller", sales: "1.7K sales" },
  { name: "Motion Graphics Pack", category: "Video Assets", price: "$49", badge: "", sales: "1.1K sales" },
];

const testimonials = [
  { name: "Jordan Rivera", role: "Freelance Designer", quote: "The Figma design system saved me 20+ hours on my last client project. Incredibly well-organised and documented." },
  { name: "Priya Kapoor", role: "Content Creator", quote: "The Lightroom presets are exactly the aesthetic I was going for. My Instagram engagement jumped 60% after switching." },
  { name: "Alex Chen", role: "Web Developer", quote: "The Framer bundle is exceptional. Clean code, responsive, and every section is fully customisable." },
];

const tiers = [
  { name: "Starter", price: "$49", per: "/yr", features: ["Access to 20+ free assets", "5 premium downloads/yr", "Community access", "Basic licence"], highlighted: false },
  { name: "Creator Pro", price: "$99", per: "/yr", features: ["Unlimited downloads", "All asset categories", "Commercial licence", "Priority support", "Early access to new releases"], highlighted: true },
  { name: "Agency", price: "$249", per: "/yr", features: ["Unlimited downloads", "Extended licence for client work", "Team seat (up to 5)", "White-label rights", "Dedicated support"], highlighted: false },
];

const faqs = [
  { q: "What licence do I get with my purchase?", a: "All products include a standard commercial licence. Extended and white-label licences are available on Creator Pro and Agency plans." },
  { q: "Can I use these assets for client work?", a: "Yes — Creator Pro and above include a commercial licence covering use in client projects." },
  { q: "Do assets get updated?", a: "Yes — all purchases include lifetime updates. When we release a new version you get it automatically." },
  { q: "What formats are included?", a: "Assets come in all relevant formats — Figma, Framer, Canva, Lightroom XMP, Adobe Premiere, and more depending on the product." },
];

export default function DigitalProductsTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: saas-hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24">
          <Badge className="mb-4 animate-fade-in bg-primary text-primary-foreground">500+ premium assets for creators</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-background mb-6 animate-fade-up [animation-delay:100ms]">
            Premium digital<br />assets for creators.
          </h1>
          <p className="text-xl text-background/80 mb-8 max-w-2xl animate-fade-up [animation-delay:200ms]">
            Templates, presets, UI kits, and design systems crafted by professionals. Ship better work, faster — starting today.
          </p>
          <div className="flex gap-4 animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground hover:scale-105 transition-all duration-300">
              Browse all assets
            </Button>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background hover:text-foreground transition-all duration-300">
              View pricing
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS: ecom-cart-cta */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 animate-fade-up">Featured products</h2>
          <p className="text-muted-foreground text-lg">Our most popular assets across every category.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <Card
              key={product.name}
              className="bg-card text-card-foreground border-border rounded-2xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="aspect-[4/3] bg-muted flex items-center justify-center relative">
                <span className="text-4xl text-muted-foreground">◻</span>
                {product.badge && (
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs">{product.badge}</Badge>
                )}
              </div>
              <CardContent className="pt-4 pb-5">
                <p className="text-xs text-primary font-semibold mb-1 uppercase tracking-wide">{product.category}</p>
                <h3 className="font-semibold text-base mb-1">{product.name}</h3>
                <p className="text-muted-foreground text-xs mb-3">{product.sales}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-primary">{product.price}</span>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:scale-105 transition-all duration-300">
                    Buy now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS: testimonial-cards */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 animate-fade-up">Trusted by 50,000+ creators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card
                key={t.name}
                className="bg-card text-card-foreground border-border rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="flex gap-0.5 mb-4">
                    {Array(5).fill(0).map((_, j) => <span key={j} className="text-primary text-sm">★</span>)}
                  </div>
                  <p className="text-sm leading-relaxed mb-6">&quot;{t.quote}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING: pricing-tiers */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 animate-fade-up">Unlimited access. One flat price.</h2>
          <p className="text-muted-foreground">Buy individual assets or unlock everything with a plan.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <Card
              key={tier.name}
              className={`rounded-2xl border-border hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up ${tier.highlighted ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold mb-2">{tier.name}</CardTitle>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className={`mb-1 ${tier.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{tier.per}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm">
                      <span>✓</span> {feat}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full rounded-xl hover:scale-105 transition-all duration-300 ${tier.highlighted ? "bg-background text-foreground hover:bg-background/90" : "bg-primary text-primary-foreground"}`}
                >
                  Get started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ: faq-accordion */}
      <section className="container mx-auto px-6 py-16 max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">Frequently asked questions</h2>
        <Accordion multiple={false} className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-sm font-medium text-left hover:no-underline py-4">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm pb-4">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="border-t border-border py-10 px-6 bg-muted">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-lg text-primary">Craftly</span>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-all duration-300">Browse</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Licences</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Sell with us</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Support</a>
          </div>
          <p className="text-muted-foreground text-xs">© 2026 Craftly. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
