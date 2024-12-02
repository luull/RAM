// app/seatselection/[id].tsx

import { GetStaticPaths, GetStaticProps } from "next";
import SeatSelectionPage from "@/components/Movies/SeatSelectionPage";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

// Define the `generateStaticParams` method
export async function generateStaticParams() {
  // Fetch all movie ids (or provide them manually if static)
  const movieIds = await fetchMovieIds(); // Assuming you fetch movie ids from an API or database

  // Return the paths for each movie id
  return movieIds.map((id) => ({
    params: { id: id.toString() },
  }));
}

// Fetching movie ids (example)
async function fetchMovieIds() {
  // Replace this with your actual API call or static list of movie ids
  return [1, 2, 3, 4]; // Just example movie ids
}

const SeatSelection = ({ movieId }: { movieId: string }) => {
  return (
    <DefaultLayout>
      <SeatSelectionPage movieId={movieId} />
    </DefaultLayout>
  );
};

export default SeatSelection;
