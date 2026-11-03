import { useQuery } from '@tanstack/react-query';
import { getMostPopularTvShows } from '../services/tvShows.api';
// import type { TvShowResponse } from '../types/tvshows.type';

export function usePopularTvShows(page: number) {
  return useQuery({
    queryKey: ['popular', 'tv-shows', page],
    queryFn: () => getMostPopularTvShows(page),
  });
}