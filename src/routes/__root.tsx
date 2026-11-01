import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader, SiteFooter } from "../components/SiteChrome";
import { HtmlDocument } from "@/components/HtmlDocument";
import { StatusPage } from "@/components/Section";
import { brand, errors } from "@/content/messages";

function NotFoundComponent() {
  return (
    <StatusPage
      code="404"
      title={errors.notFoundTitle}
      text={errors.notFoundText}
      primaryLabel={errors.goHome}
    />
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <StatusPage
      title={errors.errorTitle}
      text={errors.errorText}
      primaryLabel={errors.retry}
      onPrimary={() => {
        router.invalidate();
        reset();
      }}
      secondaryLabel={errors.goHome}
    />
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: brand.siteTitle },
      { name: "description", content: brand.siteDescription },
      { property: "og:title", content: brand.siteTitle },
      { property: "og:description", content: brand.siteDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Khand:wght@500;600;700&family=Tiro+Devanagari+Marathi&family=Cormorant+Garamond:wght@500;600;700&family=Mukta:wght@400;500;600&display=swap" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: HtmlDocument,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const sections = document.querySelectorAll("main > section, main > div > section");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-revealed", "true");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    sections.forEach((section) => {
      section.classList.add("motion-section");
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
