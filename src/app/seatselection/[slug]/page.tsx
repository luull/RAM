"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout"; // Fixed typo: DefaultLaout -> DefaultLayout
import SeatSelectionPage from "@/components/Movies/SeatSelectionPage"; // Fixed typo: SetSelectionPage -> SeatSelectionPage
import { useParams } from 'next/navigation';
import { useRouter } from "next/router";

const SeatSelection = () => {
    const router = useRouter()
  if (!router.query.slug) {
    return <p>Film tidak ditemukan.</p>; // Handle case when the id is missing
  }

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Daftar Film" />
        <SeatSelectionPage movie={router.query.slug as string} /> {/* Pass movieId prop to the SeatSelectionPage */}
      </div>
    </DefaultLayout>
  );
};

export default SeatSelection;
