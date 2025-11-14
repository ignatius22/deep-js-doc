import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export default function NotFound() {
  const articles = getAllArticles().slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Graphic */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            404
          </h1>
          <div className="mt-4">
            <svg
              className="w-64 h-64 mx-auto text-gray-400 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          Don't worry though, there's plenty of great content to explore!
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            Go to Homepage
          </Link>
          <Link
            href="/#articles"
            className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 dark:border-gray-700"
          >
            Browse Articles
          </Link>
        </div>

        {/* Popular Articles */}
        {articles.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Or check out these popular articles
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 text-left group"
                >
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                    {article.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-500">
                    {article.readingTime}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
