import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { useHeroCarousel } from '../hooks/useHeroCarousel';
import { useHeroItems } from '../hooks/useHeroItems';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import type { HeroItem } from '../types/hero.type';
import { HeroSlide } from './HeroSlide';

export interface HeroBannerProps {
  /** How many trending titles to show. */
  count?: number;
  /** IDs already saved to the user's list — drives the button's pressed state. */
  myListIds?: ReadonlySet<number>;
  /** Wire this to your Supabase "my list" mutation. */
  onAddToList?: (item: HeroItem) => void;
}

const SHELL =
  'relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-obsidian-950 sm:h-[80vh] lg:h-[88vh]';

export default function HeroBanner({
  count = 7,
  myListIds,
  onAddToList,
}: HeroBannerProps) {
  const { items, isLoading, isError, refetch } = useHeroItems(count);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [api, setApi] = useState<CarouselApi>();
  // Created once and handed to Embla; the same object is mutated in place
  // with play()/stop()/isPlaying() once the carousel mounts, so this ref is
  // what both Embla and our own controls talk to.
  const [autoplay] = useState(
    Autoplay({
      delay: 8000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    })
  );

  const { activeIndex, isPlaying, goTo, togglePlay } = useHeroCarousel({
    api,
    autoplay,
    disabled: prefersReducedMotion,
  });

  if (isLoading) return <HeroBannerSkeleton />;
  if (isError || items.length === 0)
    return <HeroBannerError onRetry={refetch} />;

  const activeItem = items[activeIndex] ?? items[0];

  return (
    <section aria-label="Trending this week" className={SHELL}>
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[autoplay]}
        className="h-full w-full"
      >
        <CarouselContent className="ml-0 h-full">
          {items.map((item, index) => (
            <CarouselItem
              key={`${item.mediaType}-${item.id}`}
              className="h-full pl-0"
            >
              <HeroSlide
                item={item}
                index={index}
                total={items.length}
                isActive={index === activeIndex}
                isInList={myListIds?.has(item.id) ?? false}
                onAddToList={onAddToList}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows are a pointer affordance — keyboard users get the arrow
            keys (Carousel's own onKeyDownCapture handles those) and the
            dots below. */}
        <CarouselPrevious
          tabIndex={-1}
          aria-hidden="true"
          className="left-3 hidden h-10 w-10 border-white/20 bg-obsidian-950/50 text-white/80 backdrop-blur-sm hover:bg-obsidian-950/80 hover:text-white lg:flex cursor-pointer"
        />
        <CarouselNext
          tabIndex={-1}
          aria-hidden="true"
          className="right-3 hidden h-10 w-10 border-white/20 bg-obsidian-950/50 text-white/80 backdrop-blur-sm hover:bg-obsidian-950/80 hover:text-white lg:flex cursor-pointer"
        />
      </Carousel>

      {/* Announcing every auto-advance would talk over the user, so the live
          region only speaks once autoplay is stopped. */}
      <p aria-live={isPlaying ? 'off' : 'polite'} className="sr-only">
        {`Slide ${activeIndex + 1} of ${items.length}: ${activeItem.title}`}
      </p>

      <div className="pointer-events-none absolute bottom-6 right-4 flex items-center gap-4 sm:right-8 lg:right-14">
        <ol className="pointer-events-auto flex items-center gap-2">
          {items.map((item, index) => {
            const isCurrent = index === activeIndex;
            return (
              <li key={`${item.mediaType}-${item.id}`}>
                <button
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to ${item.title}`}
                  aria-current={isCurrent ? 'true' : undefined}
                  /* Hit area stays 40px tall while the visible bar is 3px. */
                  className="group grid h-10 place-items-center px-0.5 focus-visible:outline-none"
                >
                  <span
                    className={`block h-[3px] rounded-full transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-signal-500 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-obsidian-950 ${
                      isCurrent
                        ? 'w-8 bg-signal-500'
                        : 'w-4 bg-white/40 group-hover:bg-white/70'
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ol>

        {/* WCAG 2.2.2: anything that moves on its own needs a stop control. */}
        <Button
          type="button"
          size="icon"
          variant="secondary"
          onClick={togglePlay}
          disabled={prefersReducedMotion}
          aria-label={
            isPlaying ? 'Pause banner rotation' : 'Resume banner rotation'
          }
          className="pointer-events-auto h-8 w-8 rounded-full bg-obsidian-950/50 text-white/80 ring-1 ring-inset ring-white/20 backdrop-blur-sm hover:bg-obsidian-950/80 hover:text-white focus-visible:ring-signal-500"
        >
          {isPlaying ? (
            <Pause className="h-3.5 w-3.5" />
          ) : (
            <Play className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
    </section>
  );
}

function HeroBannerSkeleton() {
  return (
    <div className={SHELL} role="status" aria-label="Loading trending titles">
      <Skeleton className="absolute inset-0 rounded-none bg-obsidian-900" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 to-transparent" />
      <div className="relative flex h-full items-end pb-24 sm:items-center sm:pb-16">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-14">
          <div className="max-w-xl space-y-5">
            <Skeleton className="h-12 w-3/4 bg-white/10 sm:h-16" />
            <Skeleton className="h-5 w-52 bg-white/10" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-white/10" />
              <Skeleton className="h-4 w-11/12 bg-white/10" />
              <Skeleton className="h-4 w-2/3 bg-white/10" />
            </div>
            <div className="flex gap-3 pt-1">
              <Skeleton className="h-12 w-40 bg-white/10" />
              <Skeleton className="h-12 w-44 bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroBannerError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className={SHELL}>
      <div className="flex h-full items-center">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-14">
          <div className="max-w-md space-y-3 text-left">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Trending titles didn&apos;t load
            </h2>
            <p className="text-sm leading-relaxed text-white/70">
              The connection to TMDB failed. Check your network and try again.
            </p>
            <Button
              type="button"
              onClick={onRetry}
              className="mt-2 bg-signal-600 text-white hover:bg-signal-500 focus-visible:ring-signal-500"
            >
              Try again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
