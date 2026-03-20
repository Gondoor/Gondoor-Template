"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: pet-services
// sections: local-hero, local-services, gallery-lightbox, team-grid, review-stars, pricing-packages, booking-cta, footer-local
// ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { name: "Dog Grooming", desc: "Bath, brush, trim, and nail clipping tailored to your breed.", icon: "🐶" },
  { name: "Cat Grooming", desc: "Gentle grooming sessions for even the most particular felines.", icon: "🐱" },
  { name: "Daycare", desc: "Supervised play and socialization in a safe, fun environment.", icon: "🏡" },
  { name: "Boarding", desc: "Overnight stays with cozy beds, walks, and lots of love.", icon: "🌙" },
  { name: "Training", desc: "Positive-reinforcement obedience and behavior training.", icon: "🎓" },
  { name: "Puppy Classes", desc: "Foundation skills and socialization for pups under 6 months.", icon: "🐾" },
];

const GALLERY = [
  "Golden retriever after a fresh groom",
  "Two puppies playing in daycare yard",
  "Persian cat spa session",
  "Dog agility training class",
  "Cozy boarding suite with plush bedding",
  "Husky getting a blueberry facial",
  "Puppy class graduation ceremony",
  "Border collie mid-bath with bubbles",
];

const TEAM = [
  { name: "Mia Torres", role: "Lead Dog Groomer · 8 yrs exp", emoji: "👩" },
  { name: "Sam Park", role: "Cat Specialist · Fear-Free Certified", emoji: "🧑" },
  { name: "Jade Riley", role: "Head Trainer · CPDT-KA", emoji: "👩" },
  { name: "Leo Nguyen", role: "Boarding Manager · Vet Tech", emoji: "👨" },
];

const PACKAGES = [
  { name: "Basic Bath", price: "$35", features: ["Bath & blow dry", "Brush out", "Nail trim", "Ear clean"] },
  { name: "Full Groom", price: "$65", features: ["Everything in Basic", "Breed-specific cut", "Teeth brushing", "Bow or bandana"], popular: true },
  { name: "Spa Day", price: "$95", features: ["Everything in Full", "Blueberry facial", "Paw moisturizing", "Aromatherapy rinse"] },
];

const REVIEWS = [
  { name: "Anika F.", text: "My golden retriever looks like a show dog after every visit. Mia is absolutely incredible.", stars: 5 },
  { name: "Daniel H.", text: "My anxious rescue dog actually wags her tail when we pull into the parking lot now.", stars: 5 },
  { name: "Chloe B.", text: "Boarding here is the only way I can travel without worrying about my pup.", stars: 5 },
  { name: "Marcus T.", text: "Jade's puppy classes transformed our little chaos machine into a well-mannered dog.", stars: 5 },
];

