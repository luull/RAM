"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout"; // Fixed typo: DefaultLaout -> DefaultLayout
import SeatSelectionPage from "@/components/Movies/SeatSelectionPage"; // Fixed typo: SetSelectionPage -> SeatSelectionPage
import { useParams } from 'next/navigation';

const SeatSelection = () => {
  const { id } = useParams<{ id: string }>(); // Adding type for the 'id' parameter

  if (!id) {
    return <p>Film tidak ditemukan.</p>; // Handle case when the id is missing
  }

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Daftar Film" />
        <SeatSelectionPage movieId={id} /> {/* Pass movieId prop to the SeatSelectionPage */}
      </div>
    </DefaultLayout>
  );
};

export default SeatSelection;
