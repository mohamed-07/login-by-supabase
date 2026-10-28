import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useTrendingAll } from '../hooks/useTrending';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const TrendingCarousel = () => {
  const { data, isLoading, isError } = useTrendingAll(1);

  // console.log('TrendingCarousel data From trendingCarousel:', data);
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
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {items.map((item) => {
          const detailItem =
            item.media_type === 'person' ? item.known_for?.[0] : item;

          return (
            <CarouselItem
              key={`${item.media_type}-${item.id}`}
              className="basis-1/2 cursor-pointer sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <Link
                to={
                  detailItem
                    ? `/details/${detailItem.media_type}/${detailItem.id}`
                    : '#'
                }
                aria-disabled={!detailItem}
                tabIndex={detailItem ? undefined : -1}
                onClick={(event) => {
                  if (!detailItem) event.preventDefault();
                }}
                className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
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
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <CarouselPrevious className="cursor-pointer" />
      <CarouselNext className="cursor-pointer" />
    </Carousel>
  );
};
