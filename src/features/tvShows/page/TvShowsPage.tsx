import { useState } from 'react'
import { usePopularTvShows } from '../hooks/usePopularTvShows';
import { TvShowsGrid } from '../components/TvShowsgrid';
import { TvShowsGridSkeleton } from '../components/TvShowsGridSkeleton';

export default function TvShows() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = usePopularTvShows(page);
  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Popular TV Shows</h1>
        <TvShowsGridSkeleton />
      </main>
    );
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  if (!data) {
    return null;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Popular TV Shows</h1>

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