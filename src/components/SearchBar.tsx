export function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="search"
      className="form-control"
      placeholder="Search headlines..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search headlines"
    />
  );
}
