# Contentful Integration Guide

## Overview
House of Hope is now configured to use Contentful as a headless CMS for managing dynamic content like programs, children profiles, gallery images, and blog posts.

## Setup Instructions

### Step 1: Create Contentful Account & Space
1. Go to [contentful.com](https://contentful.com) and sign up for a free account
2. Create a new Space (or use the default one)
3. Note your **Space ID** from Settings

### Step 2: Create Content Models
In your Contentful Space, create the following Content Models:

#### 1. **Program**
Fields:
- `id` (Symbol, required)
- `title` (Symbol, required)
- `description` (Text, required)
- `image` (Asset, optional)

#### 2. **Achievement**
Fields:
- `id` (Symbol, required)
- `title` (Symbol, required)
- `description` (Text, required)
- `icon` (Symbol, required - use icon names like "heart", "award", etc.)

#### 3. **Gallery Image**
Fields:
- `title` (Symbol, required)
- `image` (Asset, required)
- `description` (Text, optional)

#### 4. **Child**
Fields:
- `id` (Symbol, required)
- `name` (Symbol, required)
- `age` (Integer, required)
- `bio` (Text, required)
- `image` (Asset, required)
- `story` (Text, optional - longer child story)

#### 5. **Blog Post** (Optional)
Fields:
- `slug` (Symbol, required, unique)
- `title` (Symbol, required)
- `excerpt` (Text, required)
- `content` (Text, required)
- `image` (Asset, required)
- `publishedAt` (Date, required)
- `author` (Symbol, required)

### Step 3: Get API Credentials
1. Go to **Settings > API keys > Content Delivery tokens**
2. Create a new token or use the default
3. Copy:
   - **Space ID**
   - **Content Delivery API - Access Token**

### Step 4: Update Environment Variables
Edit `.env.local` and replace:
```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=YOUR_SPACE_ID_HERE
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=YOUR_ACCESS_TOKEN_HERE
```

### Step 5: Restart Development Server
```bash
npm run dev
```

## Usage in Components

The Contentful integration is already set up in the following components with fallback to static data:

### Programs Component
```tsx
import { getPrograms } from '@/lib/contentful';

export default async function Programs() {
  const programs = await getPrograms();
  // Falls back to static data if Contentful not configured
  // ...
}
```

### Projects Component (Achievements)
```tsx
import { getAchievements } from '@/lib/contentful';

export default async function Projects() {
  const achievements = await getAchievements();
  // Falls back to static data if Contentful not configured
  // ...
}
```

### Gallery Component
```tsx
import { getGalleryImages } from '@/lib/contentful';

export default function GalleryClient() {
  const images = await getGalleryImages();
  // Falls back to static data if Contentful not configured
  // ...
}
```

### Kids Component
```tsx
import { getChildren } from '@/lib/contentful';

export default async function KidsPage() {
  const kids = await getChildren();
  // Falls back to static data if Contentful not configured
  // ...
}
```

## Available Functions

All functions are in `lib/contentful.ts`:

```typescript
// Fetch all programs
getPrograms(): Promise<Program[]>

// Fetch all achievements
getAchievements(): Promise<Achievement[]>

// Fetch all gallery images
getGalleryImages(): Promise<string[]>

// Fetch all children
getChildren(): Promise<Child[]>

// Fetch a single child
getChildById(id: string): Promise<Child | null>

// Fetch all blog posts
getBlogPosts(): Promise<BlogPost[]>

// Fetch a single blog post
getBlogPostBySlug(slug: string): Promise<BlogPost | null>
```

## Data Fallback Strategy

All functions have built-in fallback logic:
1. If `NEXT_PUBLIC_CONTENTFUL_SPACE_ID` is not set → returns empty array
2. If Contentful fetch fails → logs error and returns empty array
3. Components use static data as fallback when Contentful data is unavailable

This ensures the site always works, even without Contentful configured.

## Example: Adding Contentful to Programs Component

```tsx
import { getPrograms } from '@/lib/contentful';

export default async function Programs() {
  // Fetch from Contentful (or empty if not configured)
  const contentfulPrograms = await getPrograms();
  
  // Static fallback data
  const staticPrograms = [
    { id: 'education', title: 'Educational Support', ... }
    // ...
  ];
  
  // Use Contentful data if available, otherwise static
  const programs = contentfulPrograms.length > 0 
    ? contentfulPrograms 
    : staticPrograms;

  return (
    <section>
      {programs.map(program => (
        <Card key={program.id} {...program} />
      ))}
    </section>
  );
}
```

## Publishing Content

After setting up your content models in Contentful:

1. Create entries for each content type (Programs, Children, Gallery images, etc.)
2. Upload images as Assets
3. Fill in all required fields
4. Click **Publish** to make content live
5. Your Next.js app will automatically fetch the published content

### Immediate Content Refresh

Set `CONTENTFUL_REVALIDATE_SECRET` in Vercel and configure a Contentful webhook:

- **URL:** `https://houseofhope.africa/api/revalidate?secret=YOUR_SECRET`
- **Method:** `POST`
- **Triggers:** Publish, Unpublish, and Delete
- **Content types:** `Blog post`

The `/blog` and `/blog/[slug]` routes also run dynamically, so no redeployment is required for newly published posts.

## Troubleshooting

### Content not appearing?
- Check that your Space ID and Access Token are correct in `.env.local`
- Verify entries are **Published** (not just Draft) in Contentful
- Check browser console for errors

### Getting 401 Unauthorized?
- Your Access Token may be incorrect or expired
- Generate a new Content Delivery token in Contentful settings

### Images not loading?
- Ensure Asset fields are filled and the asset is published
- Check that asset URLs use `https:` prefix (they do automatically)

## Next Steps

1. Create a Contentful account
2. Set up content models
3. Update `.env.local` with your credentials
4. Create sample content in Contentful
5. Test the website - dynamic content should now load!

For more info: [Contentful Documentation](https://www.contentful.com/developers/docs/)
