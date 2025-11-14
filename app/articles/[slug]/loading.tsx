export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="h-5 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
              {/* Header Skeleton */}
              <header className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 animate-pulse" />
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 animate-pulse" />
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 w-3/4 animate-pulse" />
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 animate-pulse" />

                {/* Tags Skeleton */}
                <div className="flex gap-2 mb-6">
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                  <div className="h-8 w-28 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                  <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                </div>

                {/* Meta Skeleton */}
                <div className="flex items-center gap-4">
                  <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              </header>

              {/* Content Skeleton */}
              <article className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i}>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-4/5 animate-pulse" />
                  </div>
                ))}

                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 animate-pulse" />

                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4 animate-pulse" />
                  </div>
                ))}
              </article>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse" />
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
