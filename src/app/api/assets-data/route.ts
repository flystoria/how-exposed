import { NextResponse } from 'next/server';

const CRYPTO_SYMBOLS = ['BTC', 'ETH'];
const STOCK_SYMBOLS = ['AAPL', 'NVDA', 'MSFT', 'AMZN', 'GOOGL', 'META', 'TSLA', 'JPM', 'V', 'WMT', 'SPY', 'QQQ'];
const COMMODITY_SYMBOLS = ['XAU', 'XAG', 'XPT'];

// Map commodity symbols to their Alpha Vantage symbols
const COMMODITY_MAP = {
  'XAU': 'XAUUSD',
  'XAG': 'XAGUSD',
  'XPT': 'XPTUSD'
};

async function fetchCryptoData() {
    const response = await fetch(
      'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=BTC,ETH',
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY || '',
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
    throw new Error(`Crypto API Error: ${response.status}`);
  }

  return response.json();
}

async function fetchStockData(symbol: string) {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`,
    {
      headers: {
        'Accept': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Stock API Error: ${response.status}`);
    }

    const data = await response.json();
  return data['Global Quote'];
}

async function fetchCommodityData(symbol: string) {
  const avSymbol = COMMODITY_MAP[symbol as keyof typeof COMMODITY_MAP];
  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${avSymbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`,
    {
      headers: {
        'Accept': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Commodity API Error: ${response.status}`);
  }

  const data = await response.json();
  const timeSeriesData = data['Time Series (Daily)'];
  
  if (!timeSeriesData) {
    console.error('No time series data for', symbol, data);
    return null;
  }

  // Get the last two days of data
  const dates = Object.keys(timeSeriesData).sort().reverse();
  const today = timeSeriesData[dates[0]];
  const yesterday = timeSeriesData[dates[1]];

  if (!today || !yesterday) {
    console.error('Missing price data for', symbol);
    return null;
  }

  const currentPrice = parseFloat(today['4. close']);
  const previousPrice = parseFloat(yesterday['4. close']);
  const change24h = ((currentPrice - previousPrice) / previousPrice) * 100;

  return {
    price: currentPrice,
    change24h,
    marketCap: 0 // Not applicable for commodities
  };
}

async function fetchMarketCap(symbol: string) {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`,
    {
      headers: {
        'Accept': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Market Cap API Error: ${response.status}`);
  }

  const data = await response.json();
  return data['MarketCapitalization'];
}

export async function GET() {
  try {
    // Fetch crypto data
    const cryptoData = await fetchCryptoData();

    // Fetch stock data
    const stockDataPromises = STOCK_SYMBOLS.map(async (symbol) => {
      try {
        const [quoteData, marketCap] = await Promise.all([
          fetchStockData(symbol),
          fetchMarketCap(symbol)
        ]);

        return {
          symbol,
          price: parseFloat(quoteData['05. price']),
          change24h: parseFloat(quoteData['10. change percent'].replace('%', '')),
          marketCap: parseFloat(marketCap)
        };
      } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error);
        return {
          symbol,
          price: 0,
          change24h: 0,
          marketCap: 0
        };
      }
    });

    // Fetch commodity data
    const commodityDataPromises = COMMODITY_SYMBOLS.map(async (symbol) => {
      try {
        const data = await fetchCommodityData(symbol);
        if (!data) {
          return {
            symbol,
            price: 0,
            change24h: 0,
            marketCap: 0
          };
        }
        return {
          symbol,
          ...data
        };
      } catch (error) {
        console.error(`Error fetching commodity data for ${symbol}:`, error);
        return {
          symbol,
          price: 0,
          change24h: 0,
          marketCap: 0
        };
      }
    });

    const [stockResults, commodityResults] = await Promise.all([
      Promise.all(stockDataPromises),
      Promise.all(commodityDataPromises)
    ]);

    // Combine all data
    const combinedData = {
      crypto: cryptoData,
      stocks: Object.fromEntries(stockResults.map(item => [item.symbol, item])),
      commodities: Object.fromEntries(commodityResults.map(item => [item.symbol, item]))
    };

    return NextResponse.json(combinedData);
  } catch (error) {
    console.error('Error fetching assets data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch assets data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function fetchData() {
  // Implementation of fetchData function
}

// Refresh data every 30 minutes
const interval = setInterval(fetchData, 30 * 60 * 1000);

// Cleanup function
function cleanup() {
  clearInterval(interval);
}

// Export the cleanup function
export { cleanup }; 