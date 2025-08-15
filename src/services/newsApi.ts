import type { Article, NewsApiResponse } from '../types/news';
import { NEWS_API_BASE, NEWS_API_KEY, DEFAULT_COUNTRY } from '../config';

export interface FetchOptions {
  categoryQuery: string; // term to include in q
  pageSize?: number;
}

export async function fetchTechNews({ categoryQuery, pageSize = 30 }: FetchOptions): Promise<Article[]> {
  if (!NEWS_API_KEY && !import.meta.env.DEV) {
    throw new Error('Missing NewsAPI key. Set VITE_NEWS_API_KEY in your .env.local');
  }

  const params = new URLSearchParams({
    pageSize: String(pageSize),
  });
  
  // Set category if it's not 'all'
  if (categoryQuery && categoryQuery !== 'all') {
    params.set('category', categoryQuery);
  } else {
    // For 'all' or no category, use the country parameter
    params.set('country', DEFAULT_COUNTRY);
  }

  const url = `${NEWS_API_BASE}/top-headlines?${params.toString()}`;
  const res = await fetch(url, {
    headers: import.meta.env.DEV
      ? undefined // dev proxy injects X-Api-Key
      : {
          'X-Api-Key': NEWS_API_KEY,
        },
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as NewsApiResponse;
  if (data.status !== 'ok' || !data.articles) {
    const message = data.message || 'Unknown API error';
    throw new Error(message);
  }
  return data.articles;
}
