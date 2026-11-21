import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = process.env.CONTENTFUL_REVALIDATE_SECRET;
  const suppliedSecret =
    request.nextUrl.searchParams.get('secret') ??
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!secret || suppliedSecret !== secret) {
    return NextResponse.json({ error: 'Invalid revalidation secret' }, { status: 401 });
  }

  let slug: string | undefined;

  try {
    const body = await request.json();
    slug =
      typeof body?.fields?.slug?.['en-US'] === 'string'
        ? body.fields.slug['en-US']
        : undefined;
  } catch {
    // A webhook can also be configured to use no request body.
  }

  revalidatePath('/blog');
  revalidatePath('/blog/[slug]', 'page');
  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }

  return NextResponse.json({
    revalidated: true,
    paths: ['/blog', '/blog/[slug]', ...(slug ? [`/blog/${slug}`] : [])],
  });
}
