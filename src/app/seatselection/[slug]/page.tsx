// app/seatselection/[slug]/page.tsx
import { fetchMovies } from '@/lib/service'; // Fetch the list of movies
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import SeatSelectionPage from "@/components/Movies/SeatSelectionPage";

const SeatSelection = ({ movieSlug }: { movieSlug: string }) => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <SeatSelectionPage movie={movieSlug} />
      </div>
    </DefaultLayout>
  );
};

export async function generateStaticParams() {
  const movies = await fetchMovies(); // Fetch movies from your API or database

  return movies.map((movie:any) => ({
    slug: movie.id.toString(), // Assuming the movie has an `id` you can use as a slug
  }));
}

export default SeatSelection;
