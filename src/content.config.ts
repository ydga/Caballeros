import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    main_image: z.string().optional(),
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

const events = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    time: z.string()
      .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
      .or(z.literal(''))
      .optional(),
    location: z.string().optional(),
    main_image: z.string().optional(),
    external_url: z.union([
      z.string().url().refine((value) => /^https?:\/\//i.test(value)),
      z.literal(''),
    ]).optional(),
    external_link_label: z.string().optional(),
    summary: z.string().optional(),
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
    parent_page: z.string().optional(),
    eyebrow: z.string().optional(),
    order: z.coerce.number().optional().default(100),
    hide_from_navigation: z.boolean().optional().default(false),
    lede: z.string().optional(),
    main_image: z.string().optional(),
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
    about: z.object({
      eyebrow: z.string(),
      title: z.string(),
      copy: z.string(),
      button_label: z.string(),
    }),
    news: z.object({
      eyebrow: z.string(),
      title: z.string(),
      link_label: z.string(),
      empty_message: z.string(),
    }),
    events: z.object({
      eyebrow: z.string(),
      title: z.string(),
      link_label: z.string(),
      empty_message: z.string(),
    }),
    gallery: z.object({
      eyebrow: z.string(),
      title: z.string(),
      copy: z.string(),
      link_label: z.string(),
      empty_message: z.string(),
    }),
    downloads: z.object({
      title: z.string(),
      files: z.array(z.object({
        title: z.string().optional(),
        file: z.string().min(1),
      })).optional(),
    }),
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

export const collections = { news, events, pages, homepage, social };
