
import { tmdbClient } from '@/lib/tmdbClient';
import type { MoviesResponse } from '../types/movise.type';


export const getMostPopularMovies = async (page: number): Promise<MoviesResponse> => {
  const response = await tmdbClient.get('/movie/popular', {
    params: {
      language: 'en-US',
      page,
    },
  });
  console.log('from movise APi');
  return response.data;
};
