import { getBlogPosts } from "@/lib/contentful";

export const dynamic = 'force-dynamic';

function getUrlSlug(slug: string): string {
  return slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const posts = await getBlogPosts();
  const post = posts.find((item) => getUrlSlug(item.slug) === getUrlSlug(slug));

  if (!post) {
    return <div className="pt-24 text-center">Post not found</div>;
  }

  return (
    <article className="pt-24 max-w-3xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <p className="text-gray-500 mb-6">
        {new Date(post.publishedAt).toDateString()} • {post.author}
      </p>

      <div className="prose max-w-none whitespace-pre-line">
        {post.content}
      </div>
    </article>
  );
}
