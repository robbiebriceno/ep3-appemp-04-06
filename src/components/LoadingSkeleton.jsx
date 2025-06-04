import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

function MovieCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Poster skeleton */}
      <Skeleton height={320} />
      
      {/* Content skeleton */}
      <div className="p-5">
        {/* Título */}
        <Skeleton height={24} className="mb-2" />
        
        {/* Precio y idioma */}
        <div className="flex justify-between items-center mb-3">
          <Skeleton height={20} width="40%" />
          <Skeleton height={16} width="30%" />
        </div>
        
        {/* Descripción */}
        <Skeleton count={3} height={16} className="mb-4" />
        
        {/* Horarios */}
        <div className="mb-4">
          <Skeleton height={14} width="25%" className="mb-2" />
          <Skeleton height={14} width="80%" />
        </div>
        
        {/* Botones */}
        <Skeleton height={40} className="mb-2" />
        <Skeleton height={36} />
      </div>
    </div>
  )
}

function LoadingSkeleton({ count = 8 }) {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    </SkeletonTheme>
  )
}

export default LoadingSkeleton