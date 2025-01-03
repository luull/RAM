'use client'
import useLocalStorage from "@/hooks/useLocalStorage";
import { BRAND } from "@/types/brand";
import { ProductCart } from "@/types/products";
import { prefix } from "@/utils/prefix";
import Image from "next/image";

const TableOne = () => {
  const [dataTransaction] = useLocalStorage<ProductCart[]>("transaction", []);
  const today = new Date();
  const transactionDate = today.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      {/* <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Top Channels
      </h4> */}

      <div className="flex flex-col">
        <div className="grid grid-cols-3 sm:grid-cols-5">
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Produk
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Quantity
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Harga
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Tanggal Transaksi
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
        </div>

        {dataTransaction.map((item, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === dataTransaction.length - 1
                ? ""
                : "border-b border-stroke dark:border-dark-3"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3.5 px-2 py-4">
              <div className="flex-shrink-0">
                <Image src={prefix+item.image} alt="Brand" width={48} height={48} />
              </div>
              <p className="hidden font-medium text-dark dark:text-white sm:block">
                {item.name} - {item.packaging}
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {item.quantity}
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-green-light-1">
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.price)}
              </p>
            </div>

            <div className="hidden items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark dark:text-white">
                {transactionDate}
              </p>
            </div>

            <div className="hidden items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark dark:text-white">
                {item.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
