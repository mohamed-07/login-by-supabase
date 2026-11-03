import { TvShowSkeleton } from './TvShowSkeleton';

export function TvShowsGridSkeleton() {
  return (
    <div
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      aria-label="Loading popular TV shows"
      aria-busy="true"
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <TvShowSkeleton key={index} />
      ))}
    </div>
  );
}
