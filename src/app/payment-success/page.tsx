
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TransactionSummary from "@/components/Movies/TransactionSummary";
import SuccessPayment from "@/components/Movies/SuccessPaymentPage";

export const metadata: Metadata = {
  title: "CINEMAGO | Payment Success",
  description: "Payment Success",
};

const PaymentSuccessPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Payment Success" />
      <SuccessPayment/>
    </DefaultLayout>
  );
};

export default PaymentSuccessPage;
