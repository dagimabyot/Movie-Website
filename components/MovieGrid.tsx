'use client';

import MovieCard from './MovieCard';
import type { Movie } from '@/lib/movies';

interface MovieGridProps {
  title: string;
  movies: Movie[];
  onPlay: (movie: Movie) => void;
}

export default function MovieGrid({ title, movies, onPlay }: MovieGridProps) {
  return (
    <section className="w-full py-12 px-6 md:px-12 bg-dark-bg">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onPlay={onPlay} />
        ))}
      </div>
    </section>
  );
}
