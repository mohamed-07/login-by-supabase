import type { ReactNode } from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
  title: string;
  posterPath: string | null;
  rating?: number | null;
  mediaType?: 'movie' | 'tv';
  action?: ReactNode;
}

export function MediaCard({
  to,
  title,
  posterPath,
  rating,
  mediaType,
  action,
}: Props) {
  return (
    <article className="group relative min-w-0">
      <Link
        to={to}
        aria-label={`View details for ${title}`}
        className="block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="relative isolate aspect-2/3 overflow-hidden rounded-md border border-white/5 bg-muted">
          {posterPath ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${posterPath}`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035] group-focus-visible:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-full items-center justify-center bg-muted text-muted-foreground"
            >
              <span className="text-xs uppercase tracking-widest">
                No artwork
              </span>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-70" />

          {mediaType ? (
            <span className="absolute left-3 top-3 rounded-sm bg-black/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
              {mediaType === 'tv' ? 'Series' : 'Movie'}
            </span>
          ) : null}

          {rating != null ? (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-sm bg-black/75 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
              <Star
                aria-hidden="true"
                className="size-3 fill-amber-400 text-amber-400"
              />
              {rating.toFixed(1)}
            </span>
          ) : null}
        </div>

        <div className="mt-3 min-w-0">
          <h2 className="truncate text-sm font-medium leading-5 text-foreground transition-colors group-hover:text-foreground/80 sm:text-[15px]">
            {title}
          </h2>
        </div>
      </Link>

      {action && (
        <div className="absolute right-3 top-3 opacity-100 transition-opacity duration-200 focus-within:opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
          {action}
        </div>
      )}
    </article>
  );
}
