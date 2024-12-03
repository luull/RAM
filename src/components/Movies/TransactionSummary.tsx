    'use client';

    import { useSearchParams } from 'next/navigation';
    import { useState, useEffect } from 'react';
    import { paymentMethodsSummary } from '@/types/payment'; 

    const TransactionSummary = () => {
    const searchParams = useSearchParams();

    const title = searchParams.get('title');
    const totalPrice = searchParams.get('totalPrice');
    const seatNumber = searchParams.get('seatNumber');
    const paymentMethod = searchParams.get('paymentMethod');
    const virtualCode = searchParams.get('virtualCode');

    const [timeLeft, setTimeLeft] = useState(15 * 60); 

    useEffect(() => {
        const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const selectedPaymentMethod = paymentMethodsSummary.find(
        (method) => method.name === paymentMethod
    );

    const copyToClipboard = () => {
        if (virtualCode) {
        navigator.clipboard.writeText(virtualCode);
        alert('Nomor Virtual Account telah disalin ke clipboard!');
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-[#040d19] flex justify-center items-center">
        <div className="flex flex-col w-full space-y-6">
            {/* Kartu Virtual Account dan Metode Pembayaran */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2">
                <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
                Metode Pembayaran
                </h1>
                <div className="flex items-center mt-5 justify-center space-x-2">
                {selectedPaymentMethod && (
                
                    <div>{selectedPaymentMethod.icon}</div>
                
                )}
                </div>
            </div>

            <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
                Virtual Account
                </h2>
                <div className="flex justify-center items-center mb-4">
                <div className="text-4xl font-semibold text-gray-800 dark:text-white p-4 border border-gray-300 rounded-lg">
                    {virtualCode}
                </div>
                </div>
                <div className="flex justify-center">
                <button
                onClick={copyToClipboard}
                className="w-75 py-2 text-center px-4 bg-secondary text-white rounded-md hover:bg-secondary-dark"
                >
                Salin Nomor Virtual Account
                </button>
                </div>
            </div>
            </div>

    <div className="flex flex-col md:flex-row space-x-0 space-y-5 md:space-y-0 md:space-x-5">

            {/* Kartu Ringkasan Transaksi */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full">
            <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">
                Ringkasan Transaksi
            </h2>
            <div className="space-y-4">
                    <div className="flex flex-row justify-between">
                        <span className="font-normal">Film:</span>
                        <p className="font-bold">{title}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span className="font-normal">Nomor Kursi:</span>
                        <p className="font-bold">{seatNumber}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span className="font-normal">Total Harga:</span>
                        <p className="font-bold">Rp {Number(totalPrice)?.toLocaleString("id-ID")}</p>
                    </div>
                    
                    </div>

            </div>
            {/* Kartu Countdown */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full">
            <h2 className="text-xl font-bold mt-5 text-center text-gray-800 dark:text-white mb-4">
                Waktu Pembayaran
            </h2>
            <div className="flex justify-center items-center space-x-4">
                <div className="text-5xl flex font-extrabold text-gray-800 dark:text-white">
                {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </div>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                Segera lakukan pembayaran sebelum waktu habis!
            </p>
            </div>
    </div>

        </div>
        </div>
    );
    };

    export default TransactionSummary;
