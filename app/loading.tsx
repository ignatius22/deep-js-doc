export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Skeleton */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20" />

        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 mb-8 animate-pulse h-8 w-64" />

            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 max-w-3xl mx-auto animate-pulse" />
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 max-w-2xl mx-auto animate-pulse" />

            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg mb-12 max-w-3xl mx-auto animate-pulse" />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="h-14 w-40 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
              <div className="h-14 w-48 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
            >
              <div className="h-12 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2 mx-auto animate-pulse" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Articles Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 mx-auto animate-pulse" />
          <div className="h-6 w-96 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-3/4 animate-pulse" />
              <div className="flex gap-2 mb-4">
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              </div>
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
