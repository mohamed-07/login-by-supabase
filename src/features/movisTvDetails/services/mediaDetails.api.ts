import { tmdbClient } from '@/lib/tmdbClient';
import type { MediaDetails, MediaType } from '../types/mediaDetails.type';

export async function getMediaDetails(
  mediaType: MediaType,
  id: number
): Promise<MediaDetails> {
  const response = await tmdbClient.get(`/${mediaType}/${id}`, {
    params: { language: 'en-US' },
  });

  return response.data;
}
