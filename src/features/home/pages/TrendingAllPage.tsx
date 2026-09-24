import { Trending } from '../componnets/Trending';

export default function TrendingAllPage() {
  return (
    <main className="container mx-auto px-4 py-8 sm:px-8 lg:px-14">
      <h1 className="mb-6 text-3xl font-bold">Trending Movies & TV Shows</h1>
      <Trending />
    </main>
  );
}
