import { createClient, type EntryFieldTypes, type Entry, type EntrySkeletonType, type Asset } from 'contentful';

/**
 * Initialize Contentful client
 * Make sure to set NEXT_PUBLIC_CONTENTFUL_SPACE_ID and NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN in .env.local
 */
const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
  host: 'cdn.contentful.com',
});

// Define entry skeletons
export interface IProgramSkeleton extends EntrySkeletonType {
  contentTypeId: 'program';
  fields: {
    id: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    image?: EntryFieldTypes.AssetLink;
  };
}

export interface IAchievementSkeleton extends EntrySkeletonType {
  contentTypeId: 'achievement';
  fields: {
    id: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    icon: EntryFieldTypes.Symbol;
  };
}

export interface IGalleryImageSkeleton extends EntrySkeletonType {
  contentTypeId: 'galleryImage';
  fields: {
    title: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.AssetLink;
    description?: EntryFieldTypes.Text;
  };
}

export interface IChildSkeleton extends EntrySkeletonType {
  contentTypeId: 'child';
  fields: {
    id: EntryFieldTypes.Symbol;
    name: EntryFieldTypes.Symbol;
    age: EntryFieldTypes.Integer;
    bio: EntryFieldTypes.Text;
    image: EntryFieldTypes.AssetLink;
    story?: EntryFieldTypes.Text;
  };
}

export interface IBlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'blogPost';
  fields: {
    slug: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    excerpt: EntryFieldTypes.Text;
    content: EntryFieldTypes.Text;
    image: EntryFieldTypes.AssetLink;
    publishedAt: EntryFieldTypes.Date;
    author: EntryFieldTypes.Symbol;
  };
}

// Create entry types
export type IProgram = Entry<IProgramSkeleton, undefined, string>;
export type IAchievement = Entry<IAchievementSkeleton, undefined, string>;
export type IGalleryImage = Entry<IGalleryImageSkeleton, undefined, string>;
export type IChild = Entry<IChildSkeleton, undefined, string>;
export type IBlogPost = Entry<IBlogPostSkeleton, undefined, string>;

// Return types for functions
type ProgramData = {
  id: string;
  title: string;
  description: string;
  image: string | null;
};

type AchievementData = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

type ChildData = {
  id: string;
  name: string;
  age: number;
  bio: string;
  story?: string;
  image: string | null;
};

type BlogPostData = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string | null;
  publishedAt: string;
  author: string;
  
};

// Helper function to extract image URL from Asset
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getImageUrl(asset: any): string | null {
  if (!asset) return null;
  
  const assetFields = asset?.fields;
  const fileUrl = assetFields?.file?.url;
  
  return fileUrl ? `https:${fileUrl}` : null;
}

/**
 * Fetch all programs from Contentful
 */
export async function getPrograms(): Promise<ProgramData[]> {
  try {
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
      console.warn('Contentful credentials not set, using static fallback');
      return [];
    }

    const entries = await contentfulClient.getEntries<IProgramSkeleton>({
      content_type: 'program',
      order: ['fields.id'],
    });

    return entries.items.map((item) => ({
      id: item.fields.id,
      title: item.fields.title,
      description: item.fields.description,
      image: getImageUrl(item.fields.image),
    }));
  } catch (error) {
    console.error('Error fetching programs from Contentful:', error);
    return [];
  }
}

/**
 * Fetch all achievements from Contentful
 */
export async function getAchievements(): Promise<AchievementData[]> {
  try {
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
      console.warn('Contentful credentials not set, using static fallback');
      return [];
    }

    const entries = await contentfulClient.getEntries<IAchievementSkeleton>({
      content_type: 'achievement',
      order: ['fields.id'],
    });

    return entries.items.map((item) => ({
      id: item.fields.id,
      title: item.fields.title,
      description: item.fields.description,
      icon: item.fields.icon,
    }));
  } catch (error) {
    console.error('Error fetching achievements from Contentful:', error);
    return [];
  }
}

/**
 * Fetch all gallery images from Contentful
 */
export async function getGalleryImages(): Promise<string[]> {
  try {
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
      console.warn('Contentful credentials not set, using static fallback');
      return [];
    }

    const entries = await contentfulClient.getEntries<IGalleryImageSkeleton>({
      content_type: 'galleryImage',
      order: ['sys.createdAt'],
      limit: 50,
    });

    return entries.items
      .map((item) => getImageUrl(item.fields.image))
      .filter((url): url is string => url !== null);
  } catch (error) {
    console.error('Error fetching gallery images from Contentful:', error);
    return [];
  }
}

/**
 * Fetch all children from Contentful
 */
export async function getChildren(): Promise<ChildData[]> {
  try {
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
      console.warn('Contentful credentials not set, using static fallback');
      return [];
    }

    const entries = await contentfulClient.getEntries<IChildSkeleton>({
      content_type: 'child',
      order: ['fields.id'],
    });

    return entries.items.map((item) => ({
      id: item.fields.id,
      name: item.fields.name,
      age: item.fields.age,
      bio: item.fields.bio,
      story: item.fields.story,
      image: getImageUrl(item.fields.image),
    }));
  } catch (error) {
    console.error('Error fetching children from Contentful:', error);
    return [];
  }
}

/**
 * Fetch a single child by ID from Contentful
 */
export async function getChildById(id: string): Promise<ChildData | null> {
  try {
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
      return null;
    }

    const entries = await contentfulClient.getEntries<IChildSkeleton>({
      content_type: 'child',
      'fields.id': id,
      limit: 1,
    });

    if (entries.items.length === 0) return null;

    const item = entries.items[0];
    return {
      id: item.fields.id,
      name: item.fields.name,
      age: item.fields.age,
      bio: item.fields.bio,
      story: item.fields.story,
      image: getImageUrl(item.fields.image),
    };
  } catch (error) {
    console.error('Error fetching child from Contentful:', error);
    return null;
  }
}

/**
 * Fetch blog posts from Contentful
 */
export async function getBlogPosts(): Promise<BlogPostData[]> {
  try {
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
      return [];
    }

    const entries = await contentfulClient.getEntries<IBlogPostSkeleton>({
      content_type: 'blogPost',
      order: ['-fields.publishedAt'],
      limit: 50,
    });

    return entries.items.map((item) => ({
      slug: item.fields.slug,
      title: item.fields.title,
      excerpt: item.fields.excerpt,
      content: item.fields.content,
      image: getImageUrl(item.fields.image),
      publishedAt: item.fields.publishedAt,
      author: item.fields.author,
      
    }));
  } catch (error) {
    console.error('Error fetching blog posts from Contentful:', error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug from Contentful
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPostData | null> {
  try {
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
      return null;
    }

    const entries = await contentfulClient.getEntries<IBlogPostSkeleton>({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    });

    if (entries.items.length === 0) return null;

    const item = entries.items[0];
    return {
      slug: item.fields.slug,
      title: item.fields.title,
      excerpt: item.fields.excerpt,
      content: item.fields.content,
      image: getImageUrl(item.fields.image),
      publishedAt: item.fields.publishedAt,
      author: item.fields.author,
    };
  } catch (error) {
    console.error('Error fetching blog post from Contentful:', error);
    return null;
  }
}

export default contentfulClient;