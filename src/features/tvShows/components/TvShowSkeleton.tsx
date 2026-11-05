import { Skeleton } from '@/components/ui/skeleton';

export function TvShowSkeleton() {
  return (
    <article className="overflow-hidden rounded-lg">
      <Skeleton className="aspect-2/3 w-full" />

      <div className="mt-2 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-14" />
      </div>
    </article>
  );
}
