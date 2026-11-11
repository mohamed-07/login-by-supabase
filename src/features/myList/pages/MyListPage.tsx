import { BookmarkPlus, Clapperboard, Film, TriangleAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MediaCard } from '@/components/MediaCard';
import { Skeleton } from '@/components/ui/skeleton';
import { MyListButton } from '../components/MyListButton';
import { useMyList } from '../hooks/useMyList';

export default function MyListPage() {
  const { data, isLoading, isError } = useMyList();

  return (
    <section className="dark min-h-[calc(100vh-4rem)] bg-background text-foreground">
      <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-8 sm:py-14 lg:px-12">
        <header className="mb-8 border-b border-border pb-6 sm:mb-10 sm:flex sm:items-end sm:justify-between sm:gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Your collection
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              My List
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              The films and series you want to come back to, all in one place.
            </p>
          </div>
          {!isLoading && !isError && data?.length ? (
            <p className="mt-5 shrink-0 text-sm text-muted-foreground sm:mt-0">
              <span className="font-medium text-foreground">{data.length}</span>{' '}
              {data.length === 1 ? 'title saved' : 'titles saved'}
            </p>
          ) : null}
        </header>

        {isLoading ? (
          <MyListSkeleton />
        ) : isError ? (
          <div
            role="alert"
            className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center"
          >
            <TriangleAlert
              aria-hidden="true"
              className="mb-4 size-8 text-muted-foreground"
            />
            <h2 className="text-lg font-medium">Your list didn’t load</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              There was a problem loading your saved titles. Please try again
              in a moment.
            </p>
          </div>
        ) : !data?.length ? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-6 flex size-16 items-center justify-center border border-border bg-card text-muted-foreground">
              <BookmarkPlus aria-hidden="true" className="size-7" />
            </div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Make it yours
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">
              Your next favorite starts here
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              Save movies and series as you browse, and they’ll be waiting for
              you here whenever you’re ready.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/movies"
                className="inline-flex h-10 items-center gap-2 bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Film aria-hidden="true" className="size-4" />
                Browse movies
              </Link>
              <Link
                to="/tv-shows"
                className="inline-flex h-10 items-center gap-2 border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Clapperboard aria-hidden="true" className="size-4" />
                Explore TV shows
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-10 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {data.map((item) => (
              <MediaCard
                key={item.id}
                to={`/details/${item.media_type}/${item.media_id}`}
                title={item.title}
                posterPath={item.poster_path}
                rating={item.vote_average}
                mediaType={item.media_type}
                action={
                  <MyListButton
                    item={item}
                    className="size-9 rounded-md border border-white/15 bg-black/75 text-white backdrop-blur transition-colors hover:bg-white hover:text-black hover:cursor-pointer"
                  />
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function MyListSkeleton() {
  return (
    <div
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-10 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
      aria-busy="true"
      aria-label="Loading your list"
    >
      {Array.from({ length: 12 }, (_, index) => (
        <div key={index}>
          <Skeleton className="aspect-2/3 w-full rounded-md bg-muted" />
          <Skeleton className="mt-3 h-4 w-4/5 bg-muted" />
          <Skeleton className="mt-2 h-3 w-2/5 bg-muted" />
        </div>
      ))}
    </div>
  );
}
