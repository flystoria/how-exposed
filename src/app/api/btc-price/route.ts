import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://pro-api.coinmarketcap.com/v2/cryptocurrency/ohlcv/historical?id=1&time_start=2024-01-01T00:00:00Z&time_end=2024-03-19T00:00:00Z&interval=1d',
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY || '',
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorData
      });
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data || !data.data) {
      console.error('Invalid API Response:', data);
      throw new Error('Invalid API response format');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in BTC price API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch BTC price data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 