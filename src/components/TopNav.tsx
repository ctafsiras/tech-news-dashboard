import type { ColorMode } from '../hooks/useColorMode';
import { NavContainer } from './Layout';

export function TopNav({ onToggleMode, mode }: { onToggleMode: () => void; mode: ColorMode }) {
  return (
    <NavContainer>
      <span className="navbar-brand fw-semibold m-0">Tech News</span>
      <div className="d-flex align-items-center gap-2">
        <button 
          className="btn btn-sm btn-outline-secondary" 
          onClick={onToggleMode} 
          aria-label="Toggle dark mode"
        >
          <i className={`bi ${mode === 'dark' ? 'bi-sun' : 'bi-moon'}`} />
        </button>
      </div>
    </NavContainer>
  );
}
