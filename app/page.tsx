'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MovieGrid from '@/components/MovieGrid';
import TrailerModal from '@/components/TrailerModal';
import Footer from '@/components/Footer';
import FilterBar from '@/components/FilterBar';
import { movies } from '@/lib/movies';
import type { Movie } from '@/lib/movies';

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [showFilters, setShowFilters] = useState(false);

  // Get movies by category
  const popularMovies = useMemo(
    () => movies.filter((m) => m.category === 'popular').slice(0, 20),
    []
  );

  const upcomingMovies = useMemo(
    () => movies.filter((m) => m.category === 'upcoming').slice(0, 20),
    []
  );

  const searchResults = useMemo(() => {
    if (!searchQuery) return filteredMovies;
    return filteredMovies.filter(
      (m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genre.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, filteredMovies]);

  return (
    <main className="min-h-screen bg-dark-bg">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero movies={movies} onTrailerClick={setSelectedMovie} />

      {/* Search Section */}
      <section className="relative py-12 px-6 md:px-12 bg-dark-bg -mt-12 z-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-4 items-stretch">
            <input
              type="text"
              placeholder="Search movies, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-6 py-4 rounded-lg bg-dark-secondary border-2 border-gold text-white placeholder-gray-500 focus:outline-none focus:border-gold-hover text-lg"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-4 bg-gold text-dark-bg rounded-lg font-bold hover:bg-gold-hover transition"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      {showFilters && <FilterBar onFilterChange={setFilteredMovies} />}

      {/* Search Results or Main Content */}
      {searchQuery ? (
        searchResults.length > 0 ? (
          <MovieGrid
            title={`Search Results (${searchResults.length})`}
            movies={searchResults}
            onPlay={setSelectedMovie}
          />
        ) : (
          <div className="py-12 px-6 md:px-12 bg-dark-bg text-center">
            <h2 className="text-3xl font-bold text-white mb-4">No movies found</h2>
            <p className="text-gray-400">Try searching with different keywords</p>
          </div>
        )
      ) : (
        <>
          {/* Popular Movies */}
          <MovieGrid
            title="Popular Now"
            movies={popularMovies}
            onPlay={setSelectedMovie}
          />

          {/* Upcoming Movies */}
          <MovieGrid
            title="Coming Soon"
            movies={upcomingMovies}
            onPlay={setSelectedMovie}
          />

          {/* All Movies */}
          <MovieGrid
            title="Full Catalog"
            movies={movies}
            onPlay={setSelectedMovie}
          />
        </>
      )}

      {/* Trailer Modal */}
      <TrailerModal
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />

      {/* Footer */}
      <Footer />
    </main>
  );
}
