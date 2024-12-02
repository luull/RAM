// src/app/seatselection/[slug]/page.tsx

import { fetchMovies } from '@/lib/service';  // Fetch movies from your API or database
import DefaultLayout from "@/components/Layouts/DefaultLaout"; // Ensure this is correctly imported
import SeatSelectionPage from "@/components/Movies/SeatSelectionPage"; // Your seat selection component

const SeatSelection = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const movies = await fetchMovies(); // Fetch movies
  const movie = movies.find((movie) => movie.title.toString() === slug);

  if (!movie) {
    return <p>Film tidak ditemukan.</p>;
  }

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <SeatSelectionPage movie={movie.title} />
      </div>
    </DefaultLayout>
  );
};

// This function is used to generate all the paths that should be statically pre-rendered
export async function generateStaticParams() {
  const movies = await fetchMovies(); // Fetch the list of movies

  return movies.map((movie) => ({
    slug: movie.id.toString(),  // Each dynamic route path will be generated with these slugs
  }));
}

export default SeatSelection;
