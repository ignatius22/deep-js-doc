import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Deep JavaScript - Master JavaScript Fundamentals",
    template: "%s | Deep JavaScript",
  },
  description:
    "Master JavaScript fundamentals without the framework tax. Deep dive into core concepts, patterns, and best practices that every developer should know.",
  keywords: [
    "JavaScript",
    "JavaScript Fundamentals",
    "Web Development",
    "Programming",
    "Event Loop",
    "Async JavaScript",
    "JavaScript Patterns",
    "Vanilla JavaScript",
    "JavaScript Best Practices",
  ],
  authors: [{ name: "Deep JS Team" }],
  creator: "Deep JS Team",
  publisher: "Deep JavaScript",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://deep-js-doc.com",
    siteName: "Deep JavaScript",
    title: "Deep JavaScript - Master JavaScript Fundamentals",
    description:
      "Master JavaScript fundamentals without the framework tax. Deep dive into core concepts, patterns, and best practices.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Deep JavaScript",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deep JavaScript - Master JavaScript Fundamentals",
    description:
      "Master JavaScript fundamentals without the framework tax. Deep dive into core concepts and patterns.",
    images: ["/og-image.png"],
    creator: "@deepjs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    types: {
      "application/rss+xml": [
        {
          url: "/rss.xml",
          title: "Deep JavaScript RSS Feed",
        },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Deep JavaScript",
    description:
      "Master JavaScript fundamentals without the framework tax. Deep dive into core concepts, patterns, and best practices.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://deep-js-doc.com",
    publisher: {
      "@type": "Organization",
      name: "Deep JavaScript",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://deep-js-doc.com"}/logo.png`,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://deep-js-doc.com"}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
