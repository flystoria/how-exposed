"use client";

import { useState } from "react";
import { FaBars, FaBitcoin, FaChartLine, FaExchangeAlt, FaTwitter, FaBalanceScale } from "react-icons/fa";
import type { IconType } from "react-icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import { assetsData } from "../assetsData";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const iconMap: Record<string, IconType> = {
  FaBitcoin: FaBitcoin,
  FaChartLine: FaChartLine,
  FaExchangeAlt: FaExchangeAlt,
  FaTwitter: FaTwitter,
  FaBalanceScale: FaBalanceScale,
};

interface Indicator {
  name: string;
  logic: string;
  exposed: boolean;
  icon: string;
}

interface Asset {
  name: string;
  symbol: string;
  exposureScore: number;
  type: string;
  indicators: Indicator[];
  color?: string;
  icon?: string;
}

// Helper functions for beta calculation
function calcReturns(prices: number[]): number[] {
  return prices.slice(1).map((p, i) => (p - prices[i]) / prices[i]);
}
function mean(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
function variance(arr: number[]): number {
  const m = mean(arr);
  return mean(arr.map(x => (x - m) ** 2));
}
function covariance(arr1: number[], arr2: number[]): number {
  const m1 = mean(arr1);
  const m2 = mean(arr2);
  return mean(arr1.map((x, i) => (x - m1) * (arr2[i] - m2)));
}
function rollingBeta(assetReturns: number[], marketReturns: number[], window: number): number[] {
  const betas: number[] = [];
  for (let i = 0; i <= assetReturns.length - window; i++) {
    const assetSlice = assetReturns.slice(i, i + window);
    const marketSlice = marketReturns.slice(i, i + window);
    const cov = covariance(assetSlice, marketSlice);
    const varM = variance(marketSlice);
    betas.push(varM !== 0 ? cov / varM : 0);
  }
  return betas;
}

// Test data for BTC and S&P 500
const btcPrices = [
  40000, 40200, 40100, 40500, 41000, 41200, 41500, 41800, 42000, 41900,
  42100, 42300, 42500, 42700, 43000, 43200, 43100, 43300, 43500, 43700,
  44000, 44200, 44100, 44300, 44500, 44700, 45000, 45200, 45100, 45300, 45500
];
const sp500Prices = [
  5000, 5010, 5005, 5020, 5030, 5040, 5050, 5060, 5070, 5065,
  5075, 5080, 5090, 5100, 5110, 5120, 5115, 5130, 5140, 5150,
  5160, 5170, 5165, 5180, 5190, 5200, 5210, 5220, 5215, 5230, 5240
];

export default function AssetPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const params = useParams();
  const symbolParam = params.symbol;
  const symbol = Array.isArray(symbolParam) ? symbolParam[0]?.toUpperCase() : symbolParam?.toUpperCase();
  const asset = (assetsData as Record<string, Asset>)[symbol as string];

  if (!asset) return <div className="p-8 text-center">Asset not found</div>;

  return (
    <div className="min-h-screen bg-white text-[#101c2c] font-['Poppins']">
      <div className="max-w-4xl mx-auto mt-12 px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            {(() => {
              const Icon = iconMap[asset.icon || "FaBitcoin"];
              return Icon ? <Icon className="text-4xl text-yellow-500" /> : null;
            })()}
            <div>
              <h1 className="text-4xl font-bold">{asset.name} <span className="text-2xl font-normal text-gray-500">({asset.symbol})</span></h1>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-lg text-gray-500">Exposure Score</span>
            <span className="text-6xl font-extrabold" style={{ color: asset.color || '#FFB300' }}>{asset.exposureScore}</span>
          </div>
        </div>

        {/* Indicators Grid */}
        <div className="bg-gray-50 rounded-2xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Key Indicators & Scoring Logic</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-2 pr-4">Indicator</th>
                  <th className="py-2">Score Logic</th>
                  <th className="py-2">Sentiment</th>
                </tr>
              </thead>
              <tbody>
                {asset.indicators.map((ind: Indicator, i: number) => {
                  const Icon = iconMap[ind.icon as keyof typeof iconMap] || null;
                  return (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-2 pr-4 font-medium">{Icon && <Icon className="inline mr-1" />}{ind.name}</td>
                      <td className="py-2 text-gray-700">{ind.logic}</td>
                      <td className="py-2 text-2xl">{ind.exposed ? "✅" : "🚫"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* BTC Beta Exposure Chart (only for BTC) */}
        {asset.symbol === 'BTC' && (() => {
          const btcReturns = calcReturns(btcPrices);
          const sp500Returns = calcReturns(sp500Prices);
          const window = 10;
          let betaSeries = rollingBeta(btcReturns, sp500Returns, window);

          // Filter out NaN/Infinity
          betaSeries = betaSeries.map(b => (isFinite(b) ? b : null)).filter(b => b !== null) as number[];

          const labels = betaSeries.map((_, i) => `Day ${i + window}`);
          const data = {
            labels,
            datasets: [
              {
                label: 'BTC Rolling Beta (window=10 days)',
                data: betaSeries,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                tension: 0.3,
                fill: true,
                pointRadius: 3,
              },
            ],
          };
          const minY = Math.floor(Math.min(...betaSeries, 0));
          const maxY = Math.ceil(Math.max(...betaSeries, 2));
          const options = {
            responsive: true,
            plugins: {
              legend: { display: true },
              title: { display: true, text: 'BTC Market Exposure (Beta) Over Time' },
            },
            scales: {
              y: {
                title: { display: true, text: 'Beta' },
                min: minY,
                max: maxY,
              },
              x: {
                title: { display: true, text: 'Time (Days)' },
              },
            },
          };
          return (
            <div className="mb-8">
              <Line data={data} options={options} />
            </div>
          );
        })()}

        {/* Normalization & Weighting */}

        {/*
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h3 className="text-lg font-semibold mb-2">Normalization & Weighting</h3>
          <ul className="list-disc ml-6 text-gray-700 mb-2">
            <li>Normalize each indicator (Min-Max or Z-score)</li>
            <li>Technical: 25%, Macro: 30%, Sentiment: 25%, On-chain: 20% (crypto only)</li>
          </ul>
          <div className="bg-gray-100 rounded p-4 text-xs font-mono text-gray-800">
            score = (
            0.25 * technical_score +<br />
            0.30 * macro_score +<br />
            0.25 * sentiment_score +<br />
            0.20 * on_chain_score
            )
          </div>
        </div>
        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
        */}
      </div>
    </div>
  );
}