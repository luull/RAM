
"use client";
import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline";
import useLocalStorage from "@/hooks/useLocalStorage"; // Assuming the hook is in the 'hooks' directory
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Image from "next/image";
import { ProductCart } from "@/types/products";
import PaymentMethodModal from "@/components/Products/PaymentModal";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useLocalStorage<ProductCart[]>("cart", []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleRemoveItem = (itemId: string) => {
    const updatedCart = cart.filter(item => item.id.toString() !== itemId.toString());
    setCart(updatedCart);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    const updatedCart = cart.map(item => 
      item.id.toString() === itemId.toString() ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  useEffect(()=> {
    if(cart.some((item)=> item.status === "success")){
      setCart([])
    }
  },[cart])

  if (cart.length === 0) {
    return (
      <DefaultLayout>
      <Breadcrumb pageName={`Keranjang`}/>
      <div className="mx-auto max-w-7xl">
      <div className="text-center p-6 mt-20">
        <ShoppingCartIcon className="h-24 w-24 mx-auto text-gray-500" />
        <h2 className="text-xl font-semibold dark:text-white text-gray-800">Keranjang anda kosong</h2>
      </div>
      </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
    <Breadcrumb pageName={`Keranjang`}/>
    <div className="mx-auto max-w-7xl">
      <div>
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b py-4">
            <div className="flex items-center">
              <Image width={100} height={100} src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <span className="text-gray-500">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR",  maximumFractionDigits: 0, }).format(item.price)}</span>
                <h3 className="text-sm font-semibold">{item.packaging}</h3>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                min="1"
                className="w-12 text-center border p-2 rounded"
              />
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon width={20} height={20}/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Total:</h2>
        <span className="text-xl font-bold text-secondary">
        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR",  maximumFractionDigits: 0, }).format(calculateTotal())}
        </span>
      </div>

      {/* Checkout Button */}
    <div className="flex flex-row justify-end">
    <button
        onClick={() =>setIsModalOpen(true)}
        className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none"
      >
        Lakukan pembayaran
      </button>
    </div>
    <PaymentMethodModal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        transactionDetails={cart} 
      />
    </div>
    </DefaultLayout>
  );
};

export default CartPage;
