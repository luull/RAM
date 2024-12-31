import useLocalStorage from '@/hooks/useLocalStorage';
import { ProductCart } from '@/types/products';
import { prefix } from '@/utils/prefix';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Barcode from 'react-barcode';

interface ReceiptProps {
  data: ProductCart[];
  barcodeValue: number;
}

const Receipt = ({
  data,
  barcodeValue,
}: ReceiptProps) => {
  const [setCart] = useLocalStorage<ProductCart[]>("cart", []);
  const totalPrice = data.reduce((total, item) => total + item.price * item.quantity, 0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get('paymentMethod');
  const virtualCode = searchParams.get('virtualCode');

  // Get today's date in a readable format
  const today = new Date();
  const transactionDate = today.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md mx-auto border-2 border-dashed border-gray-300">
      <div className="flex flex-col items-center mb-6">
        <Image 
          src={`${prefix}/images/logo/RAM-dark.png`}
          width={276}
          height={32}
          alt="Company Logo"
          className="h-32 w-auto mb-2"
        />
        <p className="text-md font-bold text-gray-600 dark:text-gray-400 mb-0">RAM</p>
        <p className="text-sm font-bold text-gray-600 dark:text-gray-400">HERBS & SPICES</p>
        <p className="text-xs w-64 text-center text-gray-600 dark:text-gray-400">
          Jl. Nangka Raya No.58 C, RT.7/RW.5, Tj. Bar., Kec. Jagakarsa, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12530
        </p>
      </div>
      <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">
        Ringkasan Transaksi
      </h2>

      <hr className="my-4 border-t-2 border-dashed border-gray-300" />
      <div className="space-y-4 mt-5">
        <div className="flex justify-between">
          <span className="font-bold">Tanggal Transaksi</span>
          <p className="font-normal">{transactionDate}</p>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Metode Pembayaran</span>
          <p className="font-normal">{paymentMethod}</p>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Nomor Transaksi</span>
          <p className="font-normal">{virtualCode}</p>
        </div>
        <hr className="my-4 border-t-2 border-dashed border-gray-300" />
        {data.map((item, index) => (
          <div key={index} className="flex justify-between mb-0">
            <span className="font-normal">{item.name} ({item.packaging})</span>
            <p className="font-normal mb-0">
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.price * item.quantity)}
            </p>
          </div>
        ))}
        <div className="flex justify-between">
          <span className="font-bold">Total Harga</span>
          <p className="font-bold text-lg">
            Rp {Number(totalPrice)?.toLocaleString("id-ID")}
          </p>
        </div>
       
      </div>
      <hr className="my-4 border-t-2 border-dashed border-gray-300" />
      <div className="flex flex-col items-center">
        {/* Tambahkan barcode */}
        {barcodeValue && (
          <Barcode
            value={barcodeValue.toString()}
            width={2}
            height={50}
            displayValue={false}
            background="#fff"
            lineColor="#000"
          />
        )}
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{barcodeValue}</p>
      </div>
    </div>
  );
};

export default Receipt;
