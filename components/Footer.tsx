'use client';

export default function Footer() {
  return (
    <footer className="bg-dark-secondary border-t border-gray-700 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo Section */}
          <div>
            <h3 className="text-2xl font-black mb-4">
              <span className="text-white">Movies</span>
              <span className="text-gold">Hub</span>
            </h3>
            <p className="text-gray-400">
              Your ultimate destination for movies and entertainment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-gold transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition">
                  Trending
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition">
                  Browse
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-gold transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Newsletter</h4>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded bg-dark-bg border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gold"
              />
              <button className="px-4 py-2 bg-gold text-dark-bg rounded font-bold hover:bg-gold-hover transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 py-8">
          <p className="text-center text-gray-400">
            &copy; 2024 MoviesHub. All rights reserved. | Built with passion for cinema lovers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
