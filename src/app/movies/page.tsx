import { fetchMovies } from '@/lib/service';  
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout"; // Corrected typo: DefaultLaout -> DefaultLayout
import MovieCard from "@/components/Movies/MoviesCard";

// Define Movie interface for better type safety
export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  description: string;
  releaseDate: string;
}

// Async function for page component
const MoviesPage = async () => {
  const movies: Movie[] = await fetchMovies();  // Explicitly type the fetched movies array

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Daftar Film" />

        <div className="min-h-screen bg-gray-100 dark:bg-[#040d19]">
          <div className="container mx-auto py-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />  // Type is inferred from Movie interface
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MoviesPage;
