"use client";

import { useState, useEffect } from "react";

interface BookmarkButtonProps {
  slug: string;
  title: string;
}

export default function BookmarkButton({ slug, title }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setIsBookmarked(bookmarks.includes(slug));
  }, [slug]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

    if (isBookmarked) {
      // Remove bookmark
      const updated = bookmarks.filter((b: string) => b !== slug);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      setIsBookmarked(false);
    } else {
      // Add bookmark
      const updated = [...bookmarks, slug];
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      setIsBookmarked(true);
    }
  };

  if (!isClient) return null;

  return (
    <button
      onClick={toggleBookmark}
      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors text-sm font-medium"
      aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
    >
      {isBookmarked ? (
        <>
          <svg
            className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
          Bookmarked
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          Bookmark
        </>
      )}
    </button>
  );
}
