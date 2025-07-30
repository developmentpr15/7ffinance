export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get('symbol') || 'AAPL';
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
  const res = await fetch(url, { cf: { cacheTtl: 60 } });
  const data = await res.json();
  const price = data.chart.result[0].meta.regularMarketPrice;
  return Response.json({ symbol, price });
}