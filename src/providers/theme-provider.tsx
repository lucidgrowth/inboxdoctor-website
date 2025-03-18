"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "dark",
  setTheme: (theme: string) => {},
});

const storageKey = "report-theme";

const getTheme = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(storageKey) || "dark";
  }
  return "dark";
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const reportLayout = document.getElementById("report-layout");
    if (reportLayout) {
      reportLayout.classList.remove("light", "dark");
      reportLayout.classList.add(theme);
      localStorage.setItem(storageKey, theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
