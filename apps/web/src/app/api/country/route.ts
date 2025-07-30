export const runtime = 'edge';
export function GET(req: Request) {
  const country = (req.headers.get('cf-ipcountry') || 'US').toUpperCase();
  return Response.json({ country });
}