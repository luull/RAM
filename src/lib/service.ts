// In your service file (e.g., src/lib/service.ts)

import { Movie } from '@/app/movies/page';
import axios from 'axios';

export const fetchMovies = async (): Promise<Movie[]> => {  // Ensure the return type is correctly typed
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: {
        api_key: '6dcaf0667fe77633ed4db188ddc50fa2', 
        language: 'en-US',
      },
    });

    return response.data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      description: movie.overview,
      releaseDate: movie.release_date,
    }));
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};
