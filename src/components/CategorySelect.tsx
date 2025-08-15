import type { Category } from '../types/news';

// Define human-readable labels for each category
const categoryLabels: Record<Category, string> = {
  'all': 'All News',
  'business': 'Business',
  'entertainment': 'Entertainment',
  'general': 'General',
  'health': 'Health',
  'science': 'Science',
  'sports': 'Sports',
  'technology': 'Technology'
};

const categories = Object.keys(categoryLabels) as Category[];

export function CategorySelect({ value, onChange }: { value: Category; onChange: (c: Category) => void }) {
  return (
    <select 
      className="form-select" 
      value={value} 
      onChange={(e) => onChange(e.target.value as Category)} 
      aria-label="Filter by category"
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {categoryLabels[category]}
        </option>
      ))}
    </select>
  );
}
