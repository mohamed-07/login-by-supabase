import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';

import { useTrendingAll } from '../hooks/useTrending';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const TrendingCarousel = () => {
  const { data, isLoading, isError } = useTrendingAll(1);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  const items = data?.results?.slice(0, 20) ?? [];

  return (
    <Carousel
      opts={{
        align: 'start',
        dragFree: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem
            key={item.id}
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 cursor-pointer"
          >
            <div className="group">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={
                    item.media_type === 'person'
                      ? item.profile_path
                        ? `${IMAGE_BASE_URL}${item.profile_path}`
                        : '/placeholder.jpg'
                      : item.poster_path
                        ? `${IMAGE_BASE_URL}${item.poster_path}`
                        : '/placeholder.jpg'
                  }
                  alt={item.media_type === 'movie' ? item.title : item.name}
                  loading="lazy"
                  className="aspect-2/3 w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/75 px-2 py-1 text-xs font-semibold text-white">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {item.media_type === 'person'
                    ? 'N/A'
                    : item.vote_average.toFixed(1)}
                </div>
              </div>
              <p className="mt-1 truncate text-sm font-medium text-center">
                {item.media_type === 'movie' ? item.title : item.name}
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className='cursor-pointer' />
      <CarouselNext className='cursor-pointer' />
    </Carousel>
  );
};
