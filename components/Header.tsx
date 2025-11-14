"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">JS</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Deep JavaScript
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#articles"
              className={`text-sm font-medium transition-colors ${
                isActive("/#articles")
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Articles
            </Link>
            <Link
              href="/bookmarks"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                isActive("/bookmarks")
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Bookmarks
            </Link>
            <Link
              href="/#newsletter"
              className={`text-sm font-medium transition-colors ${
                isActive("/#newsletter")
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Newsletter
            </Link>
            <a
              href="/rss.xml"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              RSS
            </a>

            {/* Search Button */}
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden lg:inline">Search...</span>
              <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-4">
              <Link
                href="/#articles"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="/bookmarks"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Bookmarks
              </Link>
              <Link
                href="/#newsletter"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Newsletter
              </Link>
              <a
                href="/rss.xml"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                RSS
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
