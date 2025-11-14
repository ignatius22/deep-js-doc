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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
              Master JavaScript from the ground up
            </div>

            <h1 className="text-6xl sm:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
              Deep <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">JavaScript</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Master JavaScript fundamentals without the framework tax.
              Deep dive into core concepts, patterns, and best practices that every developer should know.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#articles"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                Start Learning
              </Link>
              <Link
                href="#newsletter"
                className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 dark:border-gray-700"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {articles.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">
              In-Depth Articles
            </div>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              {totalReadingTime}+
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">
              Minutes of Content
            </div>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              100%
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">
              Free & Open Source
            </div>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">
              ∞
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">
              Always Updated
            </div>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Articles
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Start with these essential JavaScript concepts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredArticles.map((article, index) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="block group"
              >
                <article className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-500">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                      Featured
                    </span>
                    {article.category && (
                      <span className="ml-auto text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                        {article.category}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {article.description}
                  </p>

                  {article.tags && article.tags.length > 0 && (
                    <div className="mb-4">
                      <Tags tags={article.tags} size="sm" />
                    </div>
                  )}

                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
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
      )}

      {/* All Articles Section */}
      <div id="articles" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            All Articles
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore all {articles.length} articles and expand your JavaScript knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block group"
            >
              <article className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-xl transition-all h-full border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 flex flex-col">
                {article.category && (
                  <div className="mb-3">
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">
                      {article.category}
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {article.description}
                </p>

                {article.tags && article.tags.length > 0 && (
                  <div className="mb-4">
                    <Tags tags={article.tags} size="sm" />
                  </div>
                )}

                <div className="mt-auto pt-4 flex items-center justify-between text-sm border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center text-gray-500 dark:text-gray-500">
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

                  <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Read more →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div id="newsletter" className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Stay Updated with Latest Articles
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get notified when we publish new deep-dive articles on JavaScript concepts, patterns, and best practices.
          </p>

          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Subscribe
            </button>
          </form>

          <p className="text-blue-100 text-sm mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Deep Understanding
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Go beyond surface-level tutorials. Understand the "why" behind JavaScript concepts.
            </p>
          </div>

          <div className="text-center p-8">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Real-World Examples
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Learn with practical code examples that you can use in your projects today.
            </p>
          </div>

          <div className="text-center p-8">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Performance Focused
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Learn best practices for writing fast, efficient JavaScript code.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
