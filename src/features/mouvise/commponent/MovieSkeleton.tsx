import { Skeleton } from '@/components/ui/skeleton';

export function MovieSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg bg-card">
      {/* Poster */}
      <Skeleton className="aspect-2/3 w-full" />

      {/* Movie information */}
      <div className="space-y-3 p-3">
        {/* Title */}
        <Skeleton className="h-5 w-3/4" />

        {/* Year + rating */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-14" />
        </div>
      </div>
    </div>
  );
}
