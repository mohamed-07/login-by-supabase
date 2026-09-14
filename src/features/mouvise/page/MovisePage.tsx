import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MovieGrid } from "../commponent/MoviseGrid";
import { usePopularMovies } from "../hooks/useMovise";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieGridSkeleton } from "../commponent/MovieGridSkeleton";

export default function MoviesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = usePopularMovies(page);

  if (isLoading) {
      return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-2">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-72" /> 
      </div>

      <MovieGridSkeleton />
    </main>
  );
  }

  if (isError) {
    return (
      <div>
        <p>Something went wrong.</p>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }
  console.log('DATA:', data);
  console.log('RESULTS:', data.results);
  console.log('IS ARRAY:', Array.isArray(data.results));

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Popular Movies</h1>
        <p className="mt-2 text-muted-foreground">
          Discover popular movies from TMDB.
        </p>
      </div>

      <MovieGrid movies={data.results} />

      <div className="mt-8 flex items-center justify-center gap-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>

        <span>
          Page {data.page} of {data.total_pages}
        </span>

        <Button
          variant="outline"
          disabled={page === data.total_pages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </main>
  );
}