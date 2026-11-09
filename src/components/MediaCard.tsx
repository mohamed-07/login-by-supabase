import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
  title: string;
  posterPath: string | null;
  rating?: number | null;
  action?: ReactNode;
}

export function MediaCard({ to, title, posterPath, rating, action }: Props) {
  return (
    <div className="group relative">
      <Link to={to} className="block">
        {posterPath ? (
          <img
            src={`https://image.tmdb.org/t/p/w342${posterPath}`}
            alt={title}
            className="aspect-2/3 w-full rounded-xl object-cover"
          />
        ) : (
          <div className="aspect-2/3 w-full rounded-xl bg-muted" />
        )}
        <p className="mt-2 truncate text-sm">{title}</p>
      </Link>

      {rating ? (
        <span className="absolute right-2 top-2 rounded-lg bg-black/70 px-2 py-1 text-xs text-white">
          ⭐ {rating.toFixed(1)}
        </span>
      ) : null}

      {action && (
        <div className="absolute left-2 top-2 transition-opacity focus-within:opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
          {action}
        </div>
      )}
    </div>
  );
}
