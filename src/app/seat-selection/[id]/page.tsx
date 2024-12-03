import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SeatSelectionPage from "@/components/Movies/SeatSelectionPage";
import { fetchMovies } from "@/lib/service";

export const metadata: Metadata = {
  title: "CINEMAGO | Seat Selection",
  description: "Choose your seat for the movie.",
};

const SeatSelectionPageComponent: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const { id } = params;

  const movies = await fetchMovies();
  const movie = movies.find((movie) => movie.id.toString() === id.toString());

  if (!movie) {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Seat Selection" />
        <p className="text-center text-lg mt-8">Film tidak ditemukan.</p>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Seat Selection - ${movie.title}`} />
      <div className="mx-auto max-w-7xl">
        <SeatSelectionPage movie={movie.title} />
      </div>
    </DefaultLayout>
  );
};

export default SeatSelectionPageComponent;
