import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type ColorMode = 'light' | 'dark';

export function useColorMode() {
  const [mode, setMode] = useLocalStorage<ColorMode>('color-mode', 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', mode);
  }, [mode]);

  function toggle() {
    setMode(mode === 'light' ? 'dark' : 'light');
  }

  return { mode, setMode, toggle } as const;
}
