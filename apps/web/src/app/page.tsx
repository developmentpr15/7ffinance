'use client';
import useSWR from 'swr';
import { useEffect, useState } from 'react';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Home() {
  const [country, setCountry] = useState('US');

  useEffect(() => {
    // In prod Cloudflare sets CF-IPCountry
    fetch('/api/country')
      .then(r => r.json())
      .then(d => setCountry(d.country));
  }, []);

  const { data: quote } = useSWR(`/api/quote?symbol=AAPL`, fetcher, { refreshInterval: 5000 });
  const { data: posts } = useSWR(`/api/community/${country}`, fetcher);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">7ffinance</h1>
      <p className="mt-2">Detected country: {country}</p>
      <p className="mt-2">AAPL: {quote?.price ? `$${quote.price.toFixed(2)}` : '…'}</p>

      <a href={`/community/${country}`} className="mt-4 underline block">
        View {country} community
      </a>
    </main>
  );
}