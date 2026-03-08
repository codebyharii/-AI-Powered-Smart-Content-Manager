import { useEffect } from 'react';
import useThemeStore from '../store/themeStore';

export const useTheme = () => {
  const { isDark, toggleTheme, setTheme } = useThemeStore();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return { isDark, toggleTheme, setTheme };
};

export default useTheme;
