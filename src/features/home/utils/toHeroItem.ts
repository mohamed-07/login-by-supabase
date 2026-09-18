import type { GenreMaps } from '../services/genres.api';
import type { HeroItem } from '../types/hero.type';
import type {
  Trending,
  TrendingMovie,
  TrendingTVShow,
} from '../types/trending.type';

/** A trending entry that can actually fill a full-bleed banner. */
export type BannerSource = (TrendingMovie | TrendingTVShow) & {
  backdrop_path: string;
};

/**
 * Type guard, not a plain filter callback: it drops `TrendingPerson` (which
 * `/trending/all` always mixes in) and any title without a backdrop, and tells
 * TypeScript both facts — so `toHeroItem` below never has to re-check either.
 */
export function canFillBanner(item: Trending): item is BannerSource {
  return item.media_type !== 'person' && item.backdrop_path !== null;
}

export function toHeroItem(item: BannerSource, genres: GenreMaps): HeroItem {
  // Compared inline rather than via an `isMovie` boolean — narrowing a
  // discriminated union only flows through the comparison itself.
  const title = item.media_type === 'movie' ? item.title : item.name;
  const releasedOn =
    item.media_type === 'movie' ? item.release_date : item.first_air_date;
  const lookup = genres[item.media_type];

  return {
    id: item.id,
    mediaType: item.media_type,
    title: title || 'Untitled',
    overview:
      item.overview?.trim() || 'No overview has been added for this title yet.',
    backdropPath: item.backdrop_path,
    year: releasedOn ? releasedOn.slice(0, 4) : null,
    // TMDB returns 0 for unrated titles; showing "0.0" would misread as awful.
    rating: item.vote_average > 0 ? Number(item.vote_average.toFixed(1)) : null,
    genres: item.genre_ids
      .map((id) => lookup.get(id))
      .filter((name): name is string => Boolean(name))
      .slice(0, 3),
    detailsHref: `/${item.media_type}/${item.id}`,
  };
}
