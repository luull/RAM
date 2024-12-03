'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { prefix } from "@/utils/prefix";
import { TransactionDetailsTypes } from "./SeatSelectionPage";
import { paymentMethods } from "@/types/payment";

const PaymentMethodModal = ({
  isOpen,
  onClose,
  transactionDetails,
}: {
  isOpen: boolean;
  onClose: () => void;
  transactionDetails: TransactionDetailsTypes;
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const router = useRouter();

  if (!isOpen) return null;
  const generateVirtualAccount = (bankCode: string = "123") => {
    const uniquePart = Math.random().toString().slice(2, 12); 
    return `${bankCode}${uniquePart}`;
  };
  
  const handleSubmit = () => {
    if (selectedMethod) {
      const bankCode = selectedMethod === "Bank BRI" ? "002" : 
                       selectedMethod === "Bank BCA" ? "014" : 
                       selectedMethod === "Bank Mandiri" ? "008" : 
                       selectedMethod === "Gopay" ? "700" : 
                       selectedMethod === "OVO" ? "701" : 
                       selectedMethod === "DANA" ? "702" : 
                       selectedMethod === "ShopeePay" ? "703" : "000";
                       
      const virtualAccount = generateVirtualAccount(bankCode);
  
      const queryString = new URLSearchParams({
        title: transactionDetails.movie,
        totalPrice: transactionDetails.totalPrice.toString(),
        seatNumber: transactionDetails.selectedSeats.join(", "),
        paymentMethod: selectedMethod,
        virtualCode: virtualAccount, // Menambahkan virtual account
      }).toString();
  
      router.push(`/transaction-summary?${queryString}`);
      onClose();
    } else {
      alert("Pilih metode pembayaran terlebih dahulu!");
    }
  };
  
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-99999">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Pilih Metode Pembayaran</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 dark:text-gray-300">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          {paymentMethods.map((method, index) => (
            <label
              key={index}
              className={`flex items-center space-x-4 w-full px-4 py-2 rounded-md border ${
                selectedMethod === method.name
                  ? "border-secondary bg-secondary bg-opacity-10"
                  : "border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600"
              } cursor-pointer`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.name}
                className="hidden"
                onChange={() => setSelectedMethod(method.name)}
              />
              <div>{method.icon}</div>
              <div className="flex flex-col">
                <span className="text-gray-800 dark:text-white font-semibold">{method.name}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{method.type}</span>
              </div>
            </label>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full mt-6 py-2 px-4 bg-secondary text-white rounded-md hover:bg-secondary-dark disabled:bg-gray-400"
          disabled={!selectedMethod}
        >
          Konfirmasi Metode Pembayaran
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodModal;
