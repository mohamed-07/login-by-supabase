import type {  MultiSearchResponse } from '@/features/search/types/search.type';
import { tmdbClient } from "@/lib/tmdbClient";   

export const searchMulti = async (
    page: number,
    query: string,
    signal?: AbortSignal
): Promise<MultiSearchResponse> => {
    const response = await tmdbClient.get('/search/multi', {
        params: { page, query },
        signal // lets React Query cancel old requests
    });
    return response.data;
};
