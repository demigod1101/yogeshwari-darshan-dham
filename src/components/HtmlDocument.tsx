import { HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Global HTML document shell used by every page.
 * Keeps <html>, <head>, and <body> in one place.
 */
export function HtmlDocument({ children, lang = "mr" }: { children: ReactNode; lang?: string }) {
  return (
    <html lang={lang}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
