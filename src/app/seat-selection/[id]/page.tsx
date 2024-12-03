
import { fetchMovies } from '@/lib/service';  
import DefaultLayout from "@/components/Layouts/DefaultLaout"; 
import SeatSelectionPage from "@/components/Movies/SeatSelectionPage"; 
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "CINEMAGO | Seat Selection",
  description: "Seat Selection",
};
const SeatSelection = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const movies = await fetchMovies(); 
  const movie = movies.find((movie) => movie.id.toString() === id.toString());

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

export async function generateStaticParams() {
  const movies = await fetchMovies();

  return movies.map((movie) => ({
    id: movie.id.toString(),  
  }));
}

export default SeatSelection;
