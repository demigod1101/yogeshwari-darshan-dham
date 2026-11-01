import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Plane, TrainFront, Car, CalendarDays, Clock3, MapPin, BedDouble, Flame, Bus, Phone } from "lucide-react";
import air from "@/assets/by-air.jpg";
import train from "@/assets/by-train.jpg";
import road from "@/assets/by-road.jpg";
import deity from "@/assets/t-ygd.jpg.asset.json";
import temple from "@/assets/t-DSCN3429.jpg.asset.json";
import { TempleShowcase } from "@/components/TempleShowcase";
import { Button } from "@/components/ui/button";
import { SectionHeading, Lotus } from "@/components/Section";
import { pageHead } from "@/lib/seo";
import { brand, home, nav } from "@/content/messages";

export const Route = createFileRoute("/")({
  head: () => pageHead(home.meta),
  component: Index,
});

const travelImages = { air, train, road } as const;
const travelIcons = { air: Plane, train: TrainFront, road: Car } as const;
const festivalImages = [deity.url, deity.url, temple.url] as const;

const shortcuts = [
  { to: "/darshan" as const, label: nav.darshan, icon: Flame, hash: "" },
  { to: "/pilgrimage" as const, label: nav.pilgrimage, icon: Bus, hash: "" },
  { to: "/pilgrimage" as const, label: nav.accommodation, icon: BedDouble, hash: "accommodation" },
  { to: "/connect" as const, label: nav.connect, icon: Phone, hash: "" },
];

const factIcons = [Clock3, CalendarDays, MapPin] as const;

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-maroon-deep">
        <img src={temple.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 py-14 md:grid-cols-[1.4fr_1fr] md:px-6 md:py-20">
          <div className="text-primary-foreground">
            <p className="font-display text-xl italic text-gold">{home.hero.blessing}</p>
            <h1 className="mt-3 text-4xl leading-tight md:text-6xl">{home.hero.title}</h1>
            <div className="mt-5 max-w-lg border-l-2 border-gold pl-4"><p className="text-lg opacity-90">{home.hero.intro}</p></div>
            <div className="mt-7 flex flex-wrap gap-3"><Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/darshan">{home.hero.ctaDarshan} <ArrowUpRight /></Link></Button><Button asChild size="lg" variant="outline" className="border-gold bg-transparent text-primary-foreground hover:bg-gold hover:text-foreground"><Link to="/pilgrimage">{home.hero.ctaTravel}</Link></Button></div>
          </div>
          <img src={deity.url} alt={brand.deityAlt} className="mx-auto hidden w-full max-w-sm rounded-2xl border-4 border-gold object-contain shadow-warm md:block" />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-12 md:px-6">
        <SectionHeading title={home.showcase.title} kicker={home.showcase.kicker} watermark={home.showcase.watermark} />
        <nav aria-label={home.showcase.shortcutsAria} className="mb-7 grid grid-cols-2 gap-3 md:grid-cols-4">
          {shortcuts.map((item) => <Button key={item.label} asChild variant="outline" className="min-h-20 flex-col gap-2 whitespace-normal border-border bg-card px-2 text-base shadow-none hover:border-accent hover:bg-secondary hover:text-primary md:flex-row"><Link to={item.to} hash={item.hash}><item.icon className="text-accent" />{item.label}</Link></Button>)}
        </nav>
        <TempleShowcase />
      </section>

      <section className="border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 py-5 sm:grid-cols-3">
          {home.facts.map((item, i) => {
            const Icon = factIcons[i];
            return <div key={item.label} className="flex items-center gap-3"><Icon className="size-5 shrink-0 text-accent" /><div><p className="text-xs text-muted-foreground">{item.label}</p><p className="font-medium text-primary">{item.value}</p></div></div>;
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-7 px-6 py-10 lg:grid-cols-[1.6fr_1fr_0.9fr]">
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><h2 className="text-2xl font-semibold">{home.motherDarshan.title}</h2><Button asChild variant="link" className="px-0 text-accent"><Link to="/darshan">{home.motherDarshan.link} <ArrowUpRight /></Link></Button></div>
          <Link to="/darshan" className="group block overflow-hidden rounded-md"><img src={deity.url} alt={home.motherDarshan.imageAlt} loading="lazy" className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" /></Link>
          <p className="mt-3 text-sm text-muted-foreground">{home.motherDarshan.caption}</p>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold">{home.festivals.title}</h2>
          {home.festivals.items.map((item, i) => <Link key={item.title} to={item.to} className="group flex gap-3 border-b border-border py-3 first:pt-0"><img src={festivalImages[i]} alt="" loading="lazy" className="h-16 w-16 shrink-0 rounded-sm object-cover" /><div><h3 className="font-sans text-base font-semibold group-hover:text-accent">{item.title}</h3><p className="mt-1 text-xs text-muted-foreground">{item.text}</p></div></Link>)}
          <Button asChild variant="link" className="mt-3 p-0 text-accent"><Link to="/connect">{home.festivals.datesLink} <ArrowUpRight /></Link></Button>
        </div>
        <aside className="space-y-4 lg:pt-1">
          <div className="border-l-2 border-accent bg-secondary p-5"><Clock3 className="mb-2 size-5 text-accent" /><h2 className="text-xl font-semibold">{home.side.aartiTitle}</h2><p className="mt-2 text-sm text-muted-foreground">{home.side.aartiText}</p><Button asChild className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/darshan">{home.side.aartiCta} <ArrowUpRight /></Link></Button></div>
          <div className="border-l-2 border-gold bg-secondary p-5"><h2 className="text-xl font-semibold">{home.side.pujaTitle}</h2><p className="mt-2 text-sm text-muted-foreground">{home.side.pujaText}</p><Button asChild variant="outline" className="mt-4"><Link to="/connect">{home.side.pujaCta} <ArrowUpRight /></Link></Button></div>
        </aside>
      </section>

      <section className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <SectionHeading title={home.travel.title} kicker={home.travel.kicker} watermark={home.travel.watermark} />
          <div className="grid gap-6 sm:grid-cols-3">{home.travel.modes.map((m) => {
            const Icon = travelIcons[m.key];
            return <Link key={m.title} to="/pilgrimage" className="group overflow-hidden rounded-xl border border-border bg-card shadow-warm"><img src={travelImages[m.key]} alt={m.title} loading="lazy" className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105" /><div className="flex items-center gap-3 px-4 py-3"><Icon className="size-5 text-accent" /><h3 className="font-sans text-lg font-semibold">{m.title}</h3><ArrowUpRight className="ml-auto size-4 text-muted-foreground" /></div></Link>;
          })}</div>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 py-12 text-center"><Lotus className="mx-auto mb-3" /><p className="font-display text-xl leading-loose whitespace-pre-line text-primary md:text-2xl">{home.shloka}</p></section>
    </>
  );
}
