import { tmdbClient } from '@/lib/tmdbClient';
import type { TvShowResponse } from '../types/tvshows.type';

export const getMostPopularTvShows = async (page: number): Promise<TvShowResponse> => {
    const response = await tmdbClient.get('/tv/popular', {
        params: { page, language: 'en-US', include_adult: true },
    });
    return response.data as TvShowResponse;
};