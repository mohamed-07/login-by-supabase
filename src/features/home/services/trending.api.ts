import { tmdbClient } from '@/lib/tmdbClient';
import type { TrendingResponse } from '../types/trending.type';


export const getTrendingAll = async (page: number): Promise<TrendingResponse> => {
    const response = await tmdbClient.get('/trending/all/week', {
        params: {
            language: 'en-US',
            page,
        }
    });
    console.log('TMDB URL:', response.config.url);
    console.log('TMDB STATUS:', response.status);
    console.log('TMDB CONTENT TYPE:', response.headers['content-type']);
    console.log('TMDB DATA:', response.data);
    return response.data;
}