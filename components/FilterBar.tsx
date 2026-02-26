'use client';

import { X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { movies } from '@/lib/movies';

interface FilterBarProps {
  onFilterChange: (filtered: typeof movies) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating');

  // Get unique genres
  const allGenres = useMemo(() => {
    const genreSet = new Set<string>();
    movies.forEach((m) => m.genre.forEach((g) => genreSet.add(g)));
    return Array.from(genreSet).sort();
  }, []);

  // Get unique years
  const allYears = useMemo(() => {
    const years = Array.from(new Set(movies.map((m) => m.year))).sort(
      (a, b) => b - a
    );
    return years;
  }, []);

  // Filter and sort movies
  useMemo(() => {
    let filtered = [...movies];

    // Filter by genre
    if (selectedGenres.length > 0) {
      filtered = filtered.filter((m) =>
        m.genre.some((g) => selectedGenres.includes(g))
      );
    }

    // Filter by year
    if (selectedYear) {
      filtered = filtered.filter((m) => m.year === selectedYear);
    }

    // Filter by rating
    filtered = filtered.filter((m) => m.rating >= minRating);

    // Sort
    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'year') {
      filtered.sort((a, b) => b.year - a.year);
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    onFilterChange(filtered);
  }, [selectedGenres, selectedYear, minRating, sortBy, onFilterChange]);

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const handleReset = () => {
    setSelectedGenres([]);
    setSelectedYear(null);
    setMinRating(0);
    setSortBy('rating');
  };

  return (
    <div className="bg-dark-secondary border-b border-gray-700 py-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Filter Title */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Filter Movies</h3>
          {(selectedGenres.length > 0 ||
            selectedYear ||
            minRating > 0 ||
            sortBy !== 'rating') && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-gold hover:text-gold-hover transition"
            >
              <X size={18} />
              Reset Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Genre Filter */}
          <div>
            <label className="text-white font-bold mb-3 block">Genres</label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {allGenres.map((genre) => (
                <label
                  key={genre}
                  className="flex items-center gap-2 text-gray-300 hover:text-gold cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleGenreToggle(genre)}
                    className="w-4 h-4 cursor-pointer accent-gold"
                  />
                  {genre}
                </label>
              ))}
            </div>
          </div>

          {/* Year Filter */}
          <div>
            <label className="text-white font-bold mb-3 block">Year</label>
            <select
              value={selectedYear || ''}
              onChange={(e) =>
                setSelectedYear(e.target.value ? Number(e.target.value) : null)
              }
              className="w-full px-4 py-2 rounded bg-dark-bg border border-gray-700 text-white focus:outline-none focus:border-gold"
            >
              <option value="">All Years</option>
              {allYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="text-white font-bold mb-3 block">
              Minimum Rating: {minRating}
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full accent-gold"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>0.0</span>
              <span>10.0</span>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-white font-bold mb-3 block">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 rounded bg-dark-bg border border-gray-700 text-white focus:outline-none focus:border-gold"
            >
              <option value="rating">Highest Rated</option>
              <option value="year">Newest First</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
