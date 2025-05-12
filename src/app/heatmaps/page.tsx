"use client";

import Image from "next/image";
import { FaSearch, FaBars } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

export default function Heatmaps() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#101c2c] font-['Poppins'] overflow-x-hidden">
      {/* Heatmaps Content */}
      <main className="max-w-5xl mx-auto mt-20 px-4 flex flex-col gap-8">
        <h1 className="text-5xl md:text-7xl font-bold text-center leading-tight mb-8">Heatmaps</h1>
        <div className="bg-[#f2f2f2] rounded-3xl shadow-lg p-8 min-h-[300px] flex flex-col items-center justify-center">
          <span className="text-2xl text-gray-500">Heatmap content coming soon...</span>
        </div>
      </main>
    </div>
  );
} 