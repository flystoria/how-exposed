"use client";

import Image from "next/image";
import { FaSearch, FaBars, FaChartBar, FaFlagUsa, FaEuroSign, FaYenSign, FaIndustry, FaBalanceScale } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

export default function EconomicCalendars() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#101c2c] font-['Poppins'] overflow-x-hidden">
      {/* Economic Calendars Content */}
      <main className="max-w-5xl mx-auto mt-20 px-4 flex flex-col gap-8">
        <h1 className="text-5xl md:text-7xl font-bold text-center leading-tight mb-8">Economic Calendars</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Event 1 */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col min-h-[220px] relative">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-blue-700 text-3xl"><FaChartBar /></span>
              <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full font-semibold">High Impact</span>
            </div>
            <h2 className="text-lg font-bold text-blue-700 mb-1">US Non-Farm Payrolls</h2>
            <div className="flex items-center text-sm text-gray-500 mb-2"><FaFlagUsa className="mr-1" /> United States &middot; Fri, 8:30 AM</div>
            <p className="text-gray-700 text-sm mb-2">Monthly change in employment excluding the farming industry. Major market mover for USD and equities.</p>
          </div>
          {/* Event 2 */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col min-h-[220px] relative">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-green-700 text-3xl"><FaBalanceScale /></span>
              <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-semibold">Medium Impact</span>
            </div>
            <h2 className="text-lg font-bold text-blue-700 mb-1">ECB Interest Rate Decision</h2>
            <div className="flex items-center text-sm text-gray-500 mb-2"><FaEuroSign className="mr-1" /> Eurozone &middot; Thu, 1:45 PM</div>
            <p className="text-gray-700 text-sm mb-2">The European Central Bank announces its key interest rate, affecting EUR and European markets.</p>
          </div>
          {/* Event 3 */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col min-h-[220px] relative">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-yellow-700 text-3xl"><FaIndustry /></span>
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">Low Impact</span>
            </div>
            <h2 className="text-lg font-bold text-blue-700 mb-1">Japan Industrial Production</h2>
            <div className="flex items-center text-sm text-gray-500 mb-2"><FaYenSign className="mr-1" /> Japan &middot; Wed, 11:50 PM</div>
            <p className="text-gray-700 text-sm mb-2">Measures the change in the total inflation-adjusted value of output produced by manufacturers, mines, and utilities.</p>
          </div>
          {/* Event 4 */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col min-h-[220px] relative">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-indigo-700 text-3xl"><FaChartBar /></span>
              <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full font-semibold">High Impact</span>
            </div>
            <h2 className="text-lg font-bold text-blue-700 mb-1">US CPI Inflation Rate</h2>
            <div className="flex items-center text-sm text-gray-500 mb-2"><FaFlagUsa className="mr-1" /> United States &middot; Tue, 8:30 AM</div>
            <p className="text-gray-700 text-sm mb-2">Consumer Price Index measures the change in the price of goods and services. Key for inflation outlook.</p>
          </div>
          {/* Event 5 */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col min-h-[220px] relative">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-blue-700 text-3xl"><FaBalanceScale /></span>
              <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-semibold">Medium Impact</span>
            </div>
            <h2 className="text-lg font-bold text-blue-700 mb-1">UK BoE Rate Statement</h2>
            <div className="flex items-center text-sm text-gray-500 mb-2"><span className="mr-1">🇬🇧</span> United Kingdom &middot; Thu, 12:00 PM</div>
            <p className="text-gray-700 text-sm mb-2">The Bank of England's statement on monetary policy and interest rates. Influences GBP and UK markets.</p>
          </div>
          {/* Event 6 */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col min-h-[220px] relative">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-green-700 text-3xl"><FaIndustry /></span>
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">Low Impact</span>
            </div>
            <h2 className="text-lg font-bold text-blue-700 mb-1">Germany Manufacturing PMI</h2>
            <div className="flex items-center text-sm text-gray-500 mb-2"><FaEuroSign className="mr-1" /> Germany &middot; Mon, 3:55 AM</div>
            <p className="text-gray-700 text-sm mb-2">Purchasing Managers' Index for manufacturing, a leading indicator of economic health in Germany.</p>
          </div>
        </div>
      </main>
    </div>
  );
} 