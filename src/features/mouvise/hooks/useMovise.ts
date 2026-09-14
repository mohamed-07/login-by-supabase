import { useQuery } from '@tanstack/react-query';
import { getMostPopularMovies } from '../services/movise.api';

export const usePopularMovies = (page: number) => {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => getMostPopularMovies(page),
  });
};
