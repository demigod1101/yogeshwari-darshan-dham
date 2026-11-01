import { Link } from "@tanstack/react-router";
import { Home, Flame, Bus, Phone, Landmark, ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import deity from "@/assets/t-ygd.jpg.asset.json";
import { brand, nav as navCopy } from "@/content/messages";

const nav = [
  { to: "/", label: navCopy.home, icon: Home },
  { to: "/darshan", label: navCopy.darshan, icon: Flame },
  { to: "/pilgrimage", label: navCopy.pilgrimage, icon: Bus },
  { to: "/connect", label: navCopy.connect, icon: Phone },
  { to: "/heritage", label: navCopy.heritage, icon: Landmark },
] as const;

export function SiteHeader() {
  return (
    <header className="top-0 z-50 bg-background md:sticky">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-3" aria-label={brand.homeAria}>
          <img src={deity.url} alt={brand.deityAlt} className="h-12 w-12 rounded-full border border-border object-cover" />
          <span className="leading-tight">
            <span className="block font-display text-xl font-semibold text-primary">{brand.name}</span>
            <span className="mt-1 block text-sm text-muted-foreground">{brand.place}</span>
          </span>
        </Link>
        <Button asChild className="hidden bg-accent text-accent-foreground hover:bg-accent/90 sm:inline-flex"><Link to="/connect">{navCopy.pujaCta} <ArrowUpRight /></Link></Button>
      </div>
      <div className="radiant-navigation border-y border-border">
        <nav className="mx-auto grid max-w-6xl grid-cols-3 gap-1.5 px-3 py-2 md:flex md:gap-2 md:px-6" aria-label={navCopy.menuAria}>
          {nav.map((n) => <Button key={n.to} asChild variant="ghost" className="min-h-16 flex-col gap-1 whitespace-normal px-1 py-2 text-sm leading-snug text-navigation-foreground hover:bg-background/50 md:min-h-12 md:flex-row md:gap-2 md:px-3"><Link to={n.to} activeProps={{ className: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" }} activeOptions={{ exact: true }}><n.icon />{n.label}</Link></Button>)}
          <span className="ml-auto hidden items-center gap-1 text-sm text-navigation-foreground lg:flex"><MapPin className="size-4" /> {brand.placeShort}</span>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div><p className="font-display text-2xl text-primary">{brand.blessing}</p><p className="mt-3 max-w-sm whitespace-pre-line text-base text-muted-foreground">{brand.address}</p></div>
        <div className="text-base"><p className="mb-3 font-semibold text-primary">{navCopy.templeSection}</p>{nav.map((n) => <Link key={n.to} to={n.to} className="flex min-h-12 items-center py-2 text-muted-foreground hover:text-accent">{n.label}</Link>)}</div>
        <div className="text-sm"><p className="mb-3 font-semibold text-primary">{navCopy.officeSection}</p><p className="text-muted-foreground">{brand.officeOpen}</p><Link to="/connect" className="mt-3 inline-flex items-center gap-2 text-accent">{navCopy.stayConnected} <ArrowUpRight className="size-4" /></Link></div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">{brand.footerNote}</div>
    </footer>
  );
}
