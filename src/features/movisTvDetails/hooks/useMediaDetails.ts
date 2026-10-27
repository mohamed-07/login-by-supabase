import { useQuery } from '@tanstack/react-query';
import { getMediaDetails } from '../services/mediaDetails.api';
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
