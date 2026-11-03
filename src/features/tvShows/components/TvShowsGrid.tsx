import type { TvShow } from '../types/tvshows.type';
import { TvShowCard } from './TvShowCard';

interface TvShowsGridProps {
  tvShows: TvShow[];
}

export function TvShowsGrid({ tvShows }: TvShowsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {tvShows.map((show) => (
        <TvShowCard key={show.id} show={show} />
      ))}
    </div>
  );
}
