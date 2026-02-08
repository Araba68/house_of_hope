import { NextResponse } from "next/server";
import { kids } from "../../data/kids";

export async function GET() {
  const baseUrl = process.env.SITE_URL || "https://houseofhopechildren.vercel.app";

  const staticPages = ["/", "/gallery", "/kids"];

  const urls = [
    ...staticPages.map((p) => {
      return {
        loc: `${baseUrl}${p}`,
        priority: "1.0",
      };
    }),
    // add kid detail pages
    ...kids.map((k) => ({ loc: `${baseUrl}/kids/${k.id}`, priority: "0.8" })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (u) => `<url>
      <loc>${u.loc}</loc>
      <priority>${u.priority}</priority>
    </url>`
    )
    .join("")}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
