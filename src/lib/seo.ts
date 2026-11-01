type PageMeta = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
};

/** Shared page SEO / Open Graph tags — use on every route instead of copying meta arrays. */
export function pageHead({ title, description, ogTitle, ogDescription }: PageMeta) {
  return {
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title },
      { name: "description", content: description },
      { property: "og:title", content: ogTitle ?? title },
      { property: "og:description", content: ogDescription ?? description },
    ],
  };
}
