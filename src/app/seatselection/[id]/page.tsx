"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import SeatSelectionPage from "@/components/Movies/SeatSelectionPage";
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
      <SeatSelectionPage movieId={id as string} /> 
      </div>
    </DefaultLayout>
 
  );
};

export default SeatSelection;
