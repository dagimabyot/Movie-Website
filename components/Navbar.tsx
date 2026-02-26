'use client';

import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-dark-secondary bg-opacity-95 backdrop-blur-sm border-b border-gray-700">
      <div className="px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-3xl font-black">
            <span className="text-white">Movies</span>
            <span className="text-gold">Hub</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-white hover:text-gold transition">
            Home
          </Link>
          <Link href="#" className="text-white hover:text-gold transition">
            Trending
          </Link>
          <Link href="#" className="text-white hover:text-gold transition">
            Browse
          </Link>
          <Link href="#" className="text-white hover:text-gold transition">
            About
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-dark-bg rounded-lg transition hidden sm:block">
            <Search size={20} className="text-white" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-dark-bg rounded-lg transition"
          >
            {isMenuOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-bg border-t border-gray-700 py-4 px-6 space-y-3">
          <Link
            href="#"
            className="block text-white hover:text-gold transition py-2"
          >
            Home
          </Link>
          <Link
            href="#"
            className="block text-white hover:text-gold transition py-2"
          >
            Trending
          </Link>
          <Link
            href="#"
            className="block text-white hover:text-gold transition py-2"
          >
            Browse
          </Link>
          <Link
            href="#"
            className="block text-white hover:text-gold transition py-2"
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
}
