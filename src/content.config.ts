import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    image: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    order: z.coerce.number().optional().default(100),
    hide_from_navigation: z.boolean().optional().default(false),
    eyebrow: z.string().optional(),
    lede: z.string().optional(),
    items: z.array(z.object({
      title: z.string(),
      label: z.string().optional(),
      image: z.string().optional(),
    })).optional(),
  }),
});

export const collections = { news, pages };
