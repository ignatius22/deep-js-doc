import { getArticlesByTag, getAllTags } from "@/lib/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import Tags from "@/components/Tags";

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `Articles tagged with "${decodedTag}" | Deep JavaScript`,
    description: `Browse all articles tagged with ${decodedTag} to learn JavaScript fundamentals and best practices.`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const articles = getArticlesByTag(decodedTag);

  if (articles.length === 0) {
    notFound();
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Link
              href="/"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Home
            </Link>
            <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-900 dark:text-white">
              Tag: {decodedTag}
            </span>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Articles tagged with{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              {decodedTag}
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {articles.length} {articles.length === 1 ? "article" : "articles"}{" "}
            found
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group block h-full"
            >
              <article className="h-full p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-emerald-500 dark:hover:border-emerald-500 transition-all flex flex-col">
                {article.category && (
                  <div className="mb-3">
                    <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      {article.category}
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {article.description}
                </p>

                {article.tags && article.tags.length > 0 && (
                  <div className="mb-4">
                    <Tags tags={article.tags} size="sm" />
                  </div>
                )}

                <div className="mt-auto pt-4 flex items-center text-xs text-gray-500 dark:text-gray-500">
                  <time>
                    {new Date(article.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <span className="mx-2">•</span>
                  <span>{article.readingTime}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
