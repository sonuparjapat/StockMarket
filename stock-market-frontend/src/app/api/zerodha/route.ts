import { NextResponse } from 'next/server';
import { KiteConnect } from 'kiteconnect';

// Initialize the Kite Connect API
const kite = new KiteConnect({
    api_key: process.env.ZERODHA_API_KEY, // API key from .env.local
});

// Export the GET method explicitly
export async function GET() {
    try {
        // Example: Fetching all instruments
        const instruments = await kite.getInstruments(); // You can customize this as per your need
        // console.log(instruments,"instruments")
        return NextResponse.json(instruments);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data from Zerodha API' }, { status: 500 });
    }
}