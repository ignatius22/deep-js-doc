import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import Search from "./Search";

export default function Sidebar() {
  const articles = getAllArticles();

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-800 h-screen sticky top-0 overflow-y-auto bg-white dark:bg-gray-900">
      <div className="p-6">
        {/* Logo/Title */}
        <Link href="/" className="block mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Deep JavaScript
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Without the Framework Tax
          </p>
        </Link>

        {/* Search */}
        <div className="mb-6">
          <Search
            articles={articles.map((a) => ({
              slug: a.slug,
              title: a.title,
              description: a.description,
            }))}
          />
        </div>

        {/* Navigation */}
        <nav>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Articles
          </h3>
          <ul className="space-y-2">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/articles/${article.slug}`}
                  className="block px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {articles.length} articles
          </p>
        </div>
      </div>
    </aside>
  );
}
