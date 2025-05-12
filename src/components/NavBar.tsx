'use client'

import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { useWatchlist } from "./WatchlistContext";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { watchlist } = useWatchlist();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white rounded-b-2xl shadow-md border-b border-gray-200">
      <Link href="/" className="text-4xl font-small text-[#101c2c] mr-8 font-['Helvetica']">👀 Exposed?</Link>
      <div className="hidden md:flex gap-8 text-lg font-small text-[#000000]">
        <Link href="/reports" className="hover:text-[#ffe082]">Reports</Link>
        <Link href="/news" className="hover:text-[#ffe082]">News</Link>
        <Link href="/cryptotwitter" className="hover:text-[#ffe082]">CryptoTwitter</Link>
        <Link href="/economic-calendars" className="hover:text-[#ffe082]">Economic Calendars</Link>
        <Link href="/fed-minutes" className="hover:text-[#ffe082]">Fed Minutes</Link>
        <div className="relative">
          <Link href="/watchlist" className="hover:text-[#ffe082]">Watchlist</Link>
          {watchlist.length > 0 && (
            <span className="absolute -top-2 -right-4 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {watchlist.length}
            </span>
          )}
        </div>
        <Link href="/heatmaps" className="hover:text-[#ffe082]">Heatmaps</Link>
      </div>
      <FaBars className="md:hidden text-2xl cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)} />
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-full left-0 w-full z-50">
          <Link href="/reports" className="block px-8 py-2 hover:bg-gray-100">Reports</Link>
          <Link href="/news" className="block px-8 py-2 hover:bg-gray-100">News</Link>
          <Link href="/cryptotwitter" className="block px-8 py-2 hover:bg-gray-100">CryptoTwitter</Link>
          <Link href="/economic-calendars" className="block px-8 py-2 hover:bg-gray-100">Economic Calendars</Link>
          <Link href="/fed-minutes" className="block px-8 py-2 hover:bg-gray-100">Fed Minutes</Link>
          <div className="relative">
            <Link href="/watchlist" className="block px-8 py-2 hover:bg-gray-100">Watchlist</Link>
            {watchlist.length > 0 && (
              <span className="absolute top-2 right-4 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {watchlist.length}
              </span>
            )}
          </div>
          <Link href="/heatmaps" className="block px-8 py-2 hover:bg-gray-100">Heatmaps</Link>
        </div>
      )}
    </nav>
  );
} 