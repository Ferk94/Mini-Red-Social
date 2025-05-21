import { NextResponse } from 'next/server';
import { getPosts } from '../../lib/api';

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Error al traer posts' }, { status: 500 });
  }
}
