export const assetsData = {
  BTC: {
    name: "Bitcoin",
    symbol: "BTC",
    exposureScore: 73,
    type: "crypto",
    indicators: [
      { name: "Price Volatility (7d, 30d)", logic: "Higher = more exposed (normalize standard deviation)", exposed: true, icon: "FaChartLine" },
      { name: "Funding Rate (Binance/Bybit)", logic: "> 0.01% = bullish overexposure (scale 0–100 based on avg range)", exposed: true, icon: "FaBalanceScale" },
      { name: "NVT Ratio", logic: "High = overvalued (compare to 90-day average)", exposed: true, icon: "FaExchangeAlt" },
      { name: "Exchange Inflows", logic: "High = possible sell pressure → more exposed", exposed: true, icon: "FaExchangeAlt" },
      { name: "Social Volume / Twitter Trends", logic: "Spikes = speculative attention → more exposure", exposed: true, icon: "FaTwitter" },
      { name: "BTC Dominance", logic: "Falling dominance = altcoins rising = more speculative risk", exposed: true, icon: "FaBalanceScale" },
    ]
  },
  XAU: {
    name: "Gold",
    symbol: "XAU",
    exposureScore: 52,
    type: "metal",
    indicators: [
      { name: "DXY (Dollar Index)", logic: "Rising dollar = bearish for gold → more exposed", exposed: true, icon: "FaBalanceScale" },
      { name: "10Y Real Yields", logic: "Higher real yields = bad for gold → more exposed", exposed: true, icon: "FaChartLine" },
      { name: "ETF Flows (e.g. GLD)", logic: "Outflows = bearish → higher exposure", exposed: true, icon: "FaExchangeAlt" },
      { name: "Futures COT Positioning", logic: "Overleveraged long positions = more exposed", exposed: true, icon: "FaBalanceScale" },
      { name: "Inflation Rate (CPI YoY)", logic: "Falling CPI = less need for hedge = more exposed", exposed: true, icon: "FaChartLine" },
    ]
  },
  SPY: {
    name: "SPDR S&P 500 ETF",
    symbol: "SPY",
    exposureScore: 60,
    type: "stock",
    indicators: [
      { name: "P/E Ratio", logic: "Higher = more exposed", exposed: true, icon: "FaBalanceScale" },
      { name: "VIX (Volatility Index)", logic: "Spike = panic → exposed (but too low = complacency = also exposed)", exposed: true, icon: "FaChartLine" },
      { name: "Breadth (Adv/Decline)", logic: "Weak breadth = few stocks leading = unhealthy = more exposure", exposed: true, icon: "FaExchangeAlt" },
      { name: "Insider Selling", logic: "More selling = caution = more exposed", exposed: true, icon: "FaTwitter" },
      { name: "Interest Rate Expectations", logic: "Rising rates = negative for growth = more exposure", exposed: true, icon: "FaBalanceScale" },
    ]
  },
  XAG: {
    name: "Silver",
    symbol: "XAG",
    exposureScore: 48,
    type: "metal",
    indicators: [
      { name: "DXY (Dollar Index)", logic: "Rising dollar = bearish for silver → more exposed", exposed: true, icon: "FaBalanceScale" },
      { name: "ETF Flows (e.g. SLV)", logic: "Outflows = bearish → higher exposure", exposed: true, icon: "FaExchangeAlt" },
      { name: "Industrial Demand", logic: "Falling demand = more exposed", exposed: true, icon: "FaChartLine" },
      { name: "Futures COT Positioning", logic: "Overleveraged long positions = more exposed", exposed: true, icon: "FaBalanceScale" },
    ]
  },
  MSFT: {
    name: "Microsoft",
    symbol: "MSFT",
    exposureScore: 60,
    type: "stock",
    indicators: [
      { name: "P/E Ratio", logic: "Higher = more exposed", exposed: true, icon: "FaBalanceScale" },
      { name: "Earnings Growth", logic: "Slowing growth = more exposed", exposed: true, icon: "FaChartLine" },
      { name: "Insider Selling", logic: "More selling = caution = more exposed", exposed: true, icon: "FaTwitter" },
      { name: "Interest Rate Expectations", logic: "Rising rates = negative for growth = more exposure", exposed: true, icon: "FaBalanceScale" },
    ]
  },
  ETH: {
    name: "Ethereum",
    symbol: "ETH",
    exposureScore: 68,
    type: "crypto",
    indicators: [
      { name: "Price Volatility (7d, 30d)", logic: "Higher = more exposed (normalize standard deviation)", exposed: true, icon: "FaChartLine" },
      { name: "Funding Rate (Binance/Bybit)", logic: "> 0.01% = bullish overexposure (scale 0–100 based on avg range)", exposed: true, icon: "FaBalanceScale" },
      { name: "NVT Ratio", logic: "High = overvalued (compare to 90-day average)", exposed: true, icon: "FaExchangeAlt" },
      { name: "Exchange Inflows", logic: "High = possible sell pressure → more exposed", exposed: true, icon: "FaExchangeAlt" },
      { name: "Social Volume / Twitter Trends", logic: "Spikes = speculative attention → more exposure", exposed: true, icon: "FaTwitter" },
    ]
  },
}; 