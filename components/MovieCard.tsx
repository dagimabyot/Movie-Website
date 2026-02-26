'use client';

import { Play } from 'lucide-react';
import type { Movie } from '@/lib/movies';

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
}

export default function MovieCard({ movie, onPlay }: MovieCardProps) {
  return (
    <div className="group relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-dark-secondary cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-gold/50 hover:scale-105">
      {/* Background Image */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-full object-cover group-hover:brightness-50 transition duration-300"
        loading="lazy"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition duration-300">
        <div>
          <h3 className="text-white font-bold text-sm md:text-base line-clamp-2 leading-tight">
            {movie.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-gold font-bold text-xs px-2 py-1 bg-dark-bg/80 rounded-full">
              {movie.year}
            </span>
            <span className="text-gray-300 text-xs bg-dark-bg/80 px-2 py-1 rounded-full">
              {movie.duration}min
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < Math.floor(movie.rating)
                      ? 'text-gold'
                      : i < movie.rating
                      ? 'text-gold opacity-50'
                      : 'text-gray-600'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-gold text-xs font-bold">{movie.rating}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {movie.genre.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="text-xs text-gold bg-gold bg-opacity-20 px-2 py-1 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>

          <button
            onClick={() => onPlay(movie)}
            className="w-full bg-gold text-dark-bg py-2 rounded-lg font-bold text-sm hover:bg-gold-hover transition transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Play size={16} />
            Watch Trailer
          </button>
        </div>
      </div>

      {/* Quality Badge */}
      <div className="absolute top-2 right-2 bg-gold text-dark-bg px-2 py-1 rounded-full text-xs font-bold z-10">
        HD
      </div>
    </div>
  );
}
