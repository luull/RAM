'use client'
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import PaymentMethodModal from "./PaymentModal";
import { ProductCart } from "@/types/products";
import useLocalStorage from "@/hooks/useLocalStorage";
import { prefix } from "@/utils/prefix";
import Image from "next/image";

const ShippingDetailsModal = ({
  isOpen,
  onClose,
  transactionDetails,
}: {
  isOpen: boolean;
  onClose: () => void;
  transactionDetails: ProductCart[];
}) => {
  const [address, setAddress] = useState("");
  const [cart, setCart] = useLocalStorage<ProductCart[]>("cart", []);
  const [selectedCourier, setSelectedCourier] = useState<string | null>(null);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  if (!isOpen) return null;

  const couriers = [
    { name: "JNE", image: `${prefix}/images/kurir/jne.png`, cost: 10000 },
    { name: "J&T", image: `${prefix}/images/kurir/j&t.svg`, cost: 12000 },
    { name: "SiCepat", image: `${prefix}/images/kurir/sicepat.png`, cost: 15000 },
  ];

  const calculateTotalPrice = () => {
    const itemsTotal = transactionDetails.reduce((acc, item) => acc + item.price, 0);
    return itemsTotal + shippingCost;
  };

  const handleSubmit = () => {
    if (!address) {
      Swal.fire({
        title: 'Peringatan',
        text: "Harap isi alamat pengiriman.",
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (!selectedCourier) {
      Swal.fire({
        title: 'Peringatan',
        text: "Harap pilih ekspedisi kurir.",
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
    const updatedCart = cart.map((item) => ({
        ...item,
        address,
        courier: selectedCourier,
        shippingCost,
      }));
    setCart(updatedCart);
    setIsPaymentModalOpen(true);
    // onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-99999">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Isi Detail Pengiriman</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 dark:text-gray-300">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Alamat Pengiriman</label>
          <textarea
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Pilih Kurir</label>
          <div className="space-y-4">
  {couriers.map((courier, index) => (
    <div
      key={index}
      className={`flex items-center space-x-4 w-full px-4 py-3 rounded-md border ${
        selectedCourier === courier.name
          ? "border-secondary bg-secondary bg-opacity-10"
          : "border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600"
      } cursor-pointer`}
    >
      <Image
        alt={courier.name}
        src={courier.image}
        width={100}
        height={100}
        className="w-10 object-cover rounded-md"
      />
      <label className="flex items-center w-full space-x-4">
        <input
          type="radio"
          name="courier"
          value={courier.name}
          className="hidden"
          onChange={() => {
            setSelectedCourier(courier.name);
            setShippingCost(courier.cost);
          }}
        />
        <div>
          <span className="text-gray-800 dark:text-white font-semibold">{courier.name}</span>
          <span className="text-sm text-gray-600 dark:text-gray-400 block">Rp {courier.cost.toLocaleString()}</span>
        </div>
      </label>
    </div>
  ))}
</div>

        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Total Harga</h3>
          <p className="text-gray-600 dark:text-gray-400">Rp {calculateTotalPrice().toLocaleString()}</p>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 py-2 px-4 bg-primary text-white rounded-md hover:bg-secondary-dark disabled:bg-gray-400"
          disabled={!address || !selectedCourier}
        >
          Konfirmasi Pengiriman
        </button>
      </div>
                
      <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        handleClose={(value:boolean)=> onClose() }
        onClose={() => setIsPaymentModalOpen(false)}
        transactionDetails={transactionDetails}
      />
    </div>
  );
};

export default ShippingDetailsModal;
