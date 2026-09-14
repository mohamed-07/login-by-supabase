import { MovieSkeleton } from './MovieSkeleton';

export function MovieGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <MovieSkeleton key={index} />
      ))}
    </div>
  );
}
