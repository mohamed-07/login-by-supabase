import { BookmarkPlus, Clock3, Info, Play, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';
import { backdropSrcSet, backdropUrl } from '@/features/home/lib/tmdbImage';
import type {
  MediaDetails,
  MediaType,
  MediaVideo,
} from '../types/mediaDetails.type';

interface MediaHeroProps {
  data: MediaDetails;
  mediaType: MediaType;
  certification?: string;
  videos: MediaVideo[];
}

export function MediaHero({
  data,
  mediaType,
  certification,
  videos,
}: MediaHeroProps) {
  const title = data.title ?? data.name ?? 'Untitled';
  const released = data.release_date ?? data.first_air_date;
  const year = released?.slice(0, 4);
  const trailer =
    videos.find(
      (video) =>
        video.site === 'YouTube' && video.type === 'Trailer' && video.official
    ) ??
    videos.find(
      (video) => video.site === 'YouTube' && video.type === 'Trailer'
    );
  const poster = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : undefined;

  return (
    <header className="relative isolate min-h-[76svh] overflow-hidden bg-[#090909] text-white sm:min-h-[82svh]">
      {data.backdrop_path ? (
        <img
          src={backdropUrl(data.backdrop_path, 'w1280')}
          srcSet={backdropSrcSet(data.backdrop_path)}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
      ) : poster ? (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-top opacity-35 blur-sm"
        />
      ) : null}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,.94)_0%,rgba(0,0,0,.72)_45%,rgba(0,0,0,.14)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,#090909_0%,rgba(9,9,9,.5)_28%,rgba(9,9,9,.06)_72%)]" />

      <div className="container mx-auto flex min-h-[76svh] items-end px-4 pb-14 pt-28 sm:min-h-[82svh] sm:px-8 sm:pb-20 lg:px-14">
        <div className="grid w-full max-w-6xl items-end gap-8 sm:grid-cols-[minmax(0,1fr)_200px] lg:gap-14">
          <div className="max-w-3xl">
            <Link
              to="/trending"
              className="mb-7 inline-flex items-center gap-2 text-sm text-white/75 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <span aria-hidden="true">‹</span> Back to trending
            </Link>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-red-400">
              {mediaType === 'tv' ? 'Series' : 'Feature film'}
            </p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            {data.tagline && (
              <p className="mt-3 max-w-2xl text-lg italic text-white/75 sm:text-xl">
                {data.tagline}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/85">
              {year && <span>{year}</span>}
              {certification && (
                <span className="rounded border border-white/35 px-1.5 py-0.5 text-xs">
                  {certification}
                </span>
              )}
              {mediaType === 'movie' && data.runtime ? (
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="size-4" aria-hidden="true" />
                  {Math.floor(data.runtime / 60)}h {data.runtime % 60}m
                </span>
              ) : null}
              {mediaType === 'tv' && data.number_of_seasons ? (
                <span>
                  {data.number_of_seasons}{' '}
                  {data.number_of_seasons === 1 ? 'season' : 'seasons'}
                  {data.number_of_episodes
                    ? ` · ${data.number_of_episodes} episodes`
                    : ''}
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1.5 font-semibold text-amber-300">
                <Star className="size-4 fill-current" aria-hidden="true" />
                {data.vote_average.toFixed(1)}
                <span className="font-normal text-white/60">TMDB</span>
              </span>
              {data.status && <span>{data.status}</span>}
            </div>

            {data.genres.length > 0 && (
              <p className="mt-3 text-sm text-white/70">
                {data.genres.map((genre) => genre.name).join(' · ')}
              </p>
            )}

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
              {data.overview || 'No overview is available for this title.'}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {trailer ? (
                <a
                  href={`https://www.youtube.com/watch?v=${encodeURIComponent(trailer.key)}`}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({
                    size: 'lg',
                    className:
                      'gap-2 bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-400',
                  })}
                >
                  <Play className="size-4 fill-current" aria-hidden="true" />
                  Watch trailer
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  title="No official YouTube trailer is available"
                  className="inline-flex h-9 cursor-not-allowed items-center gap-2 rounded-lg bg-white/15 px-3 text-sm font-medium text-white/45"
                >
                  <Play className="size-4" aria-hidden="true" /> Trailer
                  unavailable
                </button>
              )}
              <button
                type="button"
                disabled
                title="A watchlist is not configured in this application yet"
                className="inline-flex h-9 cursor-not-allowed items-center gap-2 rounded-lg border border-white/25 bg-black/30 px-3 text-sm font-medium text-white/50"
              >
                <BookmarkPlus className="size-4" aria-hidden="true" />
                Add to My List
              </button>
              <a
                href="#information"
                className={buttonVariants({
                  variant: 'secondary',
                  size: 'lg',
                  className: 'gap-2 bg-white/15 text-white hover:bg-white/25',
                })}
              >
                <Info className="size-4" aria-hidden="true" /> More info
              </a>
            </div>
          </div>

          {poster && (
            <img
              src={poster}
              alt={`${title} poster`}
              loading="eager"
              className="hidden w-full rounded-md object-cover shadow-2xl shadow-black/50 sm:block"
            />
          )}
        </div>
      </div>
    </header>
  );
}
