import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { assetsData } from '../app/assets/assetsData';

interface Asset {
  id: number;
  name: string;
  symbol: string;
  marketCap?: number;
  price?: number;
  change24h?: number;
  exposureScore?: number;
}

const assets: Asset[] = [
  { id: 1, name: 'Gold', symbol: 'XAU' },
  { id: 2, name: 'Apple', symbol: 'AAPL' },
  { id: 3, name: 'NVIDIA', symbol: 'NVDA' },
  { id: 4, name: 'Microsoft', symbol: 'MSFT' },
  { id: 5, name: 'Amazon', symbol: 'AMZN' },
  { id: 6, name: 'Alphabet', symbol: 'GOOGL' },
  { id: 7, name: 'Bitcoin', symbol: 'BTC' },
  { id: 8, name: 'Saudi Aramco', symbol: '2222.SR' },
  { id: 9, name: 'Silver', symbol: 'XAG' },
  { id: 10, name: 'Meta Platforms', symbol: 'META' },
  { id: 11, name: 'Tesla', symbol: 'TSLA' },
  { id: 12, name: 'Berkshire Hathaway', symbol: 'BRK-A' },
  { id: 13, name: 'Ethereum', symbol: 'ETH' },
  { id: 14, name: 'JPMorgan Chase', symbol: 'JPM' },
  { id: 15, name: 'Visa', symbol: 'V' },
  { id: 16, name: 'Walmart', symbol: 'WMT' },
  { id: 17, name: 'Tencent', symbol: '0700.HK' },
  { id: 18, name: 'SPDR S&P 500 ETF', symbol: 'SPY' },
  { id: 19, name: 'Platinum', symbol: 'XPT' },
  { id: 20, name: 'Invesco QQQ Trust', symbol: 'QQQ' },
];

const AssetsTable: React.FC = () => {
  const [assetsData, setAssetsData] = useState<Asset[]>(assets);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/assets-data');
        if (!response.ok) {
          throw new Error('Failed to fetch assets data');
        }
        const data = await response.json();
        
        // Update assets with real data
        const updatedAssets = assets.map(asset => {
          let assetData;
          if (['BTC', 'ETH'].includes(asset.symbol)) {
            assetData = data.crypto?.data?.[asset.symbol]?.[0];
            return {
              ...asset,
              price: assetData?.quote?.USD?.price,
              marketCap: assetData?.quote?.USD?.market_cap,
              change24h: assetData?.quote?.USD?.percent_change_24h,
            };
          } else if (['XAU', 'XAG', 'XPT'].includes(asset.symbol)) {
            assetData = data.commodities?.[asset.symbol];
            return {
              ...asset,
              price: assetData?.price,
              change24h: assetData?.change24h,
              marketCap: assetData?.marketCap,
            };
          } else {
            assetData = data.stocks?.[asset.symbol];
            return {
              ...asset,
              price: assetData?.price,
              marketCap: assetData?.marketCap,
              change24h: assetData?.change24h,
            };
          }
        });

        setAssetsData(updatedAssets);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24hr Change</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exposure Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {assets.map((asset) => (
            <tr key={asset.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link href={`/assets/${asset.symbol}`} className="text-sm font-medium text-blue-700 hover:underline">
                  <div>{asset.name}</div>
                  <div className="text-sm text-gray-500">{asset.symbol}</div>
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {isLoading ? (
                  <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  asset.marketCap ? `$${(asset.marketCap / 1e9).toFixed(2)}B` : '-'
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {isLoading ? (
                  <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  asset.price ? `$${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-'
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {isLoading ? (
                  <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                ) : asset.change24h ? (
                  <span className={asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {asset.change24h > 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                  </span>
                ) : (
                  '-'
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {isLoading ? (
                  <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  (assetsData as any)[asset.symbol]?.exposureScore ?? '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && (
        <div className="mt-4 text-center text-red-600">
          Error loading data: {error}
        </div>
      )}
    </div>
  );
};

export default AssetsTable; 