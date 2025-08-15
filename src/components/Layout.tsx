import type { ReactNode } from 'react';
import styles from './Layout.module.css';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  );
}

export function NavContainer({ children }: { children: ReactNode }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          {children}
        </div>
      </div>
    </nav>
  );
}

export function MainContainer({ children }: { children: ReactNode }) {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {children}
      </div>
    </main>
  );
}
