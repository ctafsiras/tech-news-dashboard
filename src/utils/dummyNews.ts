import type { Article } from "../types/news";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/600x400?text=No+Image";
const CATEGORIES = [
  "technology",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
] as const;
const AUTHORS = [
  "Tech News",
  "Daily Update",
  "Global Reports",
  "News Network",
  "Info Hub",
];
const SOURCES = [
  "CNN",
  "BBC",
  "Reuters",
  "AP",
  "The Verge",
  "Wired",
  "TechCrunch",
];

const generateDummyArticle = (index: number, category: string): Article => {
  const id = `dummy-${Date.now()}-${index}`;
  const title = `Dummy News Headline ${index + 1} - ${
    category.charAt(0).toUpperCase() + category.slice(1)
  }`;
  const sourceName = SOURCES[Math.floor(Math.random() * SOURCES.length)];

  return {
    id,
    title,
    description: `This is a sample news article about ${category}. The quick brown fox jumps over the lazy dog.`,
    url: `#${id}`,
    urlToImage: PLACEHOLDER_IMAGE,
    publishedAt: new Date(
      Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
    ).toISOString(),
    content: `This is a sample content for the news article about ${category}. It demonstrates what the article would contain if it were real.`,
    author: AUTHORS[Math.floor(Math.random() * AUTHORS.length)],
    source: {
      id: sourceName.toLowerCase().replace(/\s+/g, "-"),
      name: sourceName,
    },
    category,
  };
};

export const generateDummyNews = (
  count: number,
  category?: string
): Article[] => {
  const selectedCategory =
    category && category !== "all"
      ? category
      : CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

  return Array.from({ length: count }, (_, i) =>
    generateDummyArticle(i, selectedCategory)
  );
};
