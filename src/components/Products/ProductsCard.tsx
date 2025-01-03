"use client";
import { useState } from "react";
import { EyeIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import useLocalStorage from "@/hooks/useLocalStorage"; 
import { ProductCart, ProductTypes } from "@/types/products";
import Swal from 'sweetalert2';

interface ProductsProps {
  productsData: ProductTypes;
}

const ProductsCard = ({ productsData }: ProductsProps) => {
  const [cart, setCart] = useLocalStorage<ProductCart[]>("cart", []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };
  const handleAddToCart = async () => {
    // Show size selection popup
    const { value: selectedSize } = await Swal.fire({
      title: 'Pilih Ukuran',
      input: 'select',
      inputOptions: productsData.sizes.reduce((options, size) => {
        options[size.gram] = `${size.gram}gr - ${formatCurrency(size.price)}`;
        return options;
      }, {} as Record<number, string>),
      inputPlaceholder: 'Pilih ukuran',
      showCancelButton: true,
      confirmButtonText: 'Tambahkan',
      cancelButtonText: 'Batal',
    });

    if (selectedSize) {
      const size = productsData.sizes.find(size => size.gram === parseInt(selectedSize));
      if (!size) return;

      // Check if the product with the selected size is already in the cart
      const productExistsInCart = cart.find(
        item => item.id === productsData.id && item.packaging === `${size.gram}gr`
      );

      if (productExistsInCart) {
        // If it exists, increase the quantity
        const updatedCart = cart.map(item =>
          item.id === productsData.id && item.packaging === `${size.gram}gr`
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCart(updatedCart);
      } else {
        // Otherwise, add the product with quantity 1
        const updatedCart = [...cart, {
          id: productsData.id,
          name: productsData.name,
          image: productsData.image,
          description: productsData.description,
          packaging: `${size.gram}gr`,
          price: size.price,
          quantity: 1,
          status: "Pending"
        }];
        setCart(updatedCart);
      }
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
    }
  };

  return (
    <div className="bg-white dark:shadow-card dark:bg-dark-2 rounded-lg shadow-md overflow-hidden">
      {/* Product Image */}
      <div className="relative w-full h-64">
        <Image
          width={200}
          height={64}
          src={productsData.image}
          alt={productsData.name}
          className="w-full h-64 object-cover"
        />
      </div>

      <div className="p-4">
        {/* Product Name */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{productsData.name}</h2>

        {/* Product Description */}
        <div className="h-18 overflow-hidden">
          <p
            className="text-gray-700 text-sm dark:text-white mb-4 line-clamp-3"
            title={productsData.description}
          >
            {productsData.description}
          </p>
        </div>

        {/* Price Range */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-secondary">
            {`${formatCurrency(productsData.sizes[0].price)} - ${formatCurrency(productsData.sizes[productsData.sizes.length - 1].price)}`}
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            Stok: {productsData.stock}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between space-x-3">
          {/* Detail Button */}
          <Link
            href={`/detail-product/${productsData.id}`}
            className="flex items-center text-xs justify-center w-1/2 bg-secondary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none"
          >
            <EyeIcon className="h-5 w-5 mr-2" />
            <span>Deskripsi Produk</span>
          </Link>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex text-xs items-center justify-center w-1/2 bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none"
          >
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            <span>Keranjang</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
