import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getGenreMaps, type GenreMaps } from '../services/genres.api';
import type { HeroItem } from '../types/hero.type';
import { canFillBanner, toHeroItem } from '../utils/toHeroItem';
import { useTrendingAll } from './useTrending';

const EMPTY_GENRES: GenreMaps = { movie: new Map(), tv: new Map() };

export function useGenreMaps() {
  return useQuery({
    queryKey: ['genres', 'all'],
    queryFn: getGenreMaps,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

interface UseHeroItemsResult {
  items: HeroItem[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

/**
 * Adapts your existing `useTrendingAll` into banner-ready items.
 *
 * The genre list is a second query on purpose rather than a chained fetch:
 * it's effectively static, so it's cached forever and shared with every other
 * feature that needs genre names, while trending keeps its own stale window.
 */
export function useHeroItems(limit = 5): UseHeroItemsResult {
  const trending = useTrendingAll(1);
  const genres = useGenreMaps();

  const items = useMemo<HeroItem[]>(() => {
    if (!trending.data) return [];

    // Genres failing alone shouldn't blank the banner — the title just loses
    // its genre line instead of the whole hero disappearing.
    const genreMaps = genres.data ?? EMPTY_GENRES;

    return trending.data.results
      .filter(canFillBanner)
      .slice(0, limit)
      .map((item) => toHeroItem(item, genreMaps));
  }, [trending.data, genres.data, limit]);

  return {
    items,
    // Only trending gates the skeleton; genres arriving a beat later just
    // fills in the genre line.
    isLoading: trending.isLoading,
    isError: trending.isError,
    refetch: () => {
      void trending.refetch();
      if (genres.isError) void genres.refetch();
    },
  };
}
