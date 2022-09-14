import {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  light: { primaryBg: '#fff', secondaryBg: '#000' },
  dark: { primaryBg: '#000', secondaryBg: '#fff' },
};

interface IThemeToggle {
  toggleTheme: () => void;
}

const ThemeToggle = createContext({} as IThemeToggle);

export const useToggleTheme = () => useContext(ThemeToggle);

export const ThemeToggleProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [isLight, setIsLight] = useState(true);

  const toggleTheme = useCallback(() => {
    setIsLight(prevTheme => !prevTheme);
  }, []);

  return (
    <ThemeToggle.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={isLight ? theme.light : theme.dark}>
        {children}
      </ThemeProvider>
    </ThemeToggle.Provider>
  );
};
