import { useState } from 'react';
import { Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useTrendingAll } from '../hooks/useTrending';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export function Trending() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useTrendingAll(page);

  if (isLoading) {
    return <TrendingSkeleton />;
  }

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  if (!data) {
    return null;
  }

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const items = data?.results ?? [];

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {items.map((item) => {
          const name = item.media_type === 'movie' ? item.title : item.name;
          const imagePath =
            item.media_type === 'person' ? item.profile_path : item.poster_path;

          return (
            <article key={`${item.media_type}-${item.id}`} className="group">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={
                    imagePath
                      ? `${IMAGE_BASE_URL}${imagePath}`
                      : '/placeholder.jpg'
                  }
                  alt={name}
                  loading="lazy"
                  className=" cursor-pointer aspect-2/3 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-1 top-1 flex items-start justify-between gap-1">
                  <div
                    className={`text-[10px] font-semibold ${
                      item.media_type === 'tv'
                        ? 'text-green-600'
                        : item.media_type === 'movie'
                          ? 'text-red-600'
                          : 'text-muted-foreground'
                    }`}
                  >
                    {item.media_type === 'movie'
                      ? 'Movie'
                      : item.media_type === 'tv'
                        ? 'TV'
                        : 'Person'}
                  </div>
                  <div className="flex shrink-0 items-center gap-1 rounded-md bg-black/75 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {item.media_type === 'person'
                      ? 'N/A'
                      : item.vote_average.toFixed(1)}
                  </div>
                </div>
              </div>
              <p className="mt-2 truncate text-center text-sm font-medium">
                {name}
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <Button
          className=" cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
          variant="outline"
          disabled={page === 1 || isLoading}
          onClick={() => changePage(page - 1)}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {data.page} of {data.total_pages}
        </span>
        <Button
          className=" cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
          variant="outline"
          disabled={page === data.total_pages || isLoading}
          onClick={() => changePage(page + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
}

function TrendingSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index}>
          <Skeleton className="aspect-2/3 w-full rounded-lg" />
          <Skeleton className="mx-auto mt-2 h-4 w-3/4" />
        </div>
      ))}
    </div>
  );
}
