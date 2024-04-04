'use client'

import LogoutBtn from '@/components/LogoutBtn'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashBoard() {
  const [isConnected, setIsConnected] = useState(false);
  const [symbols, setSymbols] = useState(["AAPL", "TSLA", "AMZN", "SPCE"]);
  const [prices, setPrices] = useState({});
  const router = useRouter();

  useEffect(() => {
    const eventSource = new EventSource("/api/alpaca");
    setIsConnected(true);

    eventSource.onmessage = (event) => {
      const quote = JSON.parse(event.data);
      setPrices((prevPrices) => ({
        ...prevPrices,
        [quote.Symbol]: quote.BidPrice,
      }));
    };

    eventSource.onerror = () => {
      eventSource.close();
      setIsConnected(false);
    };

    const connectWebSocket = async () => {
      try {
        const response = await fetch("/api/alpaca", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "connect", symbols }),
        });

        if (!response.ok) {
          throw new Error("Failed to connect to WebSocket");
        }
      } catch (error) {
        console.error("Error connecting to WebSocket:", error);
        setIsConnected(false);
      }
    };

    connectWebSocket();

    return () => {
      eventSource.close();
      setIsConnected(false);

      const disconnectWebSocket = async () => {
        try {
          await fetch("/api/alpaca", {  
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ action: "disconnect" }),
          });
        } catch (error) {
          console.error("Error disconnecting from WebSocket:", error);
        }
      };

      disconnectWebSocket();
    };
  }, [symbols]);

  const refreshData = () => {
    router.refresh();
  };

  return (
    <div className='grid place-items-center'>
      <h1>Alpaca WebSocket Example</h1>
      <p>Connection Status: {isConnected ? "Connected" : "Disconnected"}</p>
      <p>Subscribed Symbols: {symbols.join(", ")}</p>
      <h2>Live Prices:</h2>
      <ul>
        {symbols.map((symbol) => (
          <li key={symbol}>
            {symbol}: {prices[symbol] || "N/A"}
          </li>
        ))}
      </ul>
      <button className='button' onClick={refreshData}>Refresh Data</button>
      <LogoutBtn/>
    </div>
  );
}