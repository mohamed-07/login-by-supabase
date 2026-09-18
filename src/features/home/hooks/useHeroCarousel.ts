import { useCallback, useEffect, useState } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';
import type Autoplay from 'embla-carousel-autoplay';

type AutoplayPlugin = ReturnType<typeof Autoplay>;

interface UseHeroCarouselOptions {
  api: CarouselApi | undefined;
  autoplay: AutoplayPlugin;
  disabled: boolean;
}

interface UseHeroCarouselResult {
  activeIndex: number;
  isPlaying: boolean;
  goTo: (index: number) => void;
  togglePlay: () => void;
}

export function useHeroCarousel({api,autoplay,disabled,}: UseHeroCarouselOptions): UseHeroCarouselResult {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(() => !disabled);
  useEffect(() => {
    if (!api) return;
    const handleSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };
    api.on('select', handleSelect);
    return () => {
      api.off('select', handleSelect);
    };
  }, [api]);
  useEffect(() => {
    if (!disabled) return;
    autoplay.stop();
  }, [disabled, autoplay]);
  const goTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );
  const togglePlay = useCallback(() => {
    if (disabled) return;
    if (autoplay.isPlaying()) {
      autoplay.stop();
      setIsPlaying(false);
    } else {
      autoplay.play();
      setIsPlaying(true);
    }
  }, [autoplay, disabled]);
  return { activeIndex, isPlaying, goTo, togglePlay };
}
