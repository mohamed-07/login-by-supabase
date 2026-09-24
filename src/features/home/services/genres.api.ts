import { tmdbClient } from '@/lib/tmdbClient';

export interface Genre {
  id: number;
  name: string;
}

interface GenreListResponse {
  genres: Genre[];
}

export interface GenreMaps {
  movie: Map<number, string>;
  tv: Map<number, string>;
}

export const getGenreMaps = async (): Promise<GenreMaps> => {
  const [movie, tv] = await Promise.all([
    tmdbClient.get<GenreListResponse>('/genre/movie/list', {
      params: { language: 'en-US' },
    }),
    tmdbClient.get<GenreListResponse>('/genre/tv/list', {
      params: { language: 'en-US' },
    }),
  ]);

  return {
    movie: new Map(movie.data.genres.map((g) => [g.id, g.name])),
    tv: new Map(tv.data.genres.map((g) => [g.id, g.name])),
  };
};
