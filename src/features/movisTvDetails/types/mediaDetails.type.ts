export type MediaType = 'movie' | 'tv';

export interface Genre {
  id: number;
  name: string;
}

export interface MediaDetails {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  tagline?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count?: number;
  original_language?: string;
  genres: Genre[];
  runtime?: number;
  episode_run_time?: number[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  status?: string;
  production_companies?: Array<{
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }>;
  budget?: number;
  revenue?: number;
  seasons?: TvSeason[];
}

export interface MediaVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface MediaVideosResponse {
  results: MediaVideo[];
}

export interface MediaCertification {
  certification: string;
  release_date?: string;
  type?: number;
}

export interface MovieReleaseDatesResponse {
  results: Array<{
    iso_3166_1: string;
    release_dates: MediaCertification[];
  }>;
}

export interface TvContentRatingsResponse {
  results: Array<{
    iso_3166_1: string;
    rating: string;
  }>;
}

export interface RelatedMedia {
  id: number;
  media_type?: MediaType;
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}

export interface RelatedMediaResponse {
  results: RelatedMedia[];
}

export interface TvSeason {
  id: number;
  season_number: number;
  name: string;
  overview: string;
  air_date: string | null;
  episode_count: number;
  poster_path: string | null;
}

export interface TvEpisode {
  id: number;
  episode_number: number;
  name: string;
  overview: string;
  air_date: string | null;
  still_path: string | null;
  vote_average: number;
}

export interface TvSeasonDetails {
  id: number;
  season_number: number;
  name: string;
  overview: string;
  episodes: TvEpisode[];
}
