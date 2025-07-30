'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Home() {
  const { data } = useSWR('/api/quote?symbol=AAPL', fetcher, { refreshInterval: 5000 });
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">7ffinance</h1>
      <p className="mt-4">Strategies in DB: 0</p>
      <p className="mt-2 text-xl">
        AAPL: {data?.price ? `$${data.price.toFixed(2)}` : '…'}
      </p>
    </main>
  );
}