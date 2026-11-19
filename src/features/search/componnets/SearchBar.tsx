import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useSearchMulti } from '../hooks/useSearchMulti';
import { Link, useLocation } from 'react-router-dom';

export default function SearchBar() {
  const location = useLocation();
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null); //
  const debouncedText = useDebounce(text, 1000); // wait 1000ms after typing stops
  const hasQuery = debouncedText.trim().length >= 3; // only search if query is at least 3 characters

  const { data, isLoading, isError } = useSearchMulti(
    1,
    debouncedText
  );
  console.log('Search results:', data);
  const results = data?.results.filter(
    (item) => item.media_type === 'movie' || item.media_type === 'tv'
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const closeAndReset = () => {
    setOpen(false);
    setText('');
  };

  const showDropdown = open && text.trim().length >= 3 && hasQuery;

  return (
    <div ref={wrapperRef} className="relative">
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search movies & TV shows..."
        className="w-full rounded-md bg-neutral-900 px-4 py-2 text-white"
      />
      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg">
          {/* (2) الرسائل صارت داخل القائمة */}
          {isLoading && (
            <p className="p-2 text-sm text-muted-foreground">Loading...</p>
          )}
          {isError && (
            <p className="p-2 text-sm text-destructive">
              Something went wrong.
            </p>
          )}
          {!isLoading && !isError && results?.length === 0 && (
            <p className="p-2 text-sm text-muted-foreground">
              No results found.
            </p>
          )}
          {/* ********** */}
          {results && results.length > 0 && (
            <ul className="">
              {results.map((item) => {
                const title = item.media_type === 'movie' ? item.title : item.name;
                const date = item.media_type === 'movie'
                    ? item.release_date
                    : item.first_air_date;
                const type = item.media_type === 'movie' ? 'Movie' : 'TV show';
                const path = item.media_type === 'movie'
                    ? `/details/movie/${item.id}`
                    : `/details/tv/${item.id}`;
                return (
                  <li key={`${item.media_type}-${item.id}`}>
                    <Link
                      to={path}
                      state={{
                        from: `${location.pathname}${location.search}${location.hash}`,
                      }}
                      onClick={closeAndReset}
                      className="flex items-center gap-3 rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                          alt=""
                          className="h-14 w-10 shrink-0 rounded object-cover"
                        />
                      ) : (
                        <div aria-hidden="true" className="h-14 w-10 shrink-0 rounded bg-muted"/>
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{title}</p>
                        <p className="text-xs text-muted-foreground">
                          {type} ·{' '}
                          {date ? date.slice(0, 4) : 'Year unavailable'}
                        </p>
                      </div>

                      {item.vote_average > 0 && (
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {item.vote_average.toFixed(1)}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
