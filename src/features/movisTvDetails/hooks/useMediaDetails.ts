import { useQuery } from '@tanstack/react-query';
import {
  getMediaCertification,
  getMediaDetails,
  getMediaVideos,
  getRelatedMedia,
  getTvSeason,
} from '../services/mediaDetails.api';
import type { MediaType } from '../types/mediaDetails.type';

export function useMediaDetails(
  mediaType: MediaType,
  id: number,
  enabled: boolean
) {
  return useQuery({
    queryKey: ['media-details', mediaType, id],
    queryFn: () => getMediaDetails(mediaType, id),
    enabled,
  });
}

export function useMediaVideos(
  mediaType: MediaType,
  id: number,
  enabled: boolean
) {
  return useQuery({
    queryKey: ['media-videos', mediaType, id],
    queryFn: () => getMediaVideos(mediaType, id),
    enabled,
  });
}

export function useMediaCertification(
  mediaType: MediaType,
  id: number,
  enabled: boolean
) {
  return useQuery({
    queryKey: ['media-certification', mediaType, id],
    queryFn: () => getMediaCertification(mediaType, id),
    enabled,
  });
}

export function useRelatedMedia(
  mediaType: MediaType,
  id: number,
  enabled: boolean
) {
  return useQuery({
    queryKey: ['related-media', mediaType, id],
    queryFn: () => getRelatedMedia(mediaType, id),
    enabled,
  });
}

export function useTvSeason(
  id: number,
  seasonNumber: number,
  enabled: boolean
) {
  return useQuery({
    queryKey: ['tv-season', id, seasonNumber],
    queryFn: () => getTvSeason(id, seasonNumber),
    enabled,
  });
}
