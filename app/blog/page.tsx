import { getBlogPosts } from '@/lib/contentful';
import Link from 'next/link';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="pt-24 max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-10">Our Stories</h1>

      {posts.length === 0 && (
        <p>No blog posts yet.</p>
      )}

      {posts.map((post) => (
        <div key={post.slug} className="mb-12 border-b pb-6">
          <h2 className="text-2xl font-semibold mb-2">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h2>

          <p className="text-gray-600 mb-2">
            {new Date(post.publishedAt).toDateString()}
          </p>

          <p className="text-gray-700">{post.excerpt}</p>

          <Link
            href={`/blog/${post.slug}`}
            className="text-blue-600 mt-2 inline-block"
          >
            Read more →
          </Link>
        </div>
      ))}
    </section>
  );
}
