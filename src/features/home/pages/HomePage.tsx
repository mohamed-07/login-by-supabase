// import { useAuthStore } from '../../auth/store/authStore';
import HeroBanner from '../componnets/HeroBanner';
import { TrendingCarousel } from '../componnets/TrendingCarousel';
import { Link } from 'react-router-dom';

export function HomePage() {
  // const { user } = useAuthStore();

  return (
    <div className="flex flex-col gap-8">
      <HeroBanner />
      <section className="container mx-auto px-4 pb-12 sm:px-8 lg:px-14">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trending</h2>
          <Link
            to="/trending"
            className="text-sm font-medium text-primary hover:underline"
          >
            See all
          </Link>
        </div>
        <TrendingCarousel />
      </section>
    </div>
  );
}
