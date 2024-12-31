'use client'
import useLocalStorage from "@/hooks/useLocalStorage";
import { ProductCart } from "@/types/products";
import { prefix } from "@/utils/prefix";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams,useRouter } from "next/navigation";

const SuccessPayment = () => {
    const [cart, setCart] = useLocalStorage<ProductCart[]>("cart", []);
  const router = useRouter()
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get('paymentMethod');
  const virtualCode = searchParams.get('virtualCode');

  const handleRedirect = () => {
    if (paymentMethod && virtualCode) {
      const queryParams = new URLSearchParams({
        paymentMethod: paymentMethod,
        virtualCode: virtualCode,
      }).toString();
      const updatedCart = cart.map((item) => (
        { ...item, status: "success" })
      );
      setCart(updatedCart);
      router.push(`/detail-ticket?${queryParams}`);
    } else {
      alert("Pastikan semua data sudah dipilih!");
    }
  };
    return (
        <>
            <div className="bg-gray-100 flex flex-col items-center justify-center px-4">
              <div className="bg-white flex flex-col md:flex-row justify-between rounded-xl shadow-lg p-6 text-center w-full">
  
                <div className="flex flex-row justify-center">
                  <Image
                    src={`${prefix}/images/gif/success2.gif`}
                    width={10}
                    height={10}
                    alt="gift-success"
                    className="h-32 w-32"
                  />
                </div>
              <div className="flex flex-col justify-center items-center align-center mt-7 md:mb-0 mb-5">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Pembayaran Berhasil!
                </h1>
                <p className="text-gray-600">
                Terima kasih! Pembayaran Anda sudah berhasil diproses. Nikmati layanan kami!.
                </p>
              
                <button
               onClick={handleRedirect}
                  className="bg-secondary my-5 w-70 font-bold flex flex-row justify-between disabled:bg-gray-4 text-white py-2 px-6 rounded-md hover:bg-opacity-90"
                >
                  <span className="flex flex-row space-x-3">
                  Lihat Detail Transaksi saya
                  </span>
                  <ArrowLongRightIcon className="w-5"/>
                </button>
              </div>
              <div>
              <Image
                    src={`${prefix}/images/icon/icon-phone.svg`}
                    width={1000}
                    height={1000}
                    alt="mobile-success"
                    className="mx-auto h-32 w-32"
                  />
              </div>
              
              
              </div>
              <hr />
              
            </div>
            </>
    )
}

export default SuccessPayment;