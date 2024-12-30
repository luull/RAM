
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TransactionSummary from "@/components/Products/TransactionSummary";
import SuccessPayment from "@/components/Products/SuccessPaymentPage";
import DetailTicket from "@/components/Products/DetailTicket";
import { fetchMovies } from "@/lib/service";

export const metadata: Metadata = {
  title: "RAM | Detail Ticket",
  description: "Detail Ticket",
};

export async function generateStaticParams() {
    const movies = await fetchMovies();
  
    return movies.map((movie) => ({
      id: movie.id.toString(),
    }));
  }
  
const DetailTicketPage: React.FC = async() => {
    
  const movies = await fetchMovies();
    
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Ticket" />
      <DetailTicket movies={movies}/>
    </DefaultLayout>
  );
};

export default DetailTicketPage;
