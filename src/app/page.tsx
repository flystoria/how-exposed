"use client";

import 'dotenv/config'

import Image from "next/image";
import { FaSearch, FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";
import AssetsTable from '@/components/AssetsTable';

// Add interface for score data
interface ScoreData {
  symbol: string;
  score: number;
  image: string;
}

// Add interfaces for API data
interface BTCPriceData {
  timestamp: string;
  price: number;
}

interface FearGreedData {
  value: number;
  value_classification: string;
  timestamp: string;
}

export default function Home() {
  const assets = ["BTC", "GOLD", "MSFT", "APPL", "GOOGL", "META", "SILVER", "TESLA", "JPM", "NVDA"];
  const [currentAsset, setCurrentAsset] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Add state for scores
  const [scores, setScores] = useState<ScoreData[]>([
    { symbol: "XAU", score: 52, image: "/gold.png" },
    { symbol: "BTC", score: 73, image: "/btc.png" },
    { symbol: "MSFT", score: 60, image: "/msft.png" }
  ]);

  const [btcData, setBtcData] = useState<BTCPriceData[]>([]);
  const [btcLoading, setBtcLoading] = useState(true);
  const [btcError, setBtcError] = useState<string | null>(null);

  const [fearGreedData, setFearGreedData] = useState<FearGreedData | null>(null);
  const [fgLoading, setFgLoading] = useState(true);
  const [fgError, setFgError] = useState<string | null>(null);

  // Function to calculate needle position
  const calculateNeedlePosition = (score: number) => {
    // Convert score (0-100) to angle (180-0 degrees, left to right)
    const angle = 180 - (score / 100) * 180;
    // Convert angle to radians
    const radians = (angle * Math.PI) / 180;
    // Calculate x and y coordinates for the needle end
    // Using a shorter radius (30 instead of 40) to make the needle shorter
    const x = 60 + 30 * Math.cos(radians);
    const y = 60 - 30 * Math.sin(radians);
    return { x, y };
  };

  // Function to fetch scores from backend (to be implemented)
  const fetchScores = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/scores');
      const data = await response.json();
      setScores(data);
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };

  // Function to fetch BTC price data
  const fetchBTCData = async () => {
    try {
      setBtcLoading(true);
      setBtcError(null);
      const response = await fetch('/api/btc-price');
      if (!response.ok) throw new Error('Failed to fetch BTC data');
      const data = await response.json();
      setBtcData(data.data);
    } catch (error) {
      setBtcError('Failed to load BTC price data');
    } finally {
      setBtcLoading(false);
    }
  };

  // Function to fetch Fear & Greed Index
  const fetchFearGreedData = async () => {
    try {
      setFgLoading(true);
      setFgError(null);
      const response = await fetch('/api/fear-greed');
      if (!response.ok) throw new Error('Failed to fetch Fear & Greed data');
      const data = await response.json();
      setFearGreedData(data.data);
    } catch (error) {
      setFgError('Failed to load Fear & Greed data');
    } finally {
      setFgLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial scores
    fetchScores();
    
    // Set up interval to fetch scores periodically
    const interval = setInterval(fetchScores, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchBTCData();
    fetchFearGreedData();
    // Set up interval to fetch data every 5 minutes
    const interval = setInterval(() => {
      fetchBTCData();
      fetchFearGreedData();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  // Add back the animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentAsset((prev) => (prev + 1) % assets.length);
        setIsVisible(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#101c2c] font-['Poppins'] overflow-x-hidden">
      {/* Main Content */}
      <main className="max-w-5xl mx-auto mt-20 px-4 flex flex-col gap-8">
        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-bold text-center leading-tight mb-1">
          How Exposed is <br />
          <div className="flex items-center justify-center">
            <h2 className={`mt-7 mr-2 bg-gradient-to-r from-[#722A9B] to-[#C75757] text-transparent bg-clip-text transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} cursor-pointer hover:no-underline`}>
              {assets[currentAsset]}
            </h2>
            <span className="mt-7 text-4xl font-small ml-2">? 👀</span>
          </div>
        </h1>

        {/* Search for ticker*/}
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-2xl">
            <input type="text" placeholder="Search for ticker" className="w-full mt-7 mb-10 p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {scores.map((item) => (
            <Link href={`/assets/${item.symbol}`} key={item.symbol} className="block">
              <div className="bg-[#f2f2f2] rounded-3xl shadow-lg p-8 flex flex-col items-center min-h-[180px] relative transition-transform hover:scale-105">
                <div className="absolute top-6 left-6 text-white text-xl">
                  <Image src={item.image} alt={item.symbol} width={38} height={38} className="mr-4" />
                </div>
                <span className="text-black font-semibold text-lg mb-2">{item.symbol}</span>
                {/* Dynamic Gauge Meter SVG */}
                <div className="relative w-[120px] h-[70px] flex items-center justify-center">
                  <svg width="120" height="70" viewBox="0 0 120 70">
                    <defs>
                      <linearGradient id={`gauge-gradient-${item.symbol}`} x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stop-color="#FF6B6B" />
                        <stop offset="50%" stop-color="#FFE066" />
                        <stop offset="100%" stop-color="#A3D977" />
                      </linearGradient>
                    </defs>
                    {/* Gradient Arc */}
                    <path d="M20,60 A40,40 0 0,1 60,20 A40,40 0 0,1 100,60" stroke={`url(#gauge-gradient-${item.symbol})`} strokeWidth="12" fill="none" />
                    {/* Dynamic Needle */}
                    <g>
                      {(() => {
                        const { x, y } = calculateNeedlePosition(item.score);
                        return (
                          <>
                            <line x1="60" y1="60" x2={x} y2={y} stroke="#222" strokeWidth="4" strokeLinecap="round" />
                            <circle cx="60" cy="60" r="5" fill="#222" />
                          </>
                        );
                      })()}
                    </g>
                  </svg>
                  <span className="absolute left-[80] top-[105] -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-black">{item.score}</span>
                </div>
                <div className="flex justify-between w-full mt-7 text-sm text-[#000000]">
                  Exposure score: 
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Markets and Price Change Row */}
        <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] mt-10">
          <div className="flex flex-col lg:flex-row gap-6 px-4 max-w-[2000px] mx-auto">
            {/* Stock Markets Table */}
            <div className="bg-[#f2f2f2] rounded-xl p-6 flex-1 min-w-[220px] shadow">
              <span className="text-lg font-semibold mb-4 block">Indices Markets</span>
              <div className="flex justify-between text-[#bdbdbd] text-xs mb-2">
                <span>Markets</span>
                <span>Change</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Dow Jones</span>
                <span className="text-[#ef5350]">-0.2 %</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>S&amp;P 500</span>
                <span className="text-[#81c784]">+1.0%</span>
              </div>
              <div className="flex justify-between">
                <span>NASDAQ</span>
                <span className="text-[#81c784]">+1.3%</span>
              </div>
            </div>

            {/* Top Securities Market Chart */}
            <div className="bg-[#f2f2f2] rounded-xl p-6 flex-1 min-w-[220px] shadow">
              <span className="text-lg font-semibold mb-4 block">Top 3 Securities</span>
              <div className="flex justify-between text-[#bdbdbd] text-xs mb-2">
                <span>Markets</span>
                <span>Change</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>DXY</span>
                <span className="text-[#ef5350]">-0.2 %</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>S&amp;P 500</span>
                <span className="text-[#81c784]">+1.0%</span>
              </div>
              <div className="flex justify-between">
                <span>NASDAQ</span>
                <span className="text-[#81c784]">+1.3%</span>
              </div>
            </div>

              {/* Top 3 Crypto Market Chart */}
              <div className="bg-[#f2f2f2] rounded-xl p-6 flex-1 min-w-[220px] shadow">
                <span className="text-lg font-semibold mb-4 block">Top 3 Crypto</span>
                <div className="flex justify-between text-[#bdbdbd] text-xs mb-2">
                  <span>Markets</span>
                  <span>Change</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>BTC</span>
                  <span className="text-[#ef5350]">-0.2 %</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>ETH</span>
                  <span className="text-[#81c784]">+1.0%</span>
                </div>
                <div className="flex justify-between">
                  <span>SOL</span>
                  <span className="text-[#81c784]">+1.3%</span>
                </div>
              </div>

              {/* Currencies Market */}
              <div className="bg-[#f2f2f2] rounded-xl p-6 flex-1 min-w-[220px] shadow">
                <span className="text-lg font-semibold mb-4 block">Currencies</span>
                <div className="flex justify-between text-[#bdbdbd] text-xs mb-2">
                  <span>Markets</span>
                  <span>Change</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>EUR/USD</span>
                  <span className="text-[#ef5350]">-0.2 %</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>GBP/USD</span>
                  <span className="text-[#81c784]">+1.0%</span>
                </div>
                <div className="flex justify-between">
                  <span>USD/JPY</span>
                  <span className="text-[#81c784]">+1.3%</span>
                </div>
              </div>
            </div>
          </div>

        {/* BTC Price Chart and Fear, Greed Index */}
        <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] mt-10">
          <div className="flex flex-col lg:flex-row gap-6 px-4 max-w-[2000px] mx-auto">
            {/* BTC Price Chart */}
            <div className="bg-[#f2f2f2] rounded-xl p-6 flex-1 shadow">
              <span className="text-lg font-semibold mb-4 block">BTC Price (30 Days)</span>
              <div className="h-[200px] relative">
                {btcLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                ) : btcError ? (
                  <div className="flex items-center justify-center h-full text-red-500">
                    {btcError}
                  </div>
                ) : btcData.length > 0 ? (
                  <>
                    <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none">
                      <path
                        d={btcData.reduce((acc, point, index) => {
                          const x = (index / (btcData.length - 1)) * 800;
                          const y = 200 - ((point.price - Math.min(...btcData.map(p => p.price))) / 
                            (Math.max(...btcData.map(p => p.price)) - Math.min(...btcData.map(p => p.price)))) * 180;
                          return acc + (index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
                        }, '')}
                        fill="none"
                        stroke="#4fc3f7"
                        strokeWidth="2"
                      />
                    </svg>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                      <span>{new Date(btcData[0]?.timestamp).toLocaleDateString()}</span>
                      <span>{new Date(btcData[btcData.length - 1]?.timestamp).toLocaleDateString()}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No data available
                  </div>
                )}
              </div>
            </div>

            {/* Fear & Greed Index */}
            <div className="bg-[#f2f2f2] rounded-xl p-6 flex-1 shadow">
              <span className="text-lg font-semibold mb-4 block">Crypto Fear & Greed Index</span>
              <div className="flex flex-col items-center justify-center h-[200px]">
                {fgLoading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                ) : fgError ? (
                  <div className="text-red-500">{fgError}</div>
                ) : fearGreedData ? (
                  <>
                    <div className="text-4xl font-bold mb-2">{fearGreedData.value}</div>
                    <div className="text-lg text-gray-600">{fearGreedData.value_classification}</div>
                    <div className="w-full max-w-[200px] h-4 bg-gray-200 rounded-full mt-4">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${fearGreedData.value}%`,
                          backgroundColor: fearGreedData.value < 25 ? '#ef5350' :
                            fearGreedData.value < 50 ? '#ffb74d' :
                            fearGreedData.value < 75 ? '#81c784' : '#4fc3f7'
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-gray-500">No data available</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Assets Table */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Top Assets</h2>
          <AssetsTable />
        </div>

        {/* Stock Market Heatmap */}

        {/* Crypto Market Heatmap */}

        {/* Currencies Heatmap */}
        
        
      </main>
    </div>
  );
}
