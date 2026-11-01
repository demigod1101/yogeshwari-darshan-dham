import { createFileRoute } from "@tanstack/react-router";
import aarti from "@/assets/aarti.jpg";
import g1 from "@/assets/t-ygd.jpg.asset.json";
import g2 from "@/assets/t-DSCN3429.jpg.asset.json";
import g3 from "@/assets/t-DSCN3411.jpg.asset.json";
import g4 from "@/assets/t-DSCN3455.jpg.asset.json";
import g5 from "@/assets/t-DSCN3469.jpg.asset.json";
import g6 from "@/assets/t-2332.jpg.asset.json";
import { PageHero, SectionBand, ScheduleList, PhotoGrid, CardGrid } from "@/components/Section";
import { pageHead } from "@/lib/seo";
import { darshan } from "@/content/messages";

export const Route = createFileRoute("/darshan")({
  head: () => pageHead(darshan.meta),
  component: Darshan,
});

function Darshan() {
  return (
    <>
      <PageHero {...darshan.hero} image={aarti} />
      <SectionBand title={darshan.schedule.title} kicker={darshan.schedule.kicker}>
        <ScheduleList items={darshan.schedule.items} note={darshan.schedule.note} />
      </SectionBand>
      <SectionBand title={darshan.gallery.title} kicker={darshan.gallery.kicker} tone="muted">
        <PhotoGrid images={[g1.url, g2.url, g3.url, g4.url, g5.url, g6.url]} alt={darshan.gallery.imageAlt} />
      </SectionBand>
      <SectionBand title={darshan.audio.title} kicker={darshan.audio.kicker}>
        <CardGrid
          items={darshan.audio.items.map((title) => ({
            title,
            children: (
              <>
                <p>{darshan.audio.comingSoon}</p>
                <div className="mt-4 h-1 rounded bg-muted"><div className="h-1 w-1/3 rounded bg-sacred" /></div>
              </>
            ),
          }))}
        />
      </SectionBand>
      <SectionBand title={darshan.festivals.title} kicker={darshan.festivals.kicker} tone="muted">
        <CardGrid items={darshan.festivals.items.map((f) => ({ title: f.name, when: f.when, text: f.text }))} />
      </SectionBand>
    </>
  );
}
