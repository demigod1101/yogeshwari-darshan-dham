import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function Lotus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 28" aria-hidden="true" className={`section-lotus h-6 w-10 text-accent ${className}`} fill="currentColor">
      <path d="M24 2c4 5 5 11 0 20-5-9-4-15 0-20Z" />
      <path d="M22 22C17 18 12 12 13 6c5 2 9 8 9 16Z" opacity=".75" />
      <path d="M26 22c5-4 10-10 9-16-5 2-9 8-9 16Z" opacity=".75" />
      <path d="M21 23C14 22 7 18 4 12c6-1 13 3 17 11Z" opacity=".5" />
      <path d="M27 23c7-1 14-5 17-11-6-1-13 3-17 11Z" opacity=".5" />
      <rect x="10" y="24" width="28" height="2" rx="1" opacity=".4" />
    </svg>
  );
}

export function SectionHeading({ title, kicker, watermark }: { title: string; kicker?: string | undefined; watermark?: string | undefined }) {
  return (
    <div className="relative mx-auto mb-8 max-w-3xl text-center">
      {watermark && <span aria-hidden="true" className="watermark pointer-events-none absolute inset-x-0 top-1 -z-0 select-none text-5xl md:text-7xl">{watermark}</span>}
      <div className="relative">
        <Lotus className="mx-auto" />
        <h2 className="mt-2 text-3xl text-primary md:text-4xl">{title}</h2>
        {kicker && <p className="mt-1 text-base text-accent">{kicker}</p>}
      </div>
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: string; intro: string; image: string }) {
  return (
    <section className="relative min-h-[320px] overflow-hidden md:min-h-[380px]">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-hero" />
      <div className="relative mx-auto flex min-h-[320px] max-w-6xl flex-col justify-center px-5 py-10 text-primary-foreground md:min-h-[380px] md:px-6">
        <p className="font-display text-lg italic text-gold">{eyebrow}</p>
        <h1 className="mt-2 max-w-2xl text-4xl md:text-5xl">{title}</h1>
        <div className="mt-4 max-w-xl border-l-2 border-gold pl-4"><p className="text-lg opacity-90">{intro}</p></div>
      </div>
    </section>
  );
}

export function Section({ title, kicker, children }: { title: string; kicker?: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-16">
      <SectionHeading title={title} kicker={kicker} watermark={kicker && kicker.length <= 10 ? kicker : undefined} />
      {children}
    </section>
  );
}

/** Full-width band — use tone="muted" for the soft secondary background. */
export function SectionBand({
  title,
  kicker,
  tone = "default",
  children,
}: {
  title: string;
  kicker?: string;
  tone?: "default" | "muted";
  children: ReactNode;
}) {
  const inner = <Section title={title} kicker={kicker}>{children}</Section>;
  if (tone === "muted") return <section className="bg-secondary">{inner}</section>;
  return inner;
}

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="devotee-card rounded-xl border border-border bg-card p-6 shadow-warm">
      <h3 className="text-xl text-accent">{title}</h3>
      <div className="mt-2 text-muted-foreground">{children}</div>
    </div>
  );
}

/** Responsive card grid used across pages. */
export function CardGrid({
  items,
  columns = 3,
}: {
  items: { title: string; text?: string; when?: string; children?: ReactNode }[];
  columns?: 2 | 3;
}) {
  const cols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  return (
    <div className={`grid gap-6 ${cols}`}>
      {items.map((item) => (
        <Card key={item.title} title={item.title}>
          {item.when && <p className="text-sm font-medium text-accent">{item.when}</p>}
          {item.text && <p className={item.when ? "mt-2" : undefined}>{item.text}</p>}
          {item.children}
        </Card>
      ))}
    </div>
  );
}

/** Name + time / value rows (aarti schedule, etc.). */
export function ScheduleList({
  items,
  note,
}: {
  items: { name: string; time: string }[];
  note?: string;
}) {
  return (
    <>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.name} className="flex items-center justify-between rounded-md border border-border bg-card px-5 py-4">
            <span className="font-medium">{item.name}</span>
            <span className="font-display text-2xl text-primary">{item.time}</span>
          </div>
        ))}
      </div>
      {note && <p className="mt-4 text-sm text-muted-foreground">{note}</p>}
    </>
  );
}

/** Simple photo gallery grid. */
export function PhotoGrid({ images, alt }: { images: string[]; alt: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {images.map((src, i) => (
        <img key={`${src}-${i}`} src={src} alt={alt} loading="lazy" className="h-72 w-full rounded-lg object-cover shadow-warm" />
      ))}
    </div>
  );
}

/** Vertical timeline used on the heritage page. */
export function TimelineList({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="relative space-y-8 border-l-2 border-gold pl-8">
      {items.map((item) => (
        <li key={item.title} className="relative">
          <span className="absolute -left-[42px] top-1 h-5 w-5 rounded-full bg-sacred ring-4 ring-background" />
          <h3 className="text-2xl font-semibold text-primary">{item.title}</h3>
          <p className="mt-1 max-w-3xl text-muted-foreground">{item.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Accent-bordered date / notice list. */
export function DateList({ items }: { items: { name: string; date: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.name} className="rounded-md border-l-4 border-accent bg-card px-5 py-3">
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-muted-foreground">{item.date}</p>
        </div>
      ))}
    </div>
  );
}

/** Bullet list with sacred markers. */
export function PointList({ points }: { points: string[] }) {
  return (
    <ul className="space-y-2 text-muted-foreground">
      {points.map((p) => (
        <li key={p} className="flex gap-2">
          <span className="text-accent">✦</span>
          {p}
        </li>
      ))}
    </ul>
  );
}

/** Centered status screen for 404 / error pages. */
export function StatusPage({
  code,
  title,
  text,
  primaryLabel,
  onPrimary,
  secondaryLabel,
}: {
  code?: string;
  title: string;
  text: string;
  primaryLabel: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        {code && <h1 className="text-7xl font-bold text-foreground">{code}</h1>}
        <h2 className={`${code ? "mt-4" : ""} text-xl font-semibold text-foreground`}>{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{text}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {onPrimary ? (
            <Button onClick={onPrimary}>{primaryLabel}</Button>
          ) : (
            <Button asChild><Link to="/">{primaryLabel}</Link></Button>
          )}
          {secondaryLabel && (
            <Button asChild variant="outline"><Link to="/">{secondaryLabel}</Link></Button>
          )}
        </div>
      </div>
    </div>
  );
}
