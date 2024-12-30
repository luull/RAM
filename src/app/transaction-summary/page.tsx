
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TransactionSummary from "@/components/Products/TransactionSummary";

export const metadata: Metadata = {
  title: "RAM | Transaction Summary",
  description: "Transaction Summary",
};

const TransactionSummaryPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Transaction Summary" />
      <TransactionSummary/>
    </DefaultLayout>
  );
};

export default TransactionSummaryPage;
