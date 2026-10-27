import { tmdbClient } from '@/lib/tmdbClient';
import type {
  MediaDetails,
  MediaType,
  MediaVideosResponse,
  MovieReleaseDatesResponse,
  RelatedMediaResponse,
  TvContentRatingsResponse,
  TvSeasonDetails,
} from '../types/mediaDetails.type';

export async function getMediaDetails(
  mediaType: MediaType,
  id: number
): Promise<MediaDetails> {
  const response = await tmdbClient.get(`/${mediaType}/${id}`, {
    params: { language: 'en-US' },
  });

  return response.data;
}

export async function getMediaVideos(
  mediaType: MediaType,
  id: number
): Promise<MediaVideosResponse> {
  const response = await tmdbClient.get(`/${mediaType}/${id}/videos`, {
    params: { language: 'en-US' },
  });
  return response.data;
}

export async function getMediaCertification(
  mediaType: MediaType,
  id: number
): Promise<string | undefined> {
  const country = 'US';
  if (mediaType === 'movie') {
    const response = await tmdbClient.get<MovieReleaseDatesResponse>(
      `/movie/${id}/release_dates`
    );
    const releases = response.data.results.find(
      (result) => result.iso_3166_1 === country
    )?.release_dates;
    return releases?.find((release) => release.certification)?.certification;
  }

  const response = await tmdbClient.get<TvContentRatingsResponse>(
    `/tv/${id}/content_ratings`
  );
  return response.data.results.find((result) => result.iso_3166_1 === country)
    ?.rating;
}

export async function getRelatedMedia(
  mediaType: MediaType,
  id: number
): Promise<RelatedMediaResponse> {
  const response = await tmdbClient.get<RelatedMediaResponse>(
    `/${mediaType}/${id}/recommendations`,
    { params: { language: 'en-US', page: 1 } }
  );
  return response.data;
}

export async function getTvSeason(
  id: number,
  seasonNumber: number
): Promise<TvSeasonDetails> {
  const response = await tmdbClient.get<TvSeasonDetails>(
    `/tv/${id}/season/${seasonNumber}`,
    { params: { language: 'en-US' } }
  );
  return response.data;
}
