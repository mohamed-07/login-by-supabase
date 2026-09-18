import { tmdbClient } from '@/lib/tmdbClient';

/**
 * NOTE: you mentioned you already cache genres with `staleTime: Infinity`
 * elsewhere. If that service exists, delete this file and point
 * `useGenreMaps` at it — the only thing the banner needs is the `GenreMaps`
 * shape below.
 */

export interface Genre {
  id: number;
  name: string;
}

interface GenreListResponse {
  genres: Genre[];
}

/**
 * TMDB keeps separate genre lists for movies and TV, and a few IDs mean
 * different things in each (10759 is TV-only "Action & Adventure", for
 * example), so the lookup is keyed by media type instead of merged.
 */
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
