"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductTypes } from "@/app/products/page";
import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import useLocalStorage from "@/hooks/useLocalStorage";

export interface ProductCart {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  description: string;
}

const ProductDetail = ({ products }: any) => {
  const [cart, setCart] = useLocalStorage<ProductCart[]>("cart", []);
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string>("");

  if (!products) {
    return <p>Loading...</p>;
  }

  const handleAddToCart = () => {
    if (quantity < 1) {
      setError("Quantity must be at least 1.");
      return;
    }

    if (quantity > products.stock) {
      setError(`Stok tidak ada untuk jumlah ${products.stock}.`);
      return;
    }

    setError("");

    const productExistsInCart = cart.find(item => item.id === products.id);

    if (productExistsInCart) {
      const updatedCart = cart.map(item =>
        item.id === products.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart, { ...products, quantity }];
      setCart(updatedCart);
    }

    setQuantity(1);
    alert("Product added to cart");
  };

  return (
    <div className="bg-white dark:bg-dark-2">
      <div className="relative w-full h-80">
        <Image
          width={400}
          height={400}
          src={products.image}
          alt={products.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
          {products.name}
        </h1>

        <p className="text-gray-700 dark:text-white mb-6">{products.description}</p>

        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold text-secondary">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(products.price)}
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            Stok: {products.stock}
          </span>
        </div>

        <div className="mb-6">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-800 dark:text-white mb-2">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-20 p-2 border rounded-md text-center"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleAddToCart}
          className="flex items-center disabled:bg-grey bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none"
        >
          <ShoppingCartIcon className="h-5 w-5 mr-2" />
          <span>Masukkan Keranjang</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
