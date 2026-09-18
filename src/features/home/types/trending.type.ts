export type MediaType = 'movie' | 'tv' | 'person';

export interface TrendingMovie {
  id: number;
  media_type: 'movie';
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  video: boolean;
}

export interface TrendingTVShow {
  id: number;
  media_type: 'tv';
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  original_language: string;
  origin_country: string[];
}

export interface KnownForItem {
  id: number;
  media_type: 'movie' | 'tv';
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  original_language: string;
}

export interface TrendingPerson {
  id: number;
  media_type: 'person';
  name: string;
  original_name: string;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
  adult: boolean;
  gender: number;
  known_for: KnownForItem[];
}

export type Trending = TrendingMovie | TrendingTVShow | TrendingPerson;

export interface TrendingResponse {
  page: number;
  results: Trending[];
  total_pages: number;
  total_results: number;
}
