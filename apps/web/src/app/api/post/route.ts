import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@7f/db';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const content = searchParams.get('content');
  const country = searchParams.get('country');

  if (!content || !country) return NextResponse.json({ error: 'Bad request' }, { status: 400 });

  const post = await prisma.post.create({
    data: { content, country, authorId: session.user.id },
  });

  return NextResponse.json(post);
}