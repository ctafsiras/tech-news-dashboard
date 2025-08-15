import type { Article } from '../types/news';
import styles from './ArticleCard.module.css';

export function ArticleCard({ article, saved, onToggleSave }: { article: Article; saved: boolean; onToggleSave: (a: Article) => void }) {
  const fallbackImg = 'https://via.placeholder.com/600x400?text=No+Image';
  
  return (
    <article className={styles.articleCard}>
      <div className={styles.imageContainer}>
        <img 
          src={article.urlToImage || fallbackImg} 
          className={styles.image}
          alt={article.title} 
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = fallbackImg;
          }}
        />
      </div>
      
      <div className={styles.cardBody}>
        <div className={styles.header}>
          <span className={styles.sourceBadge}>
            {article.source?.name || 'News'}
          </span>
          <span className={styles.date}>
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
        </div>
        
        <h3 className={styles.title} title={article.title}>
          {article.title}
        </h3>
        
        {article.description && (
          <p className={styles.description}>
            {article.description}
          </p>
        )}
        
        <div className={styles.buttonGroup}>
          <a 
            className={styles.primaryButton}
            href={article.url} 
            target="_blank" 
            rel="noreferrer"
          >
            <span>Read</span>
            <i className="bi bi-arrow-up-right" />
          </a>
          
          <button 
            className={saved ? styles.warningButton : styles.secondaryButton}
            onClick={(e) => {
              e.preventDefault();
              onToggleSave(article);
            }}
            aria-label={saved ? 'Remove from bookmarks' : 'Save to bookmarks'}
          >
            <i className={`bi ${saved ? 'bi-bookmark-check-fill' : 'bi-bookmark'}`} />
            <span className={styles.buttonText}>{saved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </article>
  )
}
