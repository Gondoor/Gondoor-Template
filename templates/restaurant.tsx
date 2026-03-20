"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs,TabsContent,TabsList,TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: restaurant
// sections: restaurant-hero, restaurant-menu, gallery-lightbox, review-stars, reservation-cta, map-location, footer-local
// theme: globals.css CSS variables
// hero-image: https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80
// ─────────────────────────────────────────────────────────────────────

const menu = {
  Starters: [
    { name: "Charred Leek Velouté", desc: "Crispy pancetta, herb oil, toasted rye crumb", price: "$18" },
    { name: "Seared Scallops", desc: "Pea purée, smoked bacon, lemon beurre blanc", price: "$26" },
    { name: "Beef Tartare", desc: "Capers, cornichon, quail egg, sourdough toast", price: "$24" },
    { name: "Whipped Burrata", desc: "Heirloom tomatoes, basil oil, aged balsamic", price: "$21" },
  ],
  Mains: [
    { name: "Oak-Smoked Beef Tenderloin", desc: "Roasted bone marrow, wild mushroom, truffle jus", price: "$58" },
    { name: "Whole Roasted Duck", desc: "Cherry gastrique, confit leg, celeriac purée", price: "$52" },
    { name: "Pan-Seared Halibut", desc: "Saffron cream, fennel, samphire, brown butter", price: "$46" },
    { name: "Wild Mushroom Risotto", desc: "Porcini, parmesan foam, black truffle, chive oil", price: "$38" },
  ],
  Desserts: [
    { name: "Dark Chocolate Delice", desc: "Hazelnut praline, salted caramel, cocoa tuile", price: "$16" },
    { name: "Vanilla Bean Crème Brûlée", desc: "Seasonal berries, tuile biscuit", price: "$14" },
    { name: "Cheese Selection", desc: "Three artisan cheeses, quince jelly, crackers", price: "$22" },
  ],
  Wine: [
    { name: "Château Margaux 2018", desc: "Bordeaux, France — Full-bodied, complex tannins", price: "$180" },
    { name: "Domaine Leflaive Puligny-Montrachet", desc: "Burgundy, France — Elegant white, mineral finish", price: "$145" },
    { name: "Barolo DOCG 2017", desc: "Piedmont, Italy — Rich, structured, aged 36 months", price: "$120" },
  ],
};

const galleryItems = [
  { label: "The Dining Room" },
  { label: "Open Kitchen" },
  { label: "Private Cellar" },
  { label: "Terrace Garden" },
  { label: "Chef's Table" },
  { label: "Bar & Lounge" },
  { label: "Wine Cellar" },
  { label: "Private Dining" },
];

const reviews = [
  { name: "Margaret F.", text: "An unforgettable evening. The oak-smoked tenderloin was the finest piece of beef I have ever tasted. The service matched the food — impeccable.", stars: 5 },
  { name: "Thomas K.", text: "We celebrated our anniversary here and every detail was perfect. Chef Moreau came to our table personally. Extraordinary experience from start to finish.", stars: 5 },
  { name: "Claudette R.", text: "The sommelier's wine pairings were inspired. We tried three bottles we'd never heard of and each was superb. Cannot wait to return.", stars: 5 },
];

