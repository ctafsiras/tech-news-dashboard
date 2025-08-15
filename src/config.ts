export const NEWS_API_KEY = (import.meta.env.VITE_NEWS_API_KEY as string) || '';
export const NEWS_API_BASE = import.meta.env.DEV ? '/newsapi/v2' : 'https://newsapi.org/v2';
export const DEFAULT_COUNTRY = 'us';
