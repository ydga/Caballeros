import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    gallery: z.array(z.object({
      title: z.string().optional(),
      image: z.string().min(1),
    })).optional(),
    downloads: z.array(z.object({
      title: z.string().optional(),
      file: z.string().min(1),
    })).optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    nav_label: z.string().optional(),
    eyebrow: z.string().optional(),
    order: z.coerce.number().optional().default(100),
    hide_from_navigation: z.boolean().optional().default(false),
    lede: z.string().optional(),
    items: z.array(z.object({
      title: z.string(),
      label: z.string().optional(),
      image: z.string().optional(),
    })).optional(),
    downloads: z.array(z.object({
      title: z.string().optional(),
      file: z.string().min(1),
    })).optional(),
  }),
});

const homepage = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/home' }),
  schema: z.object({
    hero_slides: z.array(z.discriminatedUnion('cta_type', [
      z.object({
        image: z.string().min(1),
        title: z.string(),
        subtitle: z.string().optional(),
        cta_label: z.string(),
        cta_type: z.literal('page'),
        cta_page: z.string().min(1),
      }),
      z.object({
        image: z.string().min(1),
        title: z.string(),
        subtitle: z.string().optional(),
        cta_label: z.string(),
        cta_type: z.literal('external'),
        cta_external_url: z.string().url(),
      }),
    ])).min(1),
    about_button_label: z.string(),
    news_eyebrow: z.string(),
    news_title: z.string(),
    news_link_label: z.string(),
    gallery_link_label: z.string(),
    downloads: z.array(z.object({
      title: z.string().optional(),
      file: z.string().min(1),
    })).optional(),
  }),
});

const socialUrl = z.union([
  z.string().url().refine((value) => /^https?:\/\//i.test(value)),
  z.literal(''),
]).optional();

const social = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/social' }),
  schema: z.object({
    instagram: socialUrl,
    youtube: socialUrl,
    facebook: socialUrl,
  }),
});

export const collections = { news, pages, homepage, social };