export default function PetServicesTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: local-hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1920&q=80"
          alt="Pet services hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24 text-center">
          <Badge className="mb-4 text-sm font-semibold bg-primary text-primary-foreground animate-fade-in">
            4.9★ · 900+ Happy Pet Parents
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-background animate-fade-up [animation-delay:100ms]">
            Happy Paws Pet Spa —{" "}
            <span className="text-accent">Your pet deserves the best.</span>
          </h1>
          <p className="text-xl text-background/80 max-w-2xl mx-auto mb-8 animate-fade-up [animation-delay:200ms]">
            Your neighborhood&apos;s go-to for grooming, boarding, daycare, and training. We treat every pet like our own.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground font-semibold px-8 hover:opacity-90 transition-all duration-300">
              Book an Appointment
            </Button>
            <Button size="lg" variant="outline" className="font-semibold px-8 border-border text-background hover:opacity-90 transition-all duration-300">
              View Services &amp; Pricing
            </Button>
          </div>
          <p className="mt-4 text-sm text-background/60 animate-fade-up [animation-delay:300ms]">Walk-ins welcome · First groom 10% off</p>
        </div>
      </section>

      <Separator />

      {/* LOCAL SERVICES: local-services */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Our Services</h2>
          <p className="text-center text-muted-foreground mb-12">Everything your furry family member needs, under one roof.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <Card key={s.name} className="border border-border bg-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardHeader>
                  <span className="text-3xl mb-2">{s.icon}</span>
                  <CardTitle className="text-lg text-card-foreground">{s.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY LIGHTBOX: gallery-lightbox */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">A Peek Inside Happy Paws</h2>
          <p className="text-center text-muted-foreground mb-10">Every visit, captured in a moment of pure joy.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {GALLERY.map((caption, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-accent border border-border flex items-end overflow-hidden cursor-pointer hover:opacity-90 transition-all duration-300 hover:scale-105 relative"
              >
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  {["🐶", "🐾", "🐱", "🐕", "🏡", "🛁", "🎓", "✨"][i]}
                </div>
                <p className="relative z-10 text-xs text-foreground bg-background/80 w-full px-2 py-1 truncate">{caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM GRID: team-grid */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Meet Our Team</h2>
          <p className="text-center text-muted-foreground mb-12">Certified, compassionate, and completely obsessed with animals.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <Card key={member.name} className="border border-border bg-card text-center hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardContent className="pt-8 pb-6">
                  <div className="text-6xl mb-4">{member.emoji}</div>
                  <h3 className="font-bold text-lg mb-1 text-card-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEW STARS: review-stars */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-5xl font-black text-primary">4.9★</span>
            <p className="text-muted-foreground mt-1 text-sm">from 900+ verified reviews on Google &amp; Yelp</p>
          </div>
          <h2 className="text-3xl font-bold text-center mb-10">Pet Parents Love Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {REVIEWS.map((r) => (
              <Card key={r.name} className="border border-border bg-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-3 text-lg text-primary">
                    {"★".repeat(r.stars)}
                  </div>
                  <p className="text-muted-foreground text-sm italic mb-4">&ldquo;{r.text}&rdquo;</p>
                  <p className="text-sm font-semibold text-card-foreground">{r.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PACKAGES: pricing-packages */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Grooming Packages</h2>
          <p className="text-center text-muted-foreground mb-12">Transparent pricing, no add-on surprises.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => (
              <Card key={pkg.name} className={`border-2 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ${pkg.popular ? "border-primary" : "border-border"}`}>
                <CardHeader>
                  {pkg.popular && (
                    <Badge className="mb-2 w-fit bg-primary text-primary-foreground text-xs">Most Popular</Badge>
                  )}
                  <CardTitle className="text-card-foreground">{pkg.name}</CardTitle>
                  <p className="text-4xl font-black mt-2 text-primary">{pkg.price}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-primary">✔</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all duration-300">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CTA: booking-cta */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-2xl mx-auto text-center text-primary-foreground">
          <h2 className="text-4xl font-bold mb-4">Ready to Pamper Your Pet?</h2>
          <p className="mb-8 text-primary-foreground/80">Book in under 60 seconds. Same-week appointments often available.</p>
          <div className="bg-background rounded-2xl p-6 text-left shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Pet Type</label>
                <select className="w-full border border-border rounded-lg px-3 py-2 text-foreground bg-background text-sm focus:outline-none">
                  <option>Dog</option>
                  <option>Cat</option>
                  <option>Small Animal</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Service</label>
                <select className="w-full border border-border rounded-lg px-3 py-2 text-foreground bg-background text-sm focus:outline-none">
                  <option>Full Groom</option>
                  <option>Basic Bath</option>
                  <option>Spa Day</option>
                  <option>Daycare</option>
                  <option>Boarding</option>
                </select>
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground font-semibold py-3 hover:opacity-90 transition-all duration-300">
              Confirm Booking
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER: footer-local */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="font-bold text-foreground">Happy Paws Pet Spa</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Services</a>
            <a href="#" className="hover:text-foreground transition-colors">Grooming</a>
            <a href="#" className="hover:text-foreground transition-colors">Boarding</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p>© 2026 Happy Paws Pet Spa. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
