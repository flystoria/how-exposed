"use client";

import Image from "next/image";
import { FaSearch, FaBars, FaChartLine, FaExclamationTriangle, FaProjectDiagram, FaIndustry, FaGlobeAmericas, FaSlidersH } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

export default function Reports() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#101c2c] font-['Poppins'] overflow-x-hidden">
      {/* Reports Content */}
      <main className="max-w-5xl mx-auto mt-20 px-4 flex flex-col gap-8">
        <h1 className="text-5xl md:text-7xl font-bold text-center leading-tight mb-8">Reports</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col min-h-[340px] relative">
            <span className="absolute top-4 right-4 bg-gray-200 text-xs px-3 py-1 rounded-full font-semibold">Reports</span>
            <div className="mb-4 flex items-center justify-center h-20 text-blue-700 text-5xl">
              <FaChartLine />
            </div>
            <h2 className="text-xl font-bold text-blue-700 mb-2">Market Benchmark Reports</h2>
            <p className="text-gray-700 text-sm mb-2">A comprehensive summary of your market's indices exposure across all tracked assets, highlighting concentration and diversification.</p>
            <span className="text-blue-600 font-semibold text-sm mt-auto">View Details</span>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col min-h-[340px] relative">
            <span className="absolute top-4 right-4 bg-gray-200 text-xs px-3 py-1 rounded-full font-semibold">Reports</span>
            <div className="mb-4 flex items-center justify-center h-20 text-yellow-600 text-5xl">
              <FaExclamationTriangle />
            </div>
            <h2 className="text-xl font-bold text-blue-700 mb-2">Risk and Volatility Reports</h2>
            <p className="text-gray-700 text-sm mb-2">Visualize, analyse and quantify the asset's risk profile relative to the markets.</p>
            <span className="text-blue-600 font-semibold text-sm mt-auto">View Details</span>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col min-h-[340px] relative">
            <span className="absolute top-4 right-4 bg-gray-200 text-xs px-3 py-1 rounded-full font-semibold">Reports</span>
            <div className="mb-4 flex items-center justify-center h-20 text-purple-700 text-5xl">
              <FaProjectDiagram />
            </div>
            <h2 className="text-xl font-bold text-blue-700 mb-2">Portfolio Exposure and Allocation Reports</h2>
            <p className="text-gray-700 text-sm mb-2">Analyze how assets are allocated within portfolios, revealing exposure to specific asset classes or strategies.
</p>
            <span className="text-blue-600 font-semibold text-sm mt-auto">View Details</span>
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col min-h-[340px] relative">
            <span className="absolute top-4 right-4 bg-gray-200 text-xs px-3 py-1 rounded-full font-semibold">Reports</span>
            <div className="mb-4 flex items-center justify-center h-20 text-green-700 text-5xl">
              <FaIndustry />
            </div>
            <h2 className="text-xl font-bold text-blue-700 mb-2">Sector and Industry Exposure Reports</h2>
            <p className="text-gray-700 text-sm mb-2">Assess the asset's exposure to specific sectors or industries.</p>
            <span className="text-blue-600 font-semibold text-sm mt-auto">View Details</span>
          </div>
          {/* Card 5 */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col min-h-[340px] relative">
            <span className="absolute top-4 right-4 bg-gray-200 text-xs px-3 py-1 rounded-full font-semibold">Reports</span>
            <div className="mb-4 flex items-center justify-center h-20 text-indigo-700 text-5xl">
              <FaGlobeAmericas />
            </div>
            <h2 className="text-xl font-bold text-blue-700 mb-2">Geographic Exposure Reports</h2>
            <p className="text-gray-700 text-sm mb-2">Analyze exposure to specific regions or countries.
</p>
            <span className="text-blue-600 font-semibold text-sm mt-auto">View Details</span>
          </div>
          {/* Card 6 */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col min-h-[340px] relative">
            <span className="absolute top-4 right-4 bg-gray-200 text-xs px-3 py-1 rounded-full font-semibold">Reports</span>
            <div className="mb-4 flex items-center justify-center h-20 text-pink-700 text-5xl">
              <FaSlidersH />
            </div>
            <h2 className="text-xl font-bold text-blue-700 mb-2">Factor Exposure Reports</h2>
            <p className="text-gray-700 text-sm mb-2">Analyze exposure to investment factors driving returns (e.g., value, growth, momentum).</p>
            <span className="text-blue-600 font-semibold text-sm mt-auto">View Details</span>
          </div>
        </div>
      </main>
    </div>
  );
} 