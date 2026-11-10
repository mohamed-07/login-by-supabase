import { tmdbClient } from '@/lib/tmdbClient';
import type { TrendingResponse } from '../types/trending.type';


export const getTrendingAll = async (page: number): Promise<TrendingResponse> => {
    const response = await tmdbClient.get('/trending/all/week', {
        params: {
            language: 'en-US',
            page,
        }
    })
    return response.data;
}