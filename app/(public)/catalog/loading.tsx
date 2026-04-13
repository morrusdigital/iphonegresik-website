function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white overflow-hidden">
      <div className="aspect-square w-full bg-gray-100" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-3/4 rounded-full bg-gray-100" />
        <div className="h-3 w-1/2 rounded-full bg-gray-100" />
        <div className="h-4 w-2/3 rounded-full bg-gray-100" />
        <div className="space-y-1.5 pt-1">
          <div className="h-3 w-full rounded-full bg-gray-100" />
          <div className="h-3 w-full rounded-full bg-gray-100" />
        </div>
        <div className="space-y-2 pt-1">
          <div className="h-8 w-full rounded-lg bg-gray-100" />
          <div className="h-8 w-full rounded-lg bg-gray-100" />
        </div>
      </div>
    </div>
  )
}

export default function KatalogLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-48 animate-pulse rounded-lg bg-gray-100" />
        <div className="h-4 w-72 animate-pulse rounded-lg bg-gray-100" />
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-2">
        {[80, 64, 52, 52, 96].map((w, i) => (
          <div
            key={i}
            style={{ width: w }}
            className="h-8 animate-pulse rounded-full bg-gray-100"
          />
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="flex gap-8">
        {/* Sidebar skeleton */}
        <div className="hidden w-56 shrink-0 space-y-4 lg:block">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-3 w-16 animate-pulse rounded-full bg-gray-100" />
              <div className="h-9 w-full animate-pulse rounded-lg bg-gray-100" />
            </div>
          ))}
        </div>

        {/* Cards skeleton */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}