export default function RestaurantTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: restaurant-hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24">
          <Badge className="mb-4 animate-fade-in bg-primary text-primary-foreground">Open Wed–Sun · 6pm–11pm</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-background mb-6 animate-fade-up [animation-delay:100ms]">
            Ember &amp; Oak —<br />Where every meal<br />tells a story.
          </h1>
          <p className="text-xl text-background/80 mb-8 max-w-2xl animate-fade-up [animation-delay:200ms]">
            Executive Chef Daniel Moreau presents a modern European tasting menu inspired by seasonal ingredients from our partner farms and the finest artisan producers.
          </p>
          <div className="flex gap-4 animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground hover:scale-105 transition-all duration-300">
              Make a reservation
            </Button>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background hover:text-foreground transition-all duration-300">
              View full menu
            </Button>
          </div>
        </div>
      </section>

      {/* MENU: restaurant-menu */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3 animate-fade-up">Our menu</h2>
          <p className="text-muted-foreground">Seasonally curated. Changed monthly. Always memorable.</p>
        </div>
        <Tabs defaultValue="Starters" className="w-full">
          <TabsList className="grid grid-cols-4 max-w-xl mx-auto mb-10 rounded-xl p-1 bg-muted">
            {Object.keys(menu).map((tab) => (
              <TabsTrigger key={tab} value={tab} className="rounded-lg text-sm transition-colors">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(menu).map(([tab, items]) => (
            <TabsContent key={tab} value={tab}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                {items.map((item, i) => (
                  <Card
                    key={item.name}
                    className="bg-card text-card-foreground border-border rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <CardContent className="p-5 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base mb-1">{item.name}</h3>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                      <span className="text-lg font-bold shrink-0 mt-0.5 text-primary">{item.price}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* GALLERY: gallery-lightbox */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3 animate-fade-up">The Ember &amp; Oak experience</h2>
            <p className="text-muted-foreground">Step inside our world.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryItems.map((item, i) => (
              <div
                key={item.label}
                className="group relative aspect-square bg-card border border-border rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="text-muted-foreground text-4xl mb-3">◻</span>
                <span className="text-sm font-semibold text-foreground px-2 text-center">{item.label}</span>
                <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <span className="text-background text-sm font-semibold">View photo</span>
                </div>
              </div>
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
          <p className="text-5xl font-bold mb-2">4.9 / 5</p>
          <p className="text-muted-foreground mb-4">on Google Reviews · 1,200+ reviews</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground mb-12">
            <span>Google 4.9</span>
            <span>·</span>
            <span>OpenTable 4.8</span>
            <span>·</span>
            <span>TripAdvisor #1 Fine Dining</span>
          </div>
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

      {/* RESERVATION: reservation-cta */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-6">
          <div className="bg-card border border-border rounded-3xl p-12 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-4 animate-fade-up">Reserve your table</h2>
                <p className="text-muted-foreground mb-6">We recommend booking at least 2 weeks in advance. Private dining available for groups of 8+.</p>
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input type="text" placeholder="First name" className="rounded-xl bg-background border-border" />
                    <Input type="text" placeholder="Last name" className="rounded-xl bg-background border-border" />
                  </div>
                  <Input type="email" placeholder="Email address" className="rounded-xl bg-background border-border" />
                  <div className="grid grid-cols-3 gap-3">
                    <Input type="date" className="rounded-xl bg-background border-border col-span-2" />
                    <Input type="number" placeholder="Guests" min={1} max={20} className="rounded-xl bg-background border-border" />
                  </div>
                  <Button className="rounded-xl py-3 bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 mt-2">
                    Request reservation
                  </Button>
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <p className="font-semibold mb-1 text-primary">Opening hours</p>
                  <p className="text-sm text-muted-foreground">Wednesday – Sunday: 6:00pm – 11:00pm</p>
                  <p className="text-sm text-muted-foreground">Monday &amp; Tuesday: Closed</p>
                </div>
                <Separator className="bg-border" />
                <div>
                  <p className="font-semibold mb-1 text-primary">Dress code</p>
                  <p className="text-sm text-muted-foreground">Smart casual. We kindly ask guests to avoid sportswear.</p>
                </div>
                <Separator className="bg-border" />
                <div>
                  <p className="font-semibold mb-1 text-primary">Private dining</p>
                  <p className="text-sm text-muted-foreground">Our cellar room seats up to 16 guests. Contact us for bespoke menus and events.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP: map-location */}
      <section className="container mx-auto px-6 py-16 pb-20">
        <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col md:flex-row">
          <div className="flex-1 aspect-video md:aspect-auto md:min-h-64 bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-lg font-medium">Map placeholder</span>
          </div>
          <div className="p-8 md:w-80 flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4">Find us</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>14 Cobblestone Lane<br />Soho, New York, NY 10013</p>
              <p>+1 (212) 555 0148</p>
              <p>hello@emberandoak.com</p>
            </div>
            <Button className="mt-6 rounded-xl bg-primary text-primary-foreground hover:scale-105 transition-all duration-300">
              Get directions
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER: footer-local */}
      <footer className="border-t border-border py-10 px-6 bg-muted">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-bold text-base text-primary">Ember &amp; Oak</p>
            <p className="text-xs text-muted-foreground">14 Cobblestone Lane, Soho, New York</p>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-all duration-300">Instagram</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">OpenTable</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Gift Cards</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Press</a>
          </div>
          <p className="text-muted-foreground text-xs">© 2026 Ember &amp; Oak. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
