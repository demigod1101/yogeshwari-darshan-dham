import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { PageHero, SectionBand, TimelineList, CardGrid } from "@/components/Section";
import { pageHead } from "@/lib/seo";
import { heritage } from "@/content/messages";

export const Route = createFileRoute("/heritage")({
  head: () => pageHead(heritage.meta),
  component: Heritage,
});

function Heritage() {
  return (
    <>
      <PageHero {...heritage.hero} image={hero} />
      <SectionBand title={heritage.timeline.title} kicker={heritage.timeline.kicker}>
        <TimelineList items={heritage.timeline.items} />
      </SectionBand>
      <SectionBand title={heritage.traditions.title} kicker={heritage.traditions.kicker} tone="muted">
        <CardGrid items={heritage.traditions.cards} />
      </SectionBand>
      <SectionBand title={heritage.share.title} kicker={heritage.share.kicker}>
        <p className="max-w-2xl text-muted-foreground">{heritage.share.text}</p>
      </SectionBand>
    </>
  );
}
