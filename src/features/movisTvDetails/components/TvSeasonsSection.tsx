import { useState } from 'react';
import { useTvSeason } from '../hooks/useMediaDetails';
import type { MediaDetails } from '../types/mediaDetails.type';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export function TvSeasonsSection({ show }: { show: MediaDetails }) {
  const seasons =
    show.seasons?.filter((season) => season.season_number >= 0) ?? [];
  const defaultSeason =
    seasons.find((season) => season.season_number > 0) ?? seasons[0];
  const [selectedSeason, setSelectedSeason] = useState<number | undefined>(
    defaultSeason?.season_number
  );
  const activeSeason =
    seasons.find((season) => season.season_number === selectedSeason) ??
    defaultSeason;
  const seasonQuery = useTvSeason(
    show.id,
    activeSeason?.season_number ?? 0,
    Boolean(activeSeason)
  );

  return (
    <section
      className="border-t border-white/10 py-10 sm:py-14"
      aria-labelledby="episodes-heading"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-400">
            Explore the story
          </p>
          <h2
            id="episodes-heading"
            className="mt-2 text-2xl font-bold text-white"
          >
            Seasons & episodes
          </h2>
        </div>
        {seasons.length > 0 && (
          <label className="flex items-center gap-3 text-sm text-white/65">
            <span>Season</span>
            <select
              value={activeSeason?.season_number ?? ''}
              onChange={(event) =>
                setSelectedSeason(Number(event.target.value))
              }
              className="min-h-10 max-w-64 rounded-md border border-white/20 bg-[#171717] px-3 text-white outline-none transition-colors focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/40"
            >
              {seasons.map((season) => (
                <option key={season.id} value={season.season_number}>
                  {season.name}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {seasons.length === 0 ? (
        <p className="mt-6 text-sm text-white/55">
          Season information is not available for this series.
        </p>
      ) : seasonQuery.isLoading ? (
        <div className="mt-6 space-y-3" aria-live="polite">
          {[0, 1, 2].map((row) => (
            <div
              className="h-28 animate-pulse rounded-md bg-white/5"
              key={row}
            />
          ))}
        </div>
      ) : seasonQuery.isError ? (
        <div className="mt-6 rounded-md bg-white/4 p-5 text-sm text-white/65">
          <p>Episodes for this season could not be loaded.</p>
          <button
            type="button"
            className="mt-3 font-semibold text-red-400 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            onClick={() => void seasonQuery.refetch()}
          >
            Try again
          </button>
        </div>
      ) : !seasonQuery.data?.episodes.length ? (
        <p className="mt-6 text-sm text-white/55">
          No episodes are listed for this season yet.
        </p>
      ) : (
        <div className="mt-6 divide-y divide-white/10">
          {seasonQuery.data.episodes.map((episode) => (
            <article
              key={episode.id}
              className="grid gap-4 py-4 sm:grid-cols-[minmax(160px,240px)_1fr] sm:items-center sm:gap-6"
            >
              <div className="relative aspect-video overflow-hidden rounded-md bg-white/5">
                {episode.still_path ? (
                  <img
                    src={`${IMAGE_BASE_URL}/w500${episode.still_path}`}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full place-items-center bg-[linear-gradient(135deg,#242424,#111)] px-4 text-center text-xs text-white/40">
                    Episode {episode.episode_number}
                  </div>
                )}
                <span className="absolute bottom-2 left-2 rounded bg-black/75 px-2 py-1 text-xs font-semibold text-white">
                  {episode.episode_number}
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-semibold text-white">
                    {episode.name || `Episode ${episode.episode_number}`}
                  </h3>
                  {episode.air_date && (
                    <time className="text-xs text-white/45">
                      {new Date(
                        `${episode.air_date}T00:00:00`
                      ).toLocaleDateString()}
                    </time>
                  )}
                </div>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/60">
                  {episode.overview || 'No episode summary is available.'}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
