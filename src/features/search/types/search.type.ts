interface SearchBase {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  poster_path: string | null;
  original_language: string;
  overview: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
}

export interface SearchMovie extends SearchBase {
  media_type: 'movie';
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

export interface SearchTVShow extends SearchBase {
  media_type: 'tv';
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}
// we dont need to include it now
export interface SearchPerson {
  id: number;
  name: string;
  original_name: string;
  media_type: 'person';
  adult: boolean;
  gender: number;
  popularity: number;
  known_for_department: string;
  profile_path: string | null;
  known_for: Array<SearchMovie | SearchTVShow>;
}

export type SearchResult = SearchMovie | SearchTVShow | SearchPerson;

export interface MultiSearchResponse {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
}
