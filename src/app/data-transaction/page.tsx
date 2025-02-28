import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "RAM | Data Transaksi",
  description: "Info Status dan Data Transaksi",
};

const DataTransaction = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Data Transaksi" />

      <div className="flex flex-col gap-10">
        {/* <TableOne /> */}
         {/* <TableTwo /> */}
        <TableThree /> 
      </div>
    </DefaultLayout>
  );
};

export default DataTransaction;
