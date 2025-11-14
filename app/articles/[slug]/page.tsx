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
    <div className="bg-white dark:bg-gray-950">
      <ReadingProgress />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <Link href="/#articles" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Articles
            </Link>
            <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-900 dark:text-white truncate max-w-sm">{article.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Article header */}
            <header className="mb-12">
              {article.category && (
                <div className="mb-4">
                  <span className="inline-block px-2.5 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {article.category}
                  </span>
                </div>
              )}

              <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">
                {article.title}
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                {article.description}
              </p>

              {article.tags && article.tags.length > 0 && (
                <div className="mb-6">
                  <Tags tags={article.tags} size="sm" />
                </div>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
                <span>{article.author}</span>
                <span>•</span>
                <time>
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>•</span>
                <span>{article.readingTime}</span>
              </div>
            </header>

            {/* Article content */}
            <article
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-20 prose-h1:text-4xl prose-h1:mb-8 prose-h1:leading-tight prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-800 prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:leading-snug prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3 prose-p:text-[17px] prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-[1.8] prose-p:mb-6 prose-p:mt-0 prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:transition-colors prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold prose-em:text-gray-800 dark:prose-em:text-gray-200 prose-code:text-emerald-700 dark:prose-code:text-emerald-300 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[15px] prose-code:font-mono prose-code:font-medium prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-gray-950 dark:prose-pre:bg-black prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:border prose-pre:border-gray-800 dark:prose-pre:border-gray-900 prose-pre:my-8 prose-pre:p-0 prose-pre:leading-relaxed prose-pre:shadow-lg prose-pre:overflow-x-auto prose-ul:my-6 prose-ul:space-y-3 prose-ol:my-6 prose-ol:space-y-3 prose-li:text-[17px] prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:leading-[1.8] prose-li:my-2 prose-li:marker:text-emerald-600 dark:prose-li:marker:text-emerald-400 prose-ul>li>ul:mt-3 prose-ul>li>ul:mb-2 prose-ol>li>ol:mt-3 prose-ol>li>ol:mb-2 prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50 dark:prose-blockquote:bg-emerald-950/20 prose-blockquote:pl-6 prose-blockquote:pr-6 prose-blockquote:py-4 prose-blockquote:my-8 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 prose-table:my-8 prose-table:w-full prose-table:border-collapse prose-th:bg-gray-50 dark:prose-th:bg-gray-900 prose-th:text-left prose-th:p-3 prose-th:font-semibold prose-th:border prose-th:border-gray-200 dark:prose-th:border-gray-800 prose-td:p-3 prose-td:border prose-td:border-gray-200 dark:prose-td:border-gray-800 prose-td:text-gray-700 dark:prose-td:text-gray-300 prose-hr:my-12 prose-hr:border-gray-200 dark:prose-hr:border-gray-800 prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-800 prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-gray-600 dark:prose-figcaption:text-gray-400 prose-figcaption:mt-3"
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
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Share this article
              </h3>
              <ShareButtons title={article.title} slug={slug} />
            </div>
          </div>

          {/* Sidebar with TOC */}
          <div className="lg:col-span-4">
            <TableOfContents />
          </div>
        </div>
      </div>
    </div>
  );
}
