"use client"
import DefaultLayout from "@/components/Layouts/DefaultLaout"; // Fixed typo in 'DefaultLayout'
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Receipt from "@/components/Products/Receipt";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ProductCart } from "@/types/products";


const DetailTicketPage: React.FC = () => {
  const [cart, setCart] = useLocalStorage<ProductCart[]>("cart", []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Bill Transaksi" />
      <Receipt data={cart} barcodeValue={123123123123} />
    </DefaultLayout>
  );
};

export default DetailTicketPage;
