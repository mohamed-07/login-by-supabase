import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import type { MediaType, RelatedMedia } from '../types/mediaDetails.type';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

interface RelatedMediaRailProps {
  items: RelatedMedia[];
  mediaType: MediaType;
  isLoading: boolean;
}

export function RelatedMediaRail({
  items,
  mediaType,
  isLoading,
}: RelatedMediaRailProps) {
  if (!isLoading && items.length === 0) return null;

  return (
    <section
      className="border-t border-white/10 py-10 sm:py-14"
      aria-labelledby="related-heading"
    >
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-400">
          Keep watching
        </p>
        <h2 id="related-heading" className="mt-2 text-2xl font-bold text-white">
          More {mediaType === 'tv' ? 'series' : 'like this'}
        </h2>
      </div>
      {isLoading ? (
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="w-36 shrink-0 sm:w-44" key={index}>
              <Skeleton className="aspect-2/3 w-full rounded-md bg-white/10" />
              <Skeleton className="mt-3 h-4 w-3/4 bg-white/10" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-thin [scrollbar-color:#555_transparent]">
          {items.slice(0, 20).map((item) => {
            const itemType = item.media_type ?? mediaType;
            const title = item.title ?? item.name ?? 'Untitled';
            const releaseDate = item.release_date ?? item.first_air_date;
            return (
              <Link
                key={`${itemType}-${item.id}`}
                to={`/details/${itemType}/${item.id}`}
                aria-label={`View details for ${title}`}
                className="group w-36 shrink-0 snap-start rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 sm:w-44"
              >
                <div className="relative aspect-2/3 overflow-hidden rounded-md bg-white/5">
                  {item.poster_path ? (
                    <img
                      src={`${IMAGE_BASE_URL}/w342${item.poster_path}`}
                      alt={`${title} poster`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="grid h-full place-items-center px-3 text-center text-sm text-white/40">
                      Poster unavailable
                    </div>
                  )}
                </div>
                <p className="mt-3 truncate text-sm font-semibold text-white">
                  {title}
                </p>
                <div className="mt-1 flex items-center justify-between gap-2 text-xs text-white/55">
                  {releaseDate ? (
                    <span>{releaseDate.slice(0, 4)}</span>
                  ) : (
                    <span />
                  )}
                  {item.vote_average > 0 && (
                    <span className="inline-flex items-center gap-1 text-amber-300">
                      <Star
                        className="size-3 fill-current"
                        aria-hidden="true"
                      />
                      {item.vote_average.toFixed(1)}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
