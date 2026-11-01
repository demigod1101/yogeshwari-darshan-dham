import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import festival from "@/assets/festival.jpg";
import { PageHero, SectionBand, Card, CardGrid, DateList } from "@/components/Section";
import { pageHead } from "@/lib/seo";
import { connect } from "@/content/messages";

export const Route = createFileRoute("/connect")({
  head: () => pageHead(connect.meta),
  component: Connect,
});

function Connect() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero {...connect.hero} image={festival} />
      <SectionBand title={connect.calendar.title} kicker={connect.calendar.kicker}>
        <div className="grid gap-6 md:grid-cols-2">
          <DateList items={connect.calendar.dates} />
          <Card title={connect.calendar.newsTitle}>
            <ul className="space-y-3">
              {connect.calendar.news.map((n) => (
                <li key={n} className="border-b border-border pb-3 last:border-0">{n}</li>
              ))}
            </ul>
          </Card>
        </div>
      </SectionBand>
      <SectionBand title={connect.puja.title} kicker={connect.puja.kicker} tone="muted">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-muted-foreground">{connect.puja.intro}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {connect.puja.types.map((p) => (
                <span key={p} className="rounded-full bg-card px-4 py-1 text-sm text-primary">{p}</span>
              ))}
            </div>
          </div>
          {sent ? (
            <Card title={connect.puja.thanksTitle}>{connect.puja.thanksText}</Card>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-3 rounded-lg bg-card p-6 shadow-warm"
            >
              <label className="block space-y-1">
                <span className="font-medium">{connect.puja.nameLabel}</span>
                <input required autoComplete="name" placeholder={connect.puja.namePlaceholder} className="w-full rounded-md border border-input bg-background px-4 py-2" />
              </label>
              <label className="block space-y-1">
                <span className="font-medium">{connect.puja.phoneLabel}</span>
                <input required type="tel" autoComplete="tel" placeholder={connect.puja.phonePlaceholder} className="w-full rounded-md border border-input bg-background px-4 py-2" />
              </label>
              <label className="block space-y-1">
                <span className="font-medium">{connect.puja.pujaLabel}</span>
                <select className="w-full rounded-md border border-input bg-background px-4 py-2">
                  {connect.puja.types.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </label>
              <label className="block space-y-1">
                <span className="font-medium">{connect.puja.dateLabel}</span>
                <input type="date" className="w-full rounded-md border border-input bg-background px-4 py-2" />
              </label>
              <label className="block space-y-1">
                <span className="font-medium">{connect.puja.messageLabel}</span>
                <textarea placeholder={connect.puja.messagePlaceholder} rows={3} className="w-full rounded-md border border-input bg-background px-4 py-2" />
              </label>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                {connect.puja.submit}
              </Button>
            </form>
          )}
        </div>
      </SectionBand>
      <SectionBand title={connect.committee.title} kicker={connect.committee.kicker}>
        <CardGrid items={connect.committee.cards} />
      </SectionBand>
    </>
  );
}
