"use client";

import { CheckCircleIcon } from "@heroicons/react/16/solid";
import {
  ArrowLongRightIcon,
  CalendarDateRangeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import SchedulePage from "./SchedulePage";

interface CinemaLocationProps {
  movie?: any;
}

const CinemaLocationPage = ({ movie }: CinemaLocationProps) => {
  const router = useRouter();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [schedule, setSchedule] = useState<{ date: string | null; time: string | null }>({
    date: null,
    time: null,
  });

  useEffect(() => {
    const defaultFavorites = ["AEON Mall Deltamas IMAX", "Grand Indonesia CGV"];
    setFavorites(defaultFavorites);
  }, []);

  const handleScheduleSelect = useCallback((selected: { date: string | null; time: string | null }) => {
    setSchedule(selected);
  }, []);

  const cinemas = [
    "AEON Mall Deltamas IMAX",
    "AEON Mall Deltamas Premiere",
    "AEON Mall Deltamas XXI",
    "Distrik 1 Meikarta Cinepolis",
    "Living Plaza Jababeka CGV",
    "Mall Lippo Cikarang Cinepolis",
    "Maxxbox Orange County Cinepolis",
    "Sentra Grosir Cikarang XXI",
    "Plaza Senayan XXI",
    "Grand Indonesia CGV",
    "Pondok Indah Mall XXI",
    "Summarecon Mall Bekasi XXI",
    "Botani Square CGV",
    "Trans Studio Mall Bandung XXI",
    "Paris Van Java CGV",
    "Amplaz Yogyakarta XXI",
    "Ciputra World Surabaya XXI",
    "Tunjungan Plaza XXI",
    "Mall Panakkukang CGV Makassar",
    "Pentacity Balikpapan XXI",
  ];

  const toggleFavorite = (cinema: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(cinema)
        ? prevFavorites.filter((fav) => fav !== cinema)
        : [...prevFavorites, cinema]
    );
    setSelectedCinema((prevSelected) => (prevSelected === cinema ? null : cinema));
  };

  const filteredCinemas = cinemas.filter((cinema) =>
    cinema.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRedirect = () => {
    if (movie?.id && selectedCinema && schedule?.date && schedule?.time) {
      const queryParams = new URLSearchParams({
        location: selectedCinema,
        date: schedule.date,
        time: schedule.time,
      }).toString();

      router.push(`/seat-selection/${movie.id}?${queryParams}`);
    } else {
      alert("Pastikan semua data sudah dipilih!");
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-[#040d19] p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Favorite Cinemas */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Bioskop Favorit
          </h2>
          <ul className="space-y-2 overflow-auto max-h-80">
            {favorites.map((cinema) => (
              <li
                key={cinema}
                onClick={() => setSelectedCinema(cinema)}
                className={`flex justify-between items-center px-4 py-2 rounded-md border cursor-pointer ${
                  selectedCinema === cinema
                    ? "bg-primary text-white"
                    : "border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                }`}
              >
                <span className="flex-grow">{cinema}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(cinema);
                  }}
                  className="text-yellow-500 hover:text-yellow-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M12 2l2.9 5.9L21 9.2l-4.5 4.4 1.1 6.3-5.6-2.9-5.6 2.9 1.1-6.3L3 9.2l6.1-.9z" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Cinema List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Pilih Bioskop</h2>
          <input
            type="text"
            placeholder="Cari bioskop..."
            className="w-full px-4 py-2 mb-4 border rounded-md text-gray-800 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="space-y-2 overflow-auto max-h-80">
            {filteredCinemas.map((cinema) => (
              <li
                key={cinema}
                onClick={() => setSelectedCinema(cinema)}
                className={`flex justify-between items-center px-4 py-2 rounded-md border cursor-pointer ${
                  selectedCinema === cinema
                    ? "bg-primary text-white"
                    : "border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                }`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(cinema);
                  }}
                  className={`mr-2 ${
                    favorites.includes(cinema)
                      ? "text-yellow-500 hover:text-yellow-400"
                      : "text-gray-400 hover:text-gray-500"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M12 2l2.9 5.9L21 9.2l-4.5 4.4 1.1 6.3-5.6-2.9-5.6 2.9 1.1-6.3L3 9.2l6.1-.9z" />
                  </svg>
                </button>
                <span className="flex-grow">{cinema}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedCinema && (
        <>
          <SchedulePage onSelectSchedule={handleScheduleSelect} movie={movie} />
          <div className="sticky bottom-0 mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
              <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
              Ringkasan Pilihan Anda
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex-grow">
                <p className="text-gray-800 dark:text-white">
                  <strong>Film:</strong> {movie?.title}
                </p>
                <p className="text-gray-800 dark:text-white">
                  <strong>Bioskop:</strong> {selectedCinema}
                </p>
                <p className="text-gray-800 dark:text-white">
                  <strong>Jadwal:</strong>{" "}
                  {schedule?.date && schedule?.time
                    ? `${new Date(schedule.date).toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}, - ${schedule.time}`
                    : "Belum dipilih"}
                </p>
              </div>
              <button
                onClick={handleRedirect}
                className="bg-secondary text-white px-6 py-2 rounded-md hover:bg-opacity-90 flex items-center space-x-2"
              >
                <ArrowLongRightIcon className="w-5" />
                <span>Lanjut pilih kursi</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>

  );
};

export default CinemaLocationPage;
