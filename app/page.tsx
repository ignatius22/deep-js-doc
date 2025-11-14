import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import Tags from "@/components/Tags";

export default function Home() {
  const articles = getAllArticles();
  const featuredArticles = articles.slice(0, 3);
  const totalReadingTime = articles.reduce((acc, article) => {
    const minutes = parseInt(article.readingTime);
    return acc + (isNaN(minutes) ? 0 : minutes);
  }, 0);

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-24 sm:pb-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              Learn JavaScript fundamentals
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
              Deep <span className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 text-transparent bg-clip-text">JavaScript</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Master JavaScript fundamentals without the framework tax.
              Deep dive into core concepts, patterns, and best practices.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="#articles"
                className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-all hover:scale-105"
              >
                Browse Articles
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="#newsletter"
                className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium transition-all border border-gray-300 dark:border-gray-700"
              >
                Get Updates
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="border-y border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                {articles.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Articles
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                {totalReadingTime}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Min of Content
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                100%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Free
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                ∞
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Updated
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Featured Articles
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Start with these essential JavaScript concepts
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group block h-full"
              >
                <article className="h-full p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-emerald-500 dark:hover:border-emerald-500 transition-all">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center justify-center w-6 h-6 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold">
                      {index + 1}
                    </div>
                    {article.category && (
                      <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                        {article.category}
                      </span>
                    )}
                  </div>

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
      )}

      {/* All Articles Section */}
      <div id="articles" className="bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              All Articles
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Browse {articles.length} in-depth articles on JavaScript
            </p>
          </div>

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

      {/* Newsletter CTA */}
      <div id="newsletter" className="border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Stay up to date
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Get notified when we publish new articles on JavaScript concepts, patterns, and best practices.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>

            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
