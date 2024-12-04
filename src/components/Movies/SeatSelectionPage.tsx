"use client"; 

import { ArrowLongLeftIcon, ArrowLongRightIcon, CheckCircleIcon, WalletIcon } from "@heroicons/react/16/solid";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import PaymentMethodModal from "./PaymentModal";
import { useRouter, useSearchParams } from 'next/navigation';
interface SeatSelectionPageProps {
  movie?: string;
}
export interface TransactionDetailsTypes {
  movie: any;
  totalPrice: number;
  selectedSeats: string[];
  paymentMethod: string | null;
  location: string | null;
  date: string | null;
  time: string | null;
}

const SeatSelectionPage = ({ movie }: SeatSelectionPageProps) => {
  const searchParams = useSearchParams();

  const location = searchParams.get('location');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetailsTypes>({
    movie: movie || "",
    totalPrice: 0,
    selectedSeats: [],
    paymentMethod: null,
    location:location,
    date:date,
    time:time
  });
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const totalRows = 10; // Total rows per seat section
  const totalSeatsPerRow = 10; // Total seats per row
  const seatPrice = 40000; // Harga tetap untuk setiap kursi
  const [seats, setSeats] = useState<number[][]>(
    Array.from({ length: totalRows }, () => Array(totalSeatsPerRow).fill(0))
  );
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleSeatClick = (row: number, col: number) => {
    const newSeats = [...seats];
    const seatLabel = `${String.fromCharCode(97 + row).toUpperCase()}${col + 1}`;
  
    if (seats[row][col] === 0) {
      // Seat selected
      newSeats[row][col] = 1;
      setSelectedSeats((prev) => [...prev, seatLabel]);
      setTransactionDetails((prev) => ({
        ...prev,
        selectedSeats: [...prev.selectedSeats, seatLabel],
        totalPrice: prev.totalPrice + seatPrice, // Update totalPrice
      }));
      setTotalPrice((prev) => prev + seatPrice); // Sync totalPrice state
    } else if (seats[row][col] === 1) {
      // Seat deselected
      newSeats[row][col] = 0;
      setSelectedSeats((prev) => prev.filter((seat) => seat !== seatLabel));
      setTransactionDetails((prev) => ({
        ...prev,
        selectedSeats: prev.selectedSeats.filter((seat) => seat !== seatLabel),
        totalPrice: prev.totalPrice - seatPrice, // Update totalPrice
      }));
      setTotalPrice((prev) => prev - seatPrice); // Sync totalPrice state
    }
  
    setSeats(newSeats);
  };
  
  

  return (
    <div className="bg-gray-100 dark:bg-[#040d19] min-h-screen">
      <div className="max-w-6xl mx-auto bg-white dark:bg-[#040d19] dark:text-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          Pilih Kursi Film {movie}
        </h1>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <div className="grid grid-cols-1 gap-4 mb-6">
              {seats.map((_, rowIndex) => (
                <div key={rowIndex} className="flex justify-center space-x-2">
                  {seats[rowIndex].map((_, colIndex) => (
                    <button
                      key={colIndex}
                      className={`text-white w-16 text-xs md:text-lg h-9 md:h-16 rounded-lg 
                        ${seats[rowIndex][colIndex] === 0 && "bg-green-500"} 
                        ${seats[rowIndex][colIndex] === 1 && "bg-blue-500"} 
                        ${seats[rowIndex][colIndex] === 2 && "bg-gray-400"} 
                        ${seats[rowIndex][colIndex] === 0 ? "hover:bg-green-600" : ""} 
                        cursor-pointer`}
                      onClick={() => handleSeatClick(rowIndex, colIndex)}
                      disabled={seats[rowIndex][colIndex] === 2}
                    >
                      {`${String.fromCharCode(97 + rowIndex).toUpperCase()}${colIndex + 1}`}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <div className="mb-6 mx-auto w-full max-w-[700px] bg-gray-700 text-center rounded-[50%/20%] p-3 shadow-lg relative overflow-hidden">
  <span className="text-white font-semibold">Layar</span>
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-800 via-gray-700 to-gray-600 opacity-20 rounded-[50%/20%]"></div>
</div>

            <hr className="my-5" />
            <div className="flex flex-col md:flex-row">
            <div className="w-full md:1/3">
            <div className="flex flex-col space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Kursi Tersedia</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Kursi Terpilih</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">Kursi Terpesan</span>
                  </div>
                </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
              <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
              Ringkasan Pilihan Anda
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex-grow">
                <p className="text-gray-800 dark:text-white">
                  <strong>Film:</strong> {movie}
                </p>
                <p className="text-gray-800 dark:text-white">
                  <strong>Bioskop:</strong> {location}
                </p>
                <p className="text-gray-800 dark:text-white">
                  <strong>Jadwal:</strong>{" "}
                  {date && time
                    ? `${new Date(date).toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}, - ${time}`
                    : "Belum dipilih"}
                </p>
              </div>
           
            </div>
            </div>   
            <hr className="md:hidden block my-3 md:my-0" />     
              <div className="w-full md:w-2/3 flex justify-end flex-col">
                <div className={`${selectedSeats.length > 0 ? "mb-1" : "mb-4"} flex flex-row justify-between`}>
                  <span className="text-md md:text-lg font-bold text-gray-800 dark:text-white">Total Kursi: </span>
                  <span className="text-xl text-secondary font-bold">{selectedSeats.length}</span>
                </div>
                {selectedSeats.length > 0 && (
                  <>
                    <span className="text-gray-700 text-right dark:text-white">
                      [{selectedSeats.map((seat) => seat.toUpperCase()).join(", ")}]
                    </span>
                    <hr className="my-3" />
                    <div className="flex flex-row justify-between mb-4">
                      <p className="text-gray-800 dark:text-white font-bold text-md md:text-lg mt-2">Total Harga:</p>
                      <span className="text-primary text-xl font-extrabold mt-2">Rp {totalPrice.toLocaleString("id-ID")}</span>
                    </div>
                    <hr className="mb-4" />
                  </>
                )}
                <button
                disabled={selectedSeats.length < 1}
                onClick={openModal}
                  className="bg-secondary font-bold flex flex-row justify-between disabled:bg-gray-4 text-white py-2 px-6 rounded-md hover:bg-opacity-90"
                >
                  <span className="flex flex-row space-x-3">
                    <CreditCardIcon className="w-5 mr-4"/>
                  Lanjutkan ke Pembayaran
                  </span>
                  <ArrowLongRightIcon className="w-5"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentMethodModal
        isOpen={isModalOpen}
        onClose={closeModal}
        transactionDetails={transactionDetails}
      />
    </div>
  );
};

export default SeatSelectionPage;
