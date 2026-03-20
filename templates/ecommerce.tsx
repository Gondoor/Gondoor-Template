"use client";


import { Accordion,AccordionContent,AccordionItem,AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: ecommerce
// sections: luxury-hero, ecom-categories, ecom-cart-cta, review-stars, subscribe-cta, faq-accordion, footer-minimal
// theme: globals.css CSS variables
// hero-image: https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1920&q=80
// ─────────────────────────────────────────────────────────────────────

const categories = [
  { name: "Ready-to-Wear", count: "84 pieces" },
  { name: "Accessories", count: "56 pieces" },
  { name: "Footwear", count: "42 pieces" },
  { name: "Outerwear", count: "28 pieces" },
  { name: "Jewellery", count: "63 pieces" },
  { name: "Handbags", count: "35 pieces" },
];

const products = [
  { name: "Silk Wrap Dress", price: "$385", badge: "New Season" },
  { name: "Cashmere Overcoat", price: "$890", badge: "Bestseller" },
  { name: "Leather Tote", price: "$520", badge: "" },
  { name: "Merino Knit Set", price: "$295", badge: "New Season" },
  { name: "Gold Pendant Necklace", price: "$175", badge: "" },
  { name: "Suede Chelsea Boots", price: "$445", badge: "Bestseller" },
];

const reviews = [
  { name: "Victoria M.", text: "The silk dress is exquisite. The fabric drapes beautifully and the finish is impeccable. Worth every penny.", stars: 5 },
  { name: "Isabelle C.", text: "My cashmere coat arrived in the most elegant packaging. The quality exceeds any other brand at this price point.", stars: 5 },
  { name: "Natasha W.", text: "I've been shopping here for three seasons. The curation is always spot-on and the service is wonderful.", stars: 5 },
];

const faqs = [
  { q: "What is your returns policy?", a: "We offer free returns within 30 days of delivery. Items must be unworn with original tags attached." },
  { q: "Do you ship internationally?", a: "Yes — we ship to 45+ countries with DHL Express. International orders typically arrive within 3–5 business days." },
  { q: "How do I find my size?", a: "Each product page includes a detailed size guide with measurements in both EU and UK/US sizing." },
  { q: "Is your packaging sustainable?", a: "All packaging is recyclable or FSC-certified. We removed single-use plastic from our supply chain in 2024." },
];

export default function EcommerceTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: luxury-hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24">
          <Badge className="mb-4 animate-fade-in bg-primary text-primary-foreground">New Spring Collection</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-background mb-6 animate-fade-up [animation-delay:100ms]">
            Curated for<br />the discerning.
          </h1>
          <p className="text-xl text-background/80 mb-8 max-w-2xl animate-fade-up [animation-delay:200ms]">
            Premium fashion, ethically sourced and thoughtfully designed. Every piece is chosen for longevity, not trend.
          </p>
          <div className="flex gap-4 animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground hover:scale-105 transition-all duration-300">
              Shop collection
            </Button>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background hover:text-foreground transition-all duration-300">
              Our story
            </Button>
          </div>
        </div>
      </section>

      {/* CATEGORIES: ecom-categories */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 animate-fade-up">Shop by category</h2>
          <p className="text-muted-foreground text-lg">Explore our curated collections.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              className="bg-muted border border-border rounded-2xl p-8 text-center cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <h3 className="font-semibold text-lg mb-1">{cat.name}</h3>
              <p className="text-muted-foreground text-sm">{cat.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS: ecom-cart-cta */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-up">Featured this season</h2>
            <p className="text-muted-foreground text-lg">Handpicked favourites from our editors.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <Card
                key={product.name}
                className="bg-card text-card-foreground border-border rounded-2xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="aspect-[4/3] bg-secondary flex items-center justify-center relative">
                  <span className="text-4xl text-muted-foreground">◻</span>
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs">{product.badge}</Badge>
                  )}
                </div>
                <CardContent className="pt-4 pb-5">
                  <h3 className="font-semibold text-base mb-1">{product.name}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-lg text-primary">{product.price}</span>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:scale-105 transition-all duration-300">
                      Add to bag
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS: review-stars */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-1 mb-4">
            {Array(5).fill(0).map((_, i) => <span key={i} className="text-2xl text-primary">★</span>)}
          </div>
          <p className="text-5xl font-bold mb-2">4.8 / 5</p>
          <p className="text-muted-foreground mb-12">Based on 3,200+ verified reviews</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {reviews.map((r, i) => (
            <Card
              key={r.name}
              className="bg-card text-card-foreground border-border rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="pt-6">
                <div className="flex gap-0.5 mb-3">
                  {Array(r.stars).fill(0).map((_, j) => <span key={j} className="text-primary text-sm">★</span>)}
                </div>
                <p className="text-sm leading-relaxed mb-4 italic">&quot;{r.text}&quot;</p>
                <p className="text-xs font-semibold text-muted-foreground">{r.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SUBSCRIBE CTA: subscribe-cta */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4 animate-fade-up">Be the first to know</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-md mx-auto">
            New arrivals, exclusive offers, and early access — straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto animate-fade-up [animation-delay:100ms]">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-background border-background text-foreground placeholder:text-muted-foreground rounded-xl"
            />
            <Button className="bg-background text-foreground hover:bg-background/90 hover:scale-105 transition-all duration-300 px-6 shrink-0">
              Subscribe
            </Button>
          </div>
          <p className="text-primary-foreground/60 text-xs mt-4">No spam. Unsubscribe at any time.</p>
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
          <span className="font-bold text-lg text-primary">Maison Vela</span>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-all duration-300">Shipping</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Returns</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Sustainability</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Contact</a>
          </div>
          <p className="text-muted-foreground text-xs">© 2026 Maison Vela. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
