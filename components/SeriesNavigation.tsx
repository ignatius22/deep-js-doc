import Link from "next/link";
import { SeriesInfo } from "@/lib/articles";

interface SeriesNavigationProps {
  seriesInfo: SeriesInfo;
}

export default function SeriesNavigation({ seriesInfo }: SeriesNavigationProps) {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
      {/* Series Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 mb-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <span className="text-sm font-semibold uppercase tracking-wider">
            Article Series
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {seriesInfo.seriesName}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Part {seriesInfo.currentPart} of {seriesInfo.totalParts}
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {seriesInfo.previousArticle ? (
          <Link
            href={`/articles/${seriesInfo.previousArticle.slug}`}
            className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-500 transition-all group"
          >
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <div className="text-left min-w-0">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                Previous
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                {seriesInfo.previousArticle.title}
              </div>
            </div>
          </Link>
        ) : (
          <div className="p-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg opacity-50">
            <div className="text-xs text-gray-400 dark:text-gray-500">
              No previous article
            </div>
          </div>
        )}

        {seriesInfo.nextArticle ? (
          <Link
            href={`/articles/${seriesInfo.nextArticle.slug}`}
            className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-500 transition-all group"
          >
            <div className="text-right min-w-0 flex-1">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                Next
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                {seriesInfo.nextArticle.title}
              </div>
            </div>
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <div className="p-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg opacity-50">
            <div className="text-xs text-gray-400 dark:text-gray-500 text-right">
              No next article
            </div>
          </div>
        )}
      </div>

      {/* All Articles in Series */}
      <details className="group">
        <summary className="cursor-pointer text-sm font-medium text-emerald-700 dark:text-emerald-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors list-none flex items-center gap-2">
          <svg
            className="w-4 h-4 transition-transform group-open:rotate-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          View all {seriesInfo.totalParts} articles in this series
        </summary>
        <div className="mt-3 space-y-2">
          {seriesInfo.allArticles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className={`block p-2 rounded-lg transition-colors ${
                article.slug === seriesInfo.allArticles[seriesInfo.currentPart - 1]?.slug
                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100"
                  : "hover:bg-white dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
              }`}
            >
              <div className="text-sm">
                <span className="font-medium">Part {index + 1}:</span>{" "}
                {article.title}
              </div>
            </Link>
          ))}
        </div>
      </details>
    </div>
  );
}
