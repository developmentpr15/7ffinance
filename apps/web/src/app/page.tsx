export default async function Home() {
  const res = await fetch('http://localhost:3000/api/hello', { cache: 'no-store' });
  const data = await res.json();
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Hello 7ffinance!</h1>
      <p className="mt-4">Strategies in DB: {data.strategyCount}</p>
    </main>
  );
}