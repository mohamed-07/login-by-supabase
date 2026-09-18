
export interface HeroItem {
  id: number;
  mediaType: 'movie' | 'tv';
  title: string;
  overview: string;
  backdropPath: string;
  /** Four-digit year, or null when TMDB has no date yet. */
  year: string | null;
  /** 0–10, one decimal. Null when the title is unrated. */
  rating: number | null;
  /** Up to three resolved genre names. */
  genres: string[];
  /** Route for the details page, e.g. `/movie/1234`. */
  detailsHref: string;
}
