import Barcode from 'react-barcode';

interface ReceiptProps {
    title: string | null; 
    location: string | null;
    date: string | null;
    time: string | null;
    seatNumber: string | null; 
    totalPrice: string | null;
    barcodeValue: number;
  }
  
const Receipt = ({
  title,
  location,
  date,
  time,
  seatNumber,
  totalPrice,
  barcodeValue
}:ReceiptProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md mx-auto border-2 border-dashed border-gray-300">
      <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">
        Ringkasan Transaksi
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-normal">Film</span>
          <p className="font-bold">{title}</p>
        </div>
        <div className="flex justify-between">
          <span className="font-normal">Bioskop</span>
          <p className="font-bold">{location}</p>
        </div>
        <div className="flex justify-between">
          <span className="font-normal">Jadwal</span>
          <p className="font-bold">
            {date && time
              ? `${new Date(date).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })} - ${time}`
              : "Belum dipilih"}
          </p>
        </div>
        <div className="flex justify-between">
          <span className="font-normal">Nomor Kursi</span>
          <p className="font-bold">{seatNumber}</p>
        </div>
        <div className="flex justify-between">
          <span className="font-normal">Total Harga</span>
          <p className="font-bold">Rp {Number(totalPrice)?.toLocaleString("id-ID")}</p>
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
