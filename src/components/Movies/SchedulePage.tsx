"use client";

import { useState, useEffect } from "react";
import {
  CalendarIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface ScheduleProps {
    movie?:any;
  onSelectSchedule: (schedule: { date: string | null; time: string | null }) => void;
}

const SchedulePage = ({ onSelectSchedule }: ScheduleProps) => {
  const today = new Date();
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const availableDates = generateDates();
  const times = ["10:00", "13:00", "16:00", "19:00"];
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    // Kirim data ke parent setiap kali selectedDate atau selectedTime berubah
    onSelectSchedule({ date: selectedDate, time: selectedTime });
  }, [selectedDate, selectedTime, onSelectSchedule]);
  
  return (
    <div className="bg-gray-100 my-5 dark:bg-[#040d19] w-full flex flex-col items-center justify-center">
      {/* Pilih Tanggal */}
      <div className="mb-6 w-full">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <CalendarIcon className="w-6 h-6 text-primary dark:text-white mr-2" />
          Pilih Tanggal
        </h2>
        <div className="flex space-x-4 overflow-x-auto">
          {availableDates.map((date, index) => {
            const isDisabled = index >= 3; // Hanya 3 tanggal pertama yang aktif
            return (
              <button
                key={index}
                className={`px-4 py-2 rounded-md font-medium flex flex-col disabled:text-gray-600 disabled:bg-gray-300 items-center ${
                  selectedDate === date.toISOString().split("T")[0]
                    ? "bg-primary dark:bg-secondary text-white"
                    : "bg-white text-gray-600"
                }`}
                onClick={() => !isDisabled && setSelectedDate(date.toISOString().split("T")[0])}
                disabled={isDisabled}
              >
                <span className="font-bold">
                  {date.toLocaleDateString("id-ID", { weekday: "short" })}
                </span>
                <span>
                  {date.toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}
                </span>
              </button>
            );
          })}
        </div>
      </div>
{selectedDate && (
<>
      {/* Pilih Jam */}
      <div className="mb-6 w-full">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <ClockIcon className="w-6 h-6 text-primary dark:text-white mr-2" />
          Pilih Jam
        </h2>
        <div className="flex space-x-4">
          {times.map((time) => (
            <button
              key={time}
              className={`px-4 py-2 rounded-md font-medium flex items-center ${
                selectedTime === time
                  ? "bg-primary dark:bg-secondary text-white"
                  : "bg-white text-gray-600 hover:text-white hover:bg-primary"
              }`}
              onClick={() => setSelectedTime(time)}
            >
              <ClockIcon className="w-5 h-5 mr-2" />
              {time}
            </button>
          ))}
        </div>
      </div>
      </>
)}

    </div>
  );
};

export default SchedulePage;
