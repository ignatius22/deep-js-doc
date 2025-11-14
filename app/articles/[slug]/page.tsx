import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, getArticleSlugs } from "@/lib/articles";
import { notFound } from "next/navigation";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

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

  return {
    title: article.title,
    description: article.description,
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

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      {/* Article header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {article.title}
        </h1>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <time>
            {new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span className="mx-2">•</span>
          <span>{article.readingTime}</span>
        </div>
      </header>

      {/* Article content */}
      <article
        className="prose prose-lg dark:prose-invert max-w-none
        prose-headings:text-gray-900 dark:prose-headings:text-white
        prose-p:text-gray-700 dark:prose-p:text-gray-300
        prose-a:text-blue-600 dark:prose-a:text-blue-400
        prose-strong:text-gray-900 dark:prose-strong:text-white
        prose-code:text-gray-900 dark:prose-code:text-gray-100
        prose-code:before:content-[''] prose-code:after:content-['']
        prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950
        prose-pre:text-gray-100"
      >
        <MDXRemote
          source={article.content}
          options={{
            mdxOptions: {
              rehypePlugins: [rehypeHighlight, rehypeSlug],
            },
          }}
        />
      </article>
    </div>
  );
}
