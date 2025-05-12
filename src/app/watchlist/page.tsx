"use client";

import Image from "next/image";
import { FaSearch, FaBars, FaPlus, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";
import { assetsData } from "../assets/assetsData";
import { useWatchlist } from "../../components/WatchlistContext";

interface Asset {
  name: string;
  symbol: string;
  exposureScore: number;
  type: string;
  indicators: {
    name: string;
    logic: string;
    exposed: boolean;
    icon: string;
  }[];
}

interface WatchlistItem {
  symbol: string;
  addedAt: number;
}

const WATCHLIST_LIMIT = 10;
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default function Reports() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const [showExpirationWarning, setShowExpirationWarning] = useState(false);

  const { watchlist, addToWatchlist, removeFromWatchlist, limit } = useWatchlist();

  // Remove all local watchlist state logic, use context instead

  const handleAddToWatchlist = (symbol: string) => {
    const added = addToWatchlist(symbol);
    if (!added) {
      setShowLimitWarning(true);
      setTimeout(() => setShowLimitWarning(false), 5000);
      return;
    }
    setShowAddSuccess(true);
    setTimeout(() => setShowAddSuccess(false), 2000);
  };

  const handleRemoveFromWatchlist = (symbol: string) => {
    removeFromWatchlist(symbol);
  };

  const filteredAssets = Object.entries(assetsData as Record<string, Asset>).filter(([symbol, asset]) => 
    symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-[#101c2c] font-['Poppins'] overflow-x-hidden">
      {/* Watchlist Content */}
      <main className="max-w-5xl mx-auto mt-20 px-4 flex flex-col gap-8">
        <h1 className="text-5xl md:text-7xl font-bold text-center leading-tight mb-8">Watchlist</h1>
        
        {/* Warnings */}
        {showLimitWarning && (
          <div className="fixed top-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            Maximum of {limit} assets allowed in watchlist
          </div>
        )}
        {showExpirationWarning && (
          <div className="fixed top-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            Some watchlist items have expired and been removed
          </div>
        )}
        {showAddSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            Asset added to watchlist!
          </div>
        )}

        {/* Watchlist Info */}
        <div className="text-center text-gray-600 mb-4">
          <p>Watchlist items are stored in your browser and expire after 24 hours</p>
          <p className="mt-2">Current watchlist: {watchlist.length}/{limit} assets</p>
        </div>

        {/* Search and Add Section */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative w-full max-w-2xl mx-auto">
            <input 
              type="text" 
              placeholder="Search for assets..." 
              className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          {/* Search Results */}
          {searchQuery && (
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-2xl mx-auto w-full">
              {filteredAssets.map(([symbol, asset]) => (
                <div key={symbol} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <span className="font-semibold">{asset.name}</span>
                    <span className="text-gray-500 ml-2">({symbol})</span>
                  </div>
                  <button
                    onClick={() => handleAddToWatchlist(symbol)}
                    disabled={watchlist.some(item => item.symbol === symbol)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                      watchlist.some(item => item.symbol === symbol)
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    <FaPlus size={14} />
                    {watchlist.some(item => item.symbol === symbol) ? 'Added' : 'Add to Watchlist'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Watchlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {watchlist.length > 0 ? (
            watchlist.map(({ symbol }) => {
              const asset = (assetsData as Record<string, Asset>)[symbol];
              if (!asset) return null;
              
              return (
                <div key={symbol} className="bg-white rounded-2xl shadow p-6 flex flex-col min-h-[260px] relative">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="bg-gray-200 text-xs px-3 py-1 rounded-full font-semibold">Watchlist</span>
                    <button
                      onClick={() => handleRemoveFromWatchlist(symbol)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Remove from watchlist"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                  <div className="mb-4 flex items-center justify-center text-blue-600 text-4xl">
                    <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 3v18h18V3H3zm3 3h12v12H6V6zm3 3v6h6V9H9z"/>
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-blue-700 mb-2">{asset.name}</h2>
                  <p className="text-gray-700 text-sm mb-2">Symbol: {symbol}</p>
                  <div className="mt-auto">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Exposure Score:</span>
                      <span className="text-lg font-bold text-blue-600">{asset.exposureScore}</span>
                    </div>
                    <Link href={`/assets/${symbol}`} className="text-blue-600 font-semibold text-sm mt-2 block hover:underline">
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No assets in your watchlist yet. Search and add some assets above!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 