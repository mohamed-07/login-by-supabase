import { Check, Info, Plus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { backdropSrcSet, backdropUrl } from '../lib/tmdbImage';
import type { HeroItem } from '../types/hero.type';

export interface HeroSlideProps {
  item: HeroItem;
  /** Zero-based position, used for the "3 of 5" label and image priority. */
  index: number;
  total: number;
  /** Off-screen slides are hidden from assistive tech and taken out of the tab order. */
  isActive: boolean;
  isInList: boolean;
  onAddToList?: (item: HeroItem) => void;
}

export function HeroSlide({
  item,
  index,
  total,
  isActive,
  isInList,
  onAddToList,
}: HeroSlideProps) {
  return (
    <article
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
      aria-hidden={!isActive}
      className="relative h-full w-full"
    >
      <img
        src={backdropUrl(item.backdropPath, 'w1280')}
        srcSet={backdropSrcSet(item.backdropPath)}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        /* The first slide is the LCP element; the rest can wait. */
        loading={index === 0 ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />

      {/* Two gradients rather than one: the vertical pass blends the banner
          into the MovieRow carousels below it, the horizontal pass buys
          contrast for the copy without dimming the whole still. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-obsidian-950 via-obsidian-950/70 to-transparent"
      />

      <div className="relative flex h-full items-end pb-24 sm:items-center sm:pb-16">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-14">
          <div className="max-w-xl space-y-4 sm:space-y-5">
            <h2 className="text-3xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
              {item.title}
            </h2>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              {item.rating !== null && (
                <Badge className="gap-1 border-transparent bg-amber-400 font-semibold text-amber-950 hover:bg-amber-400">
                  <Star
                    className="h-3.5 w-3.5 fill-current"
                    aria-hidden="true"
                  />
                  {item.rating.toFixed(1)}
                  <span className="sr-only">out of 10</span>
                </Badge>
              )}

              {item.year && (
                <span className="font-medium text-white/85">{item.year}</span>
              )}

              <Badge
                variant="outline"
                className="border-white/25 font-medium text-white/70"
              >
                {item.mediaType === 'tv' ? 'Series' : 'Film'}
              </Badge>

              {item.genres.length > 0 && (
                <>
                  <span aria-hidden="true" className="h-4 w-px bg-white/25" />
                  <span className="text-white/70">
                    {item.genres.join(' / ')}
                  </span>
                </>
              )}
            </div>

            <p className="line-clamp-3 text-sm leading-relaxed text-white/75 sm:text-base">
              {item.overview}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  size="lg"
                  tabIndex={isActive ? undefined : -1}
                  className="whitespace-nowrap bg-white text-obsidian-950 hover:bg-white/85 focus-visible:ring-signal-500 hover:cursor-pointer"
                >
                  <Link
                    to={item.detailsHref}
                    className="flex items-center gap-2"
                  >
                    <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>View details</span>
                    <span className="sr-only"> for {item.title}</span>
                  </Link>
                </Button>
              </div>

              {/* Neutral at rest; turns Signal Red on hover/focus so the
                  brand accent marks the one "collection" action in the banner. */}
              <Button
                type="button"
                size="lg"
                variant="outline"
                tabIndex={isActive ? undefined : -1}
                aria-pressed={isInList}
                onClick={() => onAddToList?.(item)}
                className="border-white/25 bg-white/10 text-white backdrop-blur-sm hover:border-signal-600 hover:bg-signal-600 hover:text-white focus-visible:ring-signal-500 hover:cursor-pointer"
              >
                {isInList ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Plus className="h-4 w-4" aria-hidden="true" />
                )}
                {isInList ? 'In my list' : 'Add to my list'}
                <span className="sr-only"> — {item.title}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
