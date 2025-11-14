"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Article } from "@/lib/articles";
import Tags from "@/components/Tags";

interface BookmarksClientProps {
  articles: Article[];
}

export default function BookmarksClient({ articles }: BookmarksClientProps) {
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const bookmarkedArticles = articles.filter((article) =>
      bookmarks.includes(article.slug)
    );
    setBookmarkedArticles(bookmarkedArticles);
    setIsLoading(false);
  }, [articles]);

  const removeBookmark = (slug: string) => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const updated = bookmarks.filter((b: string) => b !== slug);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
    setBookmarkedArticles(bookmarkedArticles.filter((a) => a.slug !== slug));
  };

  const clearAllBookmarks = () => {
    localStorage.removeItem("bookmarks");
    setBookmarkedArticles([]);
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading bookmarks...
            </p>
          </div>
        </div>
      </div>
    );
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
            <span className="text-gray-900 dark:text-white">Bookmarks</span>
          </nav>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Your{" "}
                <span className="text-emerald-600 dark:text-emerald-400">
                  Reading List
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {bookmarkedArticles.length}{" "}
                {bookmarkedArticles.length === 1
                  ? "article saved"
                  : "articles saved"}
              </p>
            </div>

            {bookmarkedArticles.length > 0 && (
              <button
                onClick={clearAllBookmarks}
                className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bookmarked Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {bookmarkedArticles.length === 0 ? (
          <div className="text-center py-20">
            <svg
              className="mx-auto h-24 w-24 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <h2 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">
              No bookmarks yet
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Start building your reading list by bookmarking articles you want
              to read later.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              Browse Articles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookmarkedArticles.map((article) => (
              <div
                key={article.slug}
                className="group relative block h-full"
              >
                <article className="h-full p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-emerald-500 dark:hover:border-emerald-500 transition-all flex flex-col">
                  {/* Remove button */}
                  <button
                    onClick={() => removeBookmark(article.slug)}
                    className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                    aria-label="Remove bookmark"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <Link href={`/articles/${article.slug}`}>
                    {article.category && (
                      <div className="mb-3">
                        <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                          {article.category}
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors pr-6">
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
                  </Link>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
