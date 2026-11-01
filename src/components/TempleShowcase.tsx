import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import shikhar from "@/assets/t-DSCN3429.jpg.asset.json";
import deity from "@/assets/t-ygd.jpg.asset.json";
import gate from "@/assets/t-DSCN3469.jpg.asset.json";
import { templeShowcase } from "@/content/messages";

const images = {
  garbha: deity.url,
  temple: shikhar.url,
  gate: gate.url,
} as const;

const panels = templeShowcase.panels.map((panel) => ({
  ...panel,
  img: images[panel.key],
}));

export function TempleShowcase() {
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const selected = active === null ? undefined : panels[active];
  const details = selected && (
    <div className="relative border-l-2 border-accent bg-secondary px-5 py-5 animate-in fade-in slide-in-from-top-2 md:px-7">
      <Button variant="ghost" size="icon" aria-label={templeShowcase.closeAria} className="absolute right-2 top-2" onClick={() => setOpen(false)}><X /></Button>
      <div className="grid min-w-0 gap-4 pr-7 md:grid-cols-[1.3fr_1fr] md:gap-10">
        <div><p className="text-base text-accent">{selected.sub}</p><h2 className="mt-1 text-2xl font-semibold">{selected.title}</h2><p className="mt-2 text-base text-muted-foreground">{selected.text}</p></div>
        <div className="min-w-0"><ul className="space-y-2 text-base text-muted-foreground">{selected.points.map((pt) => <li key={pt} className="flex gap-2"><span className="text-accent">·</span>{pt}</li>)}</ul><Button asChild variant="outline" className="mt-4 h-auto max-w-full whitespace-normal text-accent"><Link to={selected.cta.to}>{selected.cta.label}<ArrowUpRight className="shrink-0" /></Link></Button></div>
      </div>
    </div>
  );
  return (
    <div>
      <div className="grid grid-cols-1 gap-5 md:flex md:h-[380px] md:gap-3">
        {panels.map((p, i) => {
          const on = i === active;
          return (
            <div key={p.title} className={`group min-w-0 md:relative md:basis-0 md:overflow-hidden md:rounded-md md:transition-[flex-grow] md:duration-500 md:ease-out ${on ? "md:grow-[2.4]" : "md:grow"}`}>
              <div className="overflow-hidden rounded-t-md bg-secondary md:rounded-none">
                <img src={p.img} alt={p.title} className="h-auto w-full object-contain md:absolute md:inset-0 md:h-full md:object-cover md:transition-transform md:duration-500 md:group-hover:scale-105" />
              </div>
              <div className="absolute inset-x-0 bottom-0 hidden h-24 bg-veil md:block" />
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-b-md border border-t-0 border-border bg-card px-4 py-3 md:absolute md:inset-x-0 md:bottom-5 md:flex md:justify-center md:border-0 md:bg-transparent md:px-3 md:py-0">
                <p className="min-w-0 text-base font-medium text-primary md:hidden">{p.title}</p>
                <Button onClick={() => { setActive(i); setOpen(!(on && open)); }} aria-label={`${p.title} — ${on && open ? templeShowcase.closeLabel : templeShowcase.openLabel}`} aria-expanded={on && open} aria-controls={`temple-details-mobile-${i} temple-details`} className="min-h-12 shrink-0 gap-2 bg-background px-3 text-base text-primary shadow-warm hover:bg-gold md:px-4">
                  <span className="hidden md:inline">{p.title} · </span>{on && open ? templeShowcase.closeLabel : templeShowcase.openLabel} <Plus className={`size-4 shrink-0 transition-transform ${on && open ? "rotate-45" : ""}`} />
                </Button>
              </div>
              {on && open && <div id={`temple-details-mobile-${i}`} className="mt-2 md:hidden">{details}</div>}
            </div>
          );
        })}
      </div>
      {open && selected && (
        <div id="temple-details" className="mt-3 hidden md:block">{details}</div>
      )}
    </div>
  );
}
