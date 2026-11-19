import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { searchMulti } from '../services/search.api';

export const useSearchMulti = (page: number, query: string) => {
    return useQuery({
        queryKey: ['search', 'multi', query, page],
        queryFn: ({ signal }) => searchMulti(page, query, signal),
        enabled: query.trim().length >= 3,
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5,
    })
}