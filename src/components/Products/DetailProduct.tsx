"use client";
import { useState } from "react";
import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ProductCart, ProductTypes } from "@/types/products";
import Swal from "sweetalert2";

// Helper function to generate a random string for ID
const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 10); // Generates a random string of 8 characters
};

const ProductDetail = ({ products }: { products: ProductTypes }) => {
  const [cart, setCart] = useLocalStorage<ProductCart[]>("cart", []);
  const [quantity, setQuantity] = useState<number>(1);
  const [packaging, setPackaging] = useState<string>("25gr");
  const [price, setPrice] = useState<number>(products.sizes[0].price);  // Default to the first size
  const [error, setError] = useState<string>("");

  if (!products) {
    return <p>Loading...</p>;
  }

  const handlePackagingChange = (gram: number) => {
    setPackaging(`${gram}gr`);

    // Find the selected size and update the price
    const selectedSize = products.sizes.find((size) => size.gram === gram);
    if (selectedSize) {
      setPrice(selectedSize.price);
    }
  };

  const handleAddToCart = () => {
    if (quantity < 1) {
      setError("Quantity must be at least 1.");
      return;
    }

    if (quantity > products.stock) {
      setError(`Stok tidak ada untuk jumlah ${products.stock}.`);
      return;
    }

    setError(""); // Clear error when the input is valid

    const productExistsInCart = cart.find(
      (item) => item.name === products.name && item.packaging === packaging
    );

    if (productExistsInCart) {
      const updatedCart = cart.map((item) =>
        item.name === products.name && item.packaging === packaging
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      const updatedCart = [
        ...cart,
        {
          id: generateRandomId(), 
          name: products.name,
          image: products.image,
          price,
          quantity,
          packaging,
          description: products.description,
          status: "Pending"
        },
      ];
      setCart(updatedCart);
    }

    setQuantity(1); 
    Swal.fire({
      title: 'Berhasil!',
      text: 'Berhasil Menambahkan ke Keranjang',
      icon: 'success',
      confirmButtonText: 'Close'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
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
            }).format(price)}
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            Stok: {products.stock}
          </span>
        </div>

        <div className="mb-6">
          <label
            htmlFor="packaging"
            className="block text-sm font-medium text-gray-800 dark:text-white mb-2"
          >
            Pilih Kemasan
          </label>
          <div className="flex space-x-4">
            {products.sizes.map((size) => (
              <button
                key={size.gram}
                onClick={() => handlePackagingChange(size.gram)}
                className={`px-4 py-2 rounded-md border ${
                  packaging === `${size.gram}gr`
                    ? "bg-secondary text-white"
                    : "bg-white text-gray-800 border-gray-300"
                } hover:bg-secondary hover:text-white`}
              >
                {size.gram} gram
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-800 dark:text-white mb-2"
          >
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
