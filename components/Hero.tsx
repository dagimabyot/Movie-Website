'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Play } from 'lucide-react';
import type { Movie } from '@/lib/movies';

interface HeroProps {
  movies: Movie[];
  onTrailerClick: (movie: Movie) => void;
}

export default function Hero({ movies, onTrailerClick }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const featured = movies.filter((m) => m.category === 'featured');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featured.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featured.length]);

  const movie = featured[current];

  if (!movie) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden pt-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.banner})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-16">
        <div className="max-w-3xl space-y-6">
          <div className="space-y-2">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-2xl leading-tight text-balance">
              {movie.title}
            </h1>
            <div className="h-1 w-20 bg-gold rounded-full" />
          </div>

          <div className="flex items-center gap-4 flex-wrap text-sm md:text-base">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xl md:text-2xl ${
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
              <span className="text-gold font-bold ml-2 text-lg">{movie.rating}/10</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-gold text-dark-bg rounded-full font-bold text-xs md:text-sm">
                {movie.year}
              </span>
              <span className="text-gray-300">{movie.duration} min</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">{movie.genre[0]}</span>
            </div>
          </div>

          <p className="text-gray-200 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl">
            {movie.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {movie.genre.slice(0, 4).map((g) => (
              <span
                key={g}
                className="px-4 py-2 bg-gold bg-opacity-20 text-gold rounded-full text-xs md:text-sm font-medium hover:bg-opacity-30 transition"
              >
                {g}
              </span>
            ))}
          </div>

          <div className="flex gap-4 pt-6 flex-wrap">
            <button
              onClick={() => onTrailerClick(movie)}
              className="flex items-center gap-3 bg-gold text-dark-bg px-8 md:px-10 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-gold-hover transition transform hover:scale-105 shadow-xl"
            >
              <Play size={24} />
              Watch Trailer
            </button>
            <button
              onClick={() => onTrailerClick(movie)}
              className="flex items-center gap-3 border-2 border-gold text-gold px-8 md:px-10 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-gold hover:text-dark-bg transition"
            >
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'bg-gold w-8 h-3' : 'bg-gray-600 hover:bg-gray-400 w-3 h-3'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 animate-bounce">
        <ChevronDown className="text-gold" size={32} />
      </div>
    </div>
  );
}
