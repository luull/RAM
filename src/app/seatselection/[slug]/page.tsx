// src/app/seatselection/[slug]/page.tsx

import { fetchMovies } from '@/lib/service'; // Assuming this fetches the list of movies
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import SeatSelectionPage from "@/components/Movies/SeatSelectionPage";

interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  description: string;
  releaseDate: string;
}

interface SeatSelectionProps {
  movieSlug: string;
}

const SeatSelection = ({ movieSlug }: SeatSelectionProps) => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <SeatSelectionPage movie={movieSlug} />
      </div>
    </DefaultLayout>
  );
};

// Fetch and return static params for dynamic routes
export async function generateStaticParams() {
  const movies = await fetchMovies(); // Fetch the movies data
  
  return movies.map((movie: Movie) => ({
    slug: movie.id.toString(), // Assuming movie.id is used as the slug
  }));
}

export default SeatSelection;
