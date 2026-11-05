import { tmdbClient } from '@/lib/tmdbClient';
import type { TvShowResponse } from '../types/tvShows.type';
            // useTvShows
export const getTvShows = async (category: string, page: number): Promise<TvShowResponse> => {
    const response = await tmdbClient.get(`/tv/${category}`, {
        params: { page, language: 'en-US', include_adult: true },
    });
    return response.data as TvShowResponse;
};