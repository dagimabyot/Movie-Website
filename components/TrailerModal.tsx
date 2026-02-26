'use client';

import { X, Maximize } from 'lucide-react';
import type { Movie } from '@/lib/movies';
import { useRef } from 'react';

interface TrailerModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TrailerModal({ movie, isOpen, onClose }: TrailerModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (!isOpen || !movie) return null;

  const handleFullscreen = () => {
    if (iframeRef.current?.requestFullscreen) {
      iframeRef.current.requestFullscreen();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gold transition duration-200 z-10"
        >
          <X size={36} />
        </button>

        {/* Video Container */}
        <div className="relative w-full overflow-hidden rounded-xl shadow-2xl">
          <div className="w-full aspect-video bg-dark-bg relative">
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${movie.youtubeId}?autoplay=1&controls=1&modestbranding=1&rel=0&fs=1`}
              title={`${movie.title} Trailer`}
              className="w-full h-full absolute inset-0 rounded-xl"
              allowFullScreen
              allow="autoplay; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={handleFullscreen}
            className="absolute top-4 right-4 bg-gold bg-opacity-80 hover:bg-opacity-100 text-dark-bg p-3 rounded-full transition transform hover:scale-110 z-10"
            aria-label="Fullscreen"
          >
            <Maximize size={20} />
          </button>
        </div>

        {/* Movie Info */}
        <div className="bg-dark-secondary rounded-b-xl p-6 shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{movie.title}</h3>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
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
                  <span className="text-gold font-bold ml-1">{movie.rating}/10</span>
                </div>
                <span className="text-gray-400">{movie.year}</span>
                <span className="text-gray-400">{movie.duration} minutes</span>
                <div className="flex gap-2">
                  {movie.genre.slice(0, 3).map((genre) => (
                    <span
                      key={genre}
                      className="px-2 py-1 bg-gold bg-opacity-20 text-gold text-xs rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed">{movie.description}</p>
        </div>
      </div>
    </div>
  );
}
