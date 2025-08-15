export interface Source {
  id: string | null;
  name: string;
}

export interface Article {
  source: Source;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string; // ISO string
  content: string | null;
  id?: string;
  category?: string;
}

export interface NewsApiResponse {
  status: 'ok' | 'error';
  totalResults?: number;
  articles?: Article[];
  code?: string;
  message?: string;
}

export type Category = 'all' | 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';
