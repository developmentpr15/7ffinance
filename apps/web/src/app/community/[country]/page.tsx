import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export default async function CountryFeed({ params }: { params: { country: string } }) {
  const country = params.country.toUpperCase();
  const session = await getServerSession(authOptions);

  const posts = await prisma.post.findMany({
    where: { country },
    orderBy: { createdAt: 'desc' },
    select: { id: true, content: true, createdAt: true, author: { select: { name: true } } },
  });

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Community – {country}</h1>

      {session && (
        <form action="/api/post" method="post" className="mb-6">
          <input type="hidden" name="country" value={country} />
          <textarea
            name="content"
            className="w-full border p-2 rounded"
            placeholder="Share your thoughts..."
            rows={3}
            required
          />
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Post</button>
        </form>
      )}

      {!session && (
        <p className="mb-6 text-gray-600">
          <a href="/api/auth/signin" className="underline">Sign in</a> to post.
        </p>
      )}

      <ul className="space-y-4">
        {posts.map(p => (
          <li key={p.id} className="border p-4 rounded">
            <div className="font-bold">{p.author.name}</div>
            <div className="text-sm text-gray-500">{p.createdAt.toLocaleString()}</div>
            <p className="mt-2">{p.content}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}