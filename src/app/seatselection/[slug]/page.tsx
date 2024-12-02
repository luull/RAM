"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout"; 
import SeatSelectionPage from "@/components/Movies/SeatSelectionPage"; 
import { useParams } from 'next/navigation';
import { useRouter } from "next/router";

const SeatSelection = () => {
    const router = useRouter()
  if (!router.query.slug) {
    return <p>Film tidak ditemukan.</p>; 
  }

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Daftar Film" />
        <SeatSelectionPage movie={router.query.slug as string} /> 
      </div>
    </DefaultLayout>
  );
};

export default SeatSelection;
