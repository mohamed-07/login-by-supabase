import { useParams } from 'react-router-dom';
import {
  useMediaCertification,
  useMediaDetails,
  useMediaVideos,
  useRelatedMedia,
} from '../hooks/useMediaDetails';
import { MediaHero } from '../components/MediaHero';
import { MediaInformation } from '../components/MediaInformation';
import { RelatedMediaRail } from '../components/RelatedMediaRail';
import { TvSeasonsSection } from '../components/TvSeasonsSection';
import type { MediaType } from '../types/mediaDetails.type';

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
  const activeMediaType: MediaType = isValidMediaType
    ? (mediaType as MediaType)
    : 'movie';
  const videos = useMediaVideos(activeMediaType, parsedId, isValidRoute);
  const certification = useMediaCertification(
    activeMediaType,
    parsedId,
    isValidRoute
  );
  const related = useRelatedMedia(activeMediaType, parsedId, isValidRoute);

  if (!isValidRoute) {
    return (
      <p className="container mx-auto px-4 py-12 text-white">
        This title could not be found.
      </p>
    );
  }

  if (isLoading) {
    return (
      <main
        className="min-h-screen bg-[#090909] px-4 py-12 text-white sm:px-8"
        aria-live="polite"
      >
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-[55svh] rounded-md bg-white/5" />
          <div className="mt-8 h-7 w-48 rounded bg-white/10" />
          <div className="mt-4 h-4 max-w-2xl rounded bg-white/5" />
          <p className="sr-only">
            Loading {mediaType === 'tv' ? 'series' : 'movie'} details...
          </p>
        </div>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="min-h-screen bg-[#090909] px-4 py-12 text-white sm:px-8">
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

  return (
    <main className="min-h-screen overflow-hidden bg-[#090909] text-white">
      <MediaHero
        data={data}
        mediaType={activeMediaType}
        certification={certification.data}
        videos={videos.data?.results ?? []}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14">
        <MediaInformation data={data} mediaType={activeMediaType} />
        {activeMediaType === 'tv' && <TvSeasonsSection show={data} />}
        <RelatedMediaRail
          items={related.data?.results ?? []}
          mediaType={activeMediaType}
          isLoading={related.isLoading}
        />
      </div>
    </main>
  );
}
