import { useState } from 'react'
import { useTvShows } from '../hooks/useTvShows'; // useTvShows
import { TvShowsGrid } from '../components/TvShowsGrid';
import { TvShowsGridSkeleton } from '../components/TvShowsGridSkeleton';
import type { TvShowCategory } from '../types/tvShowCategory.type';
import { Button } from '@/components/ui/button';

export default function TvShowsPage() {
  const [category, setCategory] = useState<TvShowCategory>('popular');
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useTvShows(category, page); // useTvShows
  // category Buttons
  const categories: {
    label: string;
    value: TvShowCategory;
  }[] = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'On The Air', value: 'on_the_air' },
    { label: 'Airing Today', value: 'airing_today' },
  ];
  // handle category change
  const handleCategoryChange = (newCategory: TvShowCategory) => {
    setCategory(newCategory);
    setPage(1); // Reset to the first page when changing category
  };

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        {/* <h1 className="mb-6 text-3xl font-bold text-red-500"> TV Shows</h1> */}
        <TvShowsGridSkeleton />
      </main>
    );
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-red-500"> TV Shows</h1>
      {/* Category Buttons */}
      <div className="flex flex-wrap gap-3 mb-3 ">
        {categories.map((item) => (
          <Button
            className="hover:cursor-pointer"
            key={item.value}
            variant={category === item.value ? 'default' : 'outline'}
            onClick={() => handleCategoryChange(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-sm">
        <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
        <span className="text-muted-foreground">Category</span>
        <span className="font-semibold text-foreground">
          {categories.find((item) => item.value === category)?.label}
        </span>
      </div>
      {/* TV Shows Grid */}
      <TvShowsGrid tvShows={data.results} />

      <div className="mt-8 flex justify-center gap-4 ">
        <button
          className="hover:cursor-pointer"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span>
          {page} ... {data.total_pages}
        </span>

        <button
          className="hover:cursor-pointer"
          disabled={page >= data.total_pages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </main>
  );
}