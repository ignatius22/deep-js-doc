import { getAllArticles } from "@/lib/articles";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://deep-js-doc.com";
  const articles = getAllArticles();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Deep JavaScript</title>
    <link>${baseUrl}</link>
    <description>Master JavaScript fundamentals without the framework tax</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${articles
      .map(
        (article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${baseUrl}/articles/${article.slug}</link>
      <description>${escapeXml(article.description)}</description>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <guid>${baseUrl}/articles/${article.slug}</guid>
      ${article.category ? `<category>${escapeXml(article.category)}</category>` : ""}
      ${article.tags?.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ") || ""}
    </item>
    `
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
