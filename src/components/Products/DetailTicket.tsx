'use client';
import Image from "next/image";
import {QRCodeCanvas} from "qrcode.react";
import { useSearchParams } from "next/navigation";
import { prefix } from "@/utils/prefix";
import { useEffect, useState } from "react";

const DetailTicket = ({ movies }: any) => {
  const [randomString, setRandomString] = useState('');

  const generateRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  useEffect(() => {
    const generatedString = generateRandomString(7);
    setRandomString(generatedString);
  }, []); 
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const location = searchParams.get("location");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const seatNumber = searchParams.get("seatNumber");
  const movie = movies.find(
    (movie: any) => movie.title.toString() === title?.toString()
  );

  return (
    <div className="flex flex-col items-start py-8 px-0 md:px-4">
      <div className="bg-[#27376A] w-full max-w-md rounded-lg shadow-md">
        {/* Header */}
        <div className="pt-3 pb-0 md:p-4">
          <h1 className="text-md md:text-lg font-bold text-center text-yellow-400">
            {movie?.title || "Film Tidak Ditemukan"}
          </h1>
        </div>

        {/* Movie Info */}
        <div className="bg-[#27376A] px-4 md:px-6 py-3 md:py-6 rounded-t-lg text-white">
          <div className="flex items-start gap-4 mb-4">
            <Image
              src={movie?.posterUrl || "/placeholder.png"}
              alt={movie?.title || "Poster"}
              width={1000}
              height={1000}
              className="rounded-lg md:w-36 w-15 h-20 md:h-44"
            />
            <div className="w-full flex flex-col space-y-1">
              {/* <p className="text-xs md:text-sm">Tanggal</p> */}
            <div className="flex flex-row md:flex-col md:space-x-0 justify-start space-x-2">
              <span className="font-light text-xs md:text-sm">Tanggal</span>
              <span className="font-medium text-xs md:text-sm">  
                {date
              ? `${new Date(date).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}`
              : "Belum dipilih"}</span>
            </div>
            <div className="flex flex-row md:flex-col md:space-x-0 justify-start space-x-2">
              <span className="font-light text-xs md:text-sm">Bioskop</span>
              <span className="font-medium text-left text-xs md:text-sm">  
                {location}</span>
            </div>
            <div className="flex flex-row md:flex-col md:space-x-0 justify-start space-x-2">
              <span className="font-light text-xs md:text-sm">Jam</span>
              <span className="font-medium text-left text-xs md:text-sm">  
                {time}</span>
            </div>
            <div className="flex flex-row md:flex-col md:space-x-0 justify-start space-x-2">
              <span className="font-light text-xs md:text-sm">Tiket</span>
              <span className="font-medium text-left text-xs md:text-sm">  
                {seatNumber}</span>
            </div>
            </div>
          </div>
        </div>

        {/* QR Code and Booking Info */}
        <div className="bg-white py-6 text-center">
          <p className="text-sm text-gray-600">ID Booking</p>
          <p className="text-md font-bold text-black">{randomString}</p>

          <div className="mt-4 flex flex-col items-center justify-center">
            <QRCodeCanvas
              value={randomString}
              size={128}
              bgColor="#ffffff"
              fgColor="#000000"
            />
                    <Image
              src={`${prefix}/images/logo/RAM-light-hor.png`}
              alt={movie?.title || "Poster"}
              width={120}
              height={140}
              className="mt-5"
            />
          </div>
          <div className="relative my-5">
            
  <div className="h-[1px] bg-gray-300 border-dashed border border-white relative">
    <div className="absolute -left-4 -top-3.5 w-8 h-8 bg-[#f3f4f6] dark:bg-[#040d19] rounded-full "></div>
    <div className="absolute -right-4 -top-3.5 w-8 h-8 bg-[#f3f4f6] dark:bg-[#040d19] rounded-full "></div>
  </div>
<div className="mt-10 mx-5">
<p className="mt-4 text-left text-sm md:text-sm font-bold text-gray-600">Cara mencetak tiket Anda</p>
          <ol className="mt-2 text-xs md:text-sm text-gray-600 text-left">
            <li>1. Kunjungi area pengambilan tiket di lokasi bioskop.</li>
            <li>2. Tunjukkan booking ID tiket Anda kepada staf bioskop atau scan QR code di atas.</li>
            <li>3. Tiket akan dicetak dan bisa Anda ambil.</li>
            <li>4. Selamat Menonton.</li>
          </ol>
</div>
</div>

        </div>
      </div>
    </div>
  );
};

export default DetailTicket;
