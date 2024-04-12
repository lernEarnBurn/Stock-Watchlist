'use client'
import LogoutBtn from '@/components/LogoutBtn'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashBoard() {
  const [symbols, setSymbols] = useState(["AAPL", "TSLA", "AMZN", "SPCE"]);
  const [prices, setPrices] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/alpaca', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ symbols }),
        });

         if (response.ok) {
          const data = await response.json();
          setPrices(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [symbols]);

  const refreshData = () => {
    router.refresh();
  };

  return (
    <div className='grid place-items-center'>
      <h1>Alpaca API Example</h1>
      <p>Subscribed Symbols: {symbols.join(", ")}</p>
      <h2>Latest Prices:</h2>
      <ul>
        {symbols.map((symbol) => (
          <li key={symbol}>
            {symbol}: {prices[symbol] || "N/A"}
          </li>
        ))}
      </ul>
      <LogoutBtn />
    </div>
  );
}