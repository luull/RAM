"use client";
import { StarIcon } from '@heroicons/react/24/outline';
import { TicketIcon } from '@heroicons/react/24/outline';
import { CalendarIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

interface MovieProps {
  movie: {
    id: number;
    title: string;
    posterUrl: string;
    description: string;
    releaseDate: string;
  };
}

const MovieCard = ({ movie }: MovieProps) => {
  
  return (
    <div className="bg-white dark:shadow-card dark:bg-dark-2 rounded-lg shadow-md overflow-hidden">
      {/* Movie Poster */}
      <div className="relative w-full h-64">
        <Image
          width={200}
          height={64}
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
      </div>

      <div className="p-4">
        {/* Movie Title */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{movie.title}</h2>

        {/* Release Date */}
        <div className="flex items-center text-sm text-gray-600 dark:text-white mb-2">
          <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
          <p>{new Date(movie.releaseDate).toLocaleDateString('id-ID')}</p>
        </div>

        <p
          className="text-gray-700 text-sm dark:text-white mb-4 line-clamp-3" // line-clamp to limit lines and truncate text
          title={movie.description} // Show full description on hover (optional)
        >
          {movie.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-500 mr-2" />
            <span>4.5</span> {/* Example Rating */}
          </div>
          
          <Link href={`/cinema-location/${movie.id}`}
            className="flex items-center bg-secondary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none"
          >
            <TicketIcon className="h-5 w-5 mr-2" />
            <span>Beli Tiket</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
