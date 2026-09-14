import type { Movie } from '../types/movise.type';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg bg-card cursor-pointer shadow-md transition-shadow duration-300 hover:shadow-lg">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/placeholder-movie.jpg'
        }
              alt={movie.title}
              loading='lazy'
        className="aspect-2/3 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="p-3">
        <h2 className="line-clamp-1 font-semibold">{movie.title}</h2>

        <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>{movie.release_date?.slice(0, 4)}</span>
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}
