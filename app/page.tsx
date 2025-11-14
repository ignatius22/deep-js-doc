import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Deep JavaScript
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Master JavaScript fundamentals without the framework tax
          </p>
        </div>

        {/* Articles Grid */}
        <div className="space-y-8">
          {articles.map((article) => {
            return (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="block group"
              >
                <article className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                    <time>
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{article.readingTime}</span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
