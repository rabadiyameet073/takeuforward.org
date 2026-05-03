import { createContext, useContext, ReactNode } from "react";
import { useTheme, Theme } from "@/hooks/useTheme";

interface ThemeContextValue { theme: Theme; toggle: () => void; }
const ThemeContext = createContext<ThemeContextValue>({ theme: "dark", toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, toggle } = useTheme();
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}
export const useThemeContext = () => useContext(ThemeContext);