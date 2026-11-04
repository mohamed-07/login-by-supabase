import { Link, useLocation } from 'react-router-dom';
import type { TvShow } from '../types/tvShows.type';

interface TvShowCardProps {
  show: TvShow;
}

export function TvShowCard({ show }: TvShowCardProps) {
  const location = useLocation();

  return (
    <Link
      to={`/details/tv/${show.id}`}
      state={{
        from: `${location.pathname}${location.search}${location.hash}`,
      }}
    >
      <article className="overflow-hidden rounded-lg">
        <img
          src={
            show.poster_path
              ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
              : '/placeholder.png'
          }
          alt={show.name}
          loading="lazy"
          className="aspect-2/3 w-full object-cover"
        />

        <div className="mt-2">
          <h2 className="font-semibold">{show.name}</h2>

          <p className="text-sm text-muted-foreground">
            {show.first_air_date?.slice(0, 4) || 'Unknown'}
          </p>

          <p className="text-sm">⭐ {show.vote_average.toFixed(1)}</p>
        </div>
      </article>
    </Link>
  );
}
