import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SeatSelectionPage from "@/components/Movies/SeatSelectionPage";
import { fetchMovies } from "@/lib/service";
import CinemaLocationPage from "@/components/Movies/CinemaLocationPage";

export const metadata: Metadata = {
  title: "CINEMAGO | Cinema Location",
  description: "Choose your location for the movie.",
};

export async function generateStaticParams() {
  const movies = await fetchMovies();

  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
}

const CinemaLocationPageComponent: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const { id } = params;

  const movies = await fetchMovies();
  const movie = movies.find((movie) => movie.id.toString() === id.toString());

  if (!movie) {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Cinema Location" />
        <p className="text-center text-lg mt-8">Film tidak ditemukan.</p>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Cinema Location`}/>
      <div className="mx-auto max-w-7xl">
        <CinemaLocationPage movie={movie} />
      </div>
    </DefaultLayout>
  );
};

export default CinemaLocationPageComponent;
