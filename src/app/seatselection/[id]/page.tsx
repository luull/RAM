"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import SeatSelectionPage from "@/components/Movies/SetSelectionPage";
import { LayoutRouter } from "next/dist/server/app-render/entry-base";
import { useParams } from 'next/navigation';

const SeatSelection = () => {
  const { id } = useParams();
  if (!id) {
    return <p>Film tidak ditemukan.</p>; 
  }
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Daftar Film" />
      <h1 className="text-3xl font-semibold text-center mb-6">
      </h1>
      <SeatSelectionPage movieId={id as string} /> 
      </div>
    </DefaultLayout>
 
  );
};

export default SeatSelection;
