import { Link, useParams } from 'react-router-dom';
import { useMediaDetails } from '../hooks/useMediaDetails';
import type { MediaType } from '../types/mediaDetails.type';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export default function MovisTvDetailsPage() {
  const { mediaType, id } = useParams();
  const parsedId = Number(id);
  const isValidMediaType = mediaType === 'movie' || mediaType === 'tv';
  const isValidId = Number.isInteger(parsedId) && parsedId > 0;
  const isValidRoute = isValidMediaType && isValidId;
  const { data, isLoading, isError, error, refetch } = useMediaDetails(
    isValidMediaType ? (mediaType as MediaType) : 'movie',
    parsedId,
    isValidRoute
  );

  if (!isValidRoute) {
    return (
      <p className="container mx-auto px-4 py-12">
        This title could not be found.
      </p>
    );
  }

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-12" aria-live="polite">
        <p>Loading {mediaType === 'tv' ? 'series' : 'movie'} details...</p>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Could not load this title</h1>
        <p className="mt-2 text-muted-foreground">
          {error instanceof Error ? error.message : 'Please try again.'}
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Try again
        </button>
      </main>
    );
  }

  const title = data.title ?? data.name ?? 'Untitled';
  const releaseDate = data.release_date ?? data.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : undefined;
  const backdrop = data.backdrop_path
    ? `${IMAGE_BASE_URL}/original${data.backdrop_path}`
    : undefined;
  const poster = data.poster_path
    ? `${IMAGE_BASE_URL}/w500${data.poster_path}`
    : undefined;

  return (
    <main className="pb-12">
      <section className="relative min-h-[38vh] overflow-hidden bg-muted sm:min-h-[48vh]">
        {backdrop && (
          <img
            src={backdrop}
            alt=""
            className="absolute inset-0 h-full w-full object-cover brightness-110"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/35 to-background/5" />
        <div className="relative container mx-auto flex min-h-[38vh] items-end px-4 pb-8 pt-20 sm:min-h-[48vh] sm:px-8 sm:pb-12">
          <div>
            <Link
              to="/"
              className="mb-4 inline-block text-sm text-red/80 hover:text-white"
            >
              Back to home
            </Link>
            <p className="mb-2 text-sm font-medium uppercase text-red/75">
              {mediaType === 'tv' ? 'TV Series' : 'Movie'}
            </p>
            <h1 className="max-w-4xl text-3xl font-bold text-red sm:text-5xl">
              {title}
            </h1>
            {data.tagline && (
              <p className="mt-3 text-red/20">{data.tagline}</p>
            )}
          </div>
        </div>
      </section>

      <section className="container relative z-10 mx-auto -mt-7 grid gap-8 px-4 pt-8 sm:grid-cols-[minmax(180px,280px)_1fr] sm:px-8">
        {poster ? (
          <img
            src={poster}
            alt={`${title} poster`}
            className="w-full max-w-70 rounded-lg object-cover shadow-lg"
          />
        ) : (
          <div className="aspect-2/3 w-full max-w-70 rounded-lg bg-muted" />
        )}

        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {year && <span>{year}</span>}
            <span>★ {data.vote_average.toFixed(1)} / 10</span>
            {data.runtime && <span>{data.runtime} min</span>}
            {data.number_of_seasons && (
              <span>
                {data.number_of_seasons}{' '}
                {data.number_of_seasons === 1 ? 'season' : 'seasons'}
              </span>
            )}
            {data.status && <span>{data.status}</span>}
          </div>

          {data.genres.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Genres">
              {data.genres.map((genre) => (
                <li
                  key={genre.id}
                  className="rounded-full border px-3 py-1 text-sm"
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          )}

          <h2 className="mt-8 text-xl font-semibold">Overview</h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
            {data.overview || 'No overview is available for this title.'}
          </p>
        </div>
      </section>
    </main>
  );
}
