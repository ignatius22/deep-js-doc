import { getArticlesByCategory, getAllCategories } from "@/lib/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import Tags from "@/components/Tags";

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  return {
    title: `${decodedCategory} Articles | Deep JavaScript`,
    description: `Browse all articles in the ${decodedCategory} category to learn JavaScript fundamentals and best practices.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const articles = getArticlesByCategory(decodedCategory);

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
              Category: {decodedCategory}
            </span>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="text-emerald-600 dark:text-emerald-400">
              {decodedCategory}
            </span>{" "}
            Articles
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {articles.length} {articles.length === 1 ? "article" : "articles"}{" "}
            in this category
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
                    <span className="text-xs px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
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
