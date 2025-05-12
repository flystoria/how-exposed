'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface WatchlistItem {
  symbol: string;
  addedAt: number;
}

interface WatchlistContextType {
  watchlist: WatchlistItem[];
  addToWatchlist: (symbol: string) => boolean;
  removeFromWatchlist: (symbol: string) => void;
  limit: number;
}

const WATCHLIST_LIMIT = 10;
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('watchlist');
    if (saved) {
      const parsed: WatchlistItem[] = JSON.parse(saved);
      const now = Date.now();
      const valid = parsed.filter(item => now - item.addedAt < CACHE_EXPIRATION);
      setWatchlist(valid);
      if (valid.length < parsed.length) {
        localStorage.setItem('watchlist', JSON.stringify(valid));
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (symbol: string) => {
    if (watchlist.length >= WATCHLIST_LIMIT) return false;
    if (watchlist.some(item => item.symbol === symbol)) return false;
    setWatchlist([...watchlist, { symbol, addedAt: Date.now() }]);
    return true;
  };

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter(item => item.symbol !== symbol));
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, limit: WATCHLIST_LIMIT }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be used within WatchlistProvider');
  return ctx;
}; 