import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest',
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY || '',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Fear & Greed data');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in Fear & Greed API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Fear & Greed data' },
      { status: 500 }
    );
  }
} 