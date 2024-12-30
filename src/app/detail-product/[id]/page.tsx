import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { PRODUCTS } from "@/const/product";
import DetailProduct from "@/components/Products/DetailProduct";

export const metadata: Metadata = {
  title: "RAM | Detail Produk",
  description: "Choose your location for the movie.",
};

const DetailProductPage: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const { id } = params;

  const products = PRODUCTS.find((items) => items.id.toString() === id.toString());

  if (!products) {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Detail Produk" />
        <p className="text-center text-lg mt-8">Product tidak ditemukan.</p>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Detail Produk ${products.name}`}/>
      <div className="mx-auto max-w-7xl">
        <DetailProduct products={products} />
      </div>
    </DefaultLayout>
  );
};

export default DetailProductPage;
