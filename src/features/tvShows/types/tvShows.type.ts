export interface TvShow {
 id: number;
 name: string;
 overview: string;
 poster_path: string;
 backdrop_path: string;
 first_air_date: string;
 vote_average: number;
 vote_count: number;
}



export interface TvShowResponse {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}
