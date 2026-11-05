import { useQuery } from '@tanstack/react-query';
import { getTvShows } from '../services/tvShows.api';
import type { TvShowCategory } from '../types/tvShowCategory.type';


export function useTvShows(category: TvShowCategory, page: number) {
  return useQuery({
    queryKey: ['tv-shows', category, page],
    queryFn: () => getTvShows(category, page),
  });
}