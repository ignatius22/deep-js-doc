import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, getArticleSlugs } from "@/lib/articles";
import { notFound } from "next/navigation";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import Link from "next/link";
import ReadingProgress from "@/components/ReadingProgress";
import TableOfContents from "@/components/TableOfContents";
import Tags from "@/components/Tags";
import CodeBlock from "@/components/CodeBlock";
import ShareButtons from "@/components/ShareButtons";

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://deep-js-doc.com";
  const url = `${baseUrl}/articles/${slug}`;

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    authors: [{ name: article.author || "Deep JS Team" }],
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.description,
      publishedTime: new Date(article.date).toISOString(),
      authors: [article.author || "Deep JS Team"],
      tags: article.tags,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [`${baseUrl}/og-image.png`],
      creator: "@deepjs",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let article;

  try {
    article = getArticleBySlug(slug);
  } catch {
    notFound();
  }

  const mdxComponents = {
    pre: CodeBlock,
  };

  return (
    <>
      <ReadingProgress />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </Link>
          <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <Link href="/#articles" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Articles
          </Link>
          <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-gray-900 dark:text-white truncate">{article.title}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
              {/* Article header */}
              <header className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                {article.category && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                      {article.category}
                    </span>
                  </div>
                )}

                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                  {article.title}
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                  {article.description}
                </p>

                {article.tags && article.tags.length > 0 && (
                  <div className="mb-6">
                    <Tags tags={article.tags} size="md" />
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>{article.author}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <time>
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{article.readingTime}</span>
                  </div>
                </div>
              </header>

              {/* Article content */}
              <article
                className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
                prose-code:text-gray-900 dark:prose-code:text-gray-100 prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-code:before:content-[''] prose-code:after:content-['']
                prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-pre:rounded-lg
                prose-pre:shadow-lg prose-pre:border prose-pre:border-gray-700
                prose-ul:my-4 prose-ol:my-4
                prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:my-1
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4
                prose-blockquote:italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300"
              >
                <MDXRemote
                  source={article.content}
                  components={mdxComponents}
                  options={{
                    mdxOptions: {
                      rehypePlugins: [rehypeHighlight, rehypeSlug],
                    },
                  }}
                />
              </article>

              {/* Social Sharing */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Share this article
                </h3>
                <ShareButtons title={article.title} slug={slug} />
              </div>
            </div>
          </div>

          {/* Sidebar with TOC */}
          <div className="lg:col-span-4">
            <TableOfContents />
          </div>
        </div>
      </div>
    </>
  );
}
