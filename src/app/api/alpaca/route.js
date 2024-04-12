import { NextResponse } from 'next/server';
const Alpaca = require('@alpacahq/alpaca-trade-api');

export async function POST(req) {
  const { symbols } = await req.json();
  
  try {
    const alpaca = new Alpaca( {baseUrl: 'https://paper-api.alpaca.markets/',
                                keyId: "PKCF91C8L1Y9ZNI3XNLK",
                                secretKey: "eDagbliCZ9PBSeSRKZVChGMFYuAbVSAMzos0RyHH",});

    
  
      
    const quotes = await alpaca.getLatestQuotes(symbols);
    
    const quoteData = {};
    for (const [symbol, quote] of quotes.entries()) {
      quoteData[symbol] = quote.AskPrice;
    }


    return NextResponse.json(quoteData);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}