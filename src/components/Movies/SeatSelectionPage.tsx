"use client"; // Ensure this is client-side

import { useState } from "react";

interface SeatSelectionPageProps {
  movie?: string;
}

const SeatSelectionPage = ({ movie }: SeatSelectionPageProps) => {
  const totalRows = 10; // Total rows per seat section
  const totalSeatsPerRow = 10; // Total seats per row
  const [seats, setSeats] = useState<number[][]>( 
    Array.from({ length: totalRows }, () => Array(totalSeatsPerRow).fill(0))
  );
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (row: number, col: number) => {
    const newSeats = [...seats];
    const seatLabel = `${String.fromCharCode(97 + row)}${col + 1}`; // Column as number, Row as letter

    if (seats[row][col] === 0) {
      newSeats[row][col] = 1;
      setSelectedSeats((prev) => [...prev, seatLabel]);
    } else if (seats[row][col] === 1) {
      newSeats[row][col] = 0;
      setSelectedSeats((prev) => prev.filter((seat) => seat !== seatLabel));
    }

    setSeats(newSeats);
  };

  const handleSubmit = () => {
    alert(`Selected Seats for Movie ${movie}: ${selectedSeats.join(", ")}`);
  };

  return (
    <div className="bg-gray-100 dark:bg-[#040d19] min-h-screen">
      <div className="max-w-6xl mx-auto bg-white dark:bg-[#040d19] dark:text-white rounded-lg shadow-lg p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Pilih Kursi
        </h1>
        <div className="grid grid-cols-1 gap-6">
          {/* Seat Selection (3/4) */}
          <div>
            <div className="grid grid-cols-1 gap-4 mb-6">
              {seats.map((_, rowIndex) => (
                <div key={rowIndex} className="flex justify-center space-x-2">
                  {seats[rowIndex].map((_, colIndex) => (
                    <button
                      key={colIndex}
                      className={`
                        text-white
                        w-16 h-16 rounded-lg 
                        ${seats[rowIndex][colIndex] === 0 && "bg-green-500"} 
                        ${seats[rowIndex][colIndex] === 1 && "bg-blue-500"} 
                        ${seats[rowIndex][colIndex] === 2 && "bg-gray-400"} 
                        ${seats[rowIndex][colIndex] === 0 ? "hover:bg-green-600" : ""}
                        cursor-pointer
                      `}
                      onClick={() => handleSeatClick(rowIndex, colIndex)}
                      disabled={seats[rowIndex][colIndex] === 2}
                    >
                      {`${String.fromCharCode(97 + rowIndex).toUpperCase()}${colIndex + 1}`}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <div className="mb-6 text-center w-full bg-gray-6 rounded-lg">
              <span className="text-white">Layar</span>
            </div>

<hr  className="my-5"/>
<div className="flex flex-row">
  <div className="w-1/3">
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
  </div>
  <div className="w-2/3 flex justify-end flex-col">
  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Kursi Terpilih:</h2>
            {/* Count of Selected Seats */}
            <div className="mb-4">
              <span className="text-xl font-bold text-gray-800 dark:text-white">Total Kursi Terpilih: </span>
              <span className="text-xl text-secondary font-bold">{selectedSeats.length}</span>
            </div>
            {/* Selected Seats List */}
            {selectedSeats.length > 0 && (
              <span className="text-gray-700 dark:text-white">
                {selectedSeats.map((seat) => seat.toUpperCase()).join(", ")}
              </span>
            )}

<button
                onClick={handleSubmit}
                className="bg-secondary font-bold text-white py-2 px-6 rounded-md hover:bg-opacity-90"
              >
                Lanjutkan ke Pembayaran
              </button>
  </div>
</div>
   
          </div>

  
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionPage;
