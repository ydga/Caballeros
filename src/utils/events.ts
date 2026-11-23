import type { CollectionEntry } from 'astro:content';

const schoolDateKey = (date: Date) =>
  new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);

export const getUpcomingEvents = (events: CollectionEntry<'events'>[], now = new Date()) =>
  events
    .filter((event) => schoolDateKey(event.data.date) >= schoolDateKey(now))
    .sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
