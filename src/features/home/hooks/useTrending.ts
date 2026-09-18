import { useQuery } from '@tanstack/react-query';
import { getTrendingAll } from '../services/trending.api';

export const useTrendingAll = (page: number) => {
  return useQuery({
    queryKey: ['trending', 'all', page],
    queryFn: () => getTrendingAll(page),
  });
};