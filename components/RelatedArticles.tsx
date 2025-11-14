import Link from "next/link";
import { ArticleMetadata } from "@/lib/articles";
import Tags from "./Tags";

interface RelatedArticlesProps {
  articles: ArticleMetadata[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group block"
          >
            <article className="h-full p-5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-500 transition-all">
              {article.category && (
                <div className="mb-3">
                  <span className="text-xs px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                    {article.category}
                  </span>
                </div>
              )}

              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                {article.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {article.description}
              </p>

              {article.tags && article.tags.length > 0 && (
                <div className="mb-3">
                  <Tags tags={article.tags.slice(0, 2)} size="sm" />
                </div>
              )}

              <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                <time>
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
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
  );
}
