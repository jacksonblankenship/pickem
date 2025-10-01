import { Theme, ThemeProviderContext } from '@/context/theme-context';
import { useEffect, useState } from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'pickem-theme',
  ...props
}: ThemeProviderProps) {
  const [themeValue, setThemeValue] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) ?? defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (themeValue !== 'system') return root.classList.add(themeValue);

    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';

    root.classList.add(systemTheme);
  }, [themeValue]);

  useEffect(() => {
    if (themeValue !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');

      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeValue]);

  function setTheme(theme: Theme) {
    localStorage.setItem(storageKey, theme);
    setThemeValue(theme);
  }

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={{
        theme: themeValue,
        setTheme,
      }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
