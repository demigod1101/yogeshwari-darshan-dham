import { createFileRoute } from "@tanstack/react-router";
import { BedDouble, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import journey from "@/assets/journey.jpg";
import air from "@/assets/by-air.jpg";
import train from "@/assets/by-train.jpg";
import road from "@/assets/by-road.jpg";
import niwas from "@/assets/yatri-nivas.jpg.asset.json";
import { PageHero, SectionBand, Card, PointList } from "@/components/Section";
import { pageHead } from "@/lib/seo";
import { pilgrimage } from "@/content/messages";

export const Route = createFileRoute("/pilgrimage")({
  head: () => pageHead(pilgrimage.meta),
  component: Pilgrimage,
});

const modeImages = { air, train, road } as const;

function Pilgrimage() {
  return (
    <>
      <PageHero {...pilgrimage.hero} image={journey} />
      <SectionBand title={pilgrimage.howToReach.title} kicker={pilgrimage.howToReach.kicker}>
        <div className="grid gap-6 md:grid-cols-3">
          {pilgrimage.modes.map((m) => (
            <div key={m.title} className="group overflow-hidden rounded-lg border border-border bg-card shadow-warm">
              <div className="relative h-48 overflow-hidden">
                <img src={modeImages[m.key]} alt={m.title} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-veil" />
                <h3 className="absolute bottom-3 left-5 text-3xl font-semibold text-primary-foreground">{m.title}</h3>
              </div>
              <div className="p-6">
                <PointList points={m.points} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 overflow-hidden rounded-lg border border-border shadow-warm">
          <iframe title={pilgrimage.howToReach.mapTitle} className="h-96 w-full" loading="lazy" src="https://www.google.com/maps?q=Yogeshwari+Devi+Temple+Ambajogai&hl=mr&output=embed" />
        </div>
      </SectionBand>
      <SectionBand title={pilgrimage.tips.title} kicker={pilgrimage.tips.kicker} tone="muted">
        <div className="grid gap-6 md:grid-cols-2">
          <Card title={pilgrimage.tips.bestTimeTitle}>{pilgrimage.tips.bestTimeText}</Card>
          <Dialog>
            <div id="accommodation" className="min-w-0">
              <Card title={pilgrimage.stay.title}>
                <p>{pilgrimage.stay.intro}</p>
                <div className="mt-4 rounded-md border border-border bg-secondary p-4">
                  <p className="font-semibold text-primary">{pilgrimage.stay.name}</p>
                  <p className="mt-1">{pilgrimage.stay.contact}</p>
                  <p className="mt-1">{pilgrimage.stay.address}</p>
                </div>
                <DialogTrigger asChild>
                  <Button className="mt-4 h-auto max-w-full whitespace-normal bg-accent text-accent-foreground hover:bg-accent/90">
                    <BedDouble className="h-4 w-4" />
                    {pilgrimage.stay.photoButton}
                  </Button>
                </DialogTrigger>
              </Card>
            </div>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>{pilgrimage.stay.name}</DialogTitle>
                <DialogDescription>{pilgrimage.stay.dialogDescription}</DialogDescription>
              </DialogHeader>
              <img src={niwas.url} alt={pilgrimage.stay.imageAlt} className="w-full rounded-md border border-border" />
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <a href={pilgrimage.stay.phoneHref}>
                  <Phone className="h-4 w-4" />
                  {pilgrimage.stay.callButton}
                </a>
              </Button>
            </DialogContent>
          </Dialog>
          <Card title={pilgrimage.tips.dressTitle}>{pilgrimage.tips.dressText}</Card>
          <Card title={pilgrimage.tips.nearbyTitle}>{pilgrimage.tips.nearbyText}</Card>
        </div>
      </SectionBand>
    </>
  );
}
