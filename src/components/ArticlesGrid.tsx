import type { Article } from '../types/news';
import { ArticleCard } from './ArticleCard';

export function ArticlesGrid({ articles, isSaved, onToggleSave }: { articles: Article[]; isSaved: (a: Article) => boolean; onToggleSave: (a: Article) => void }) {
  return (
    <div className="row g-4">
      {articles.map((a) => (
        <div key={a.url} className="col-12 col-sm-6 col-lg-4 col-xl-3">
          <ArticleCard article={a} saved={isSaved(a)} onToggleSave={onToggleSave} />
        </div>
      ))}
    </div>
  );
}
