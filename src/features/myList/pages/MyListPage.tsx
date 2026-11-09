import { MediaCard } from '@/components/MediaCard';
import { MyListButton } from '../components/MyListButton';
import { useMyList } from '../hooks/useMyList';

export default function MyListPage() {
  const { data, isLoading, isError } = useMyList();

  if (isLoading) return <p className="p-8">Loading...</p>;
  if (isError) return <p className="p-8">Couldn't load your list.</p>;
  if (!data?.length) return <p className="p-8">Your list is empty.</p>;

  return (
    <section className="p-6">
      <h1 className="mb-6 text-2xl font-bold">My List</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {data.map((item) => (
          <MediaCard
            key={item.id}
            to={`/${item.media_type}/${item.media_id}`}
            title={item.title}
            posterPath={item.poster_path}
            rating={item.vote_average}
            action={<MyListButton item={item} />}
          />
        ))}
      </div>
    </section>
  );
}
