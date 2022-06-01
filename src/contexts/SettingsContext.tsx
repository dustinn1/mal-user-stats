import { useMediaQuery } from "@react-hook/media-query";
import { createContext, useState, FunctionComponent, useEffect } from "react";

interface Settings {
  theme: "system" | "light" | "dark";
  updateTheme(theme: "system" | "light" | "dark"): void;
}

function getSavedTheme(): "system" | "light" | "dark" {
  const local: string = localStorage.getItem("theme")!;
  if (local === "system" || local === "light" || local === "dark") {
    return local;
  } else {
    localStorage.setItem("theme", "system");
    return "system";
  }
}

export const SettingsContext = createContext({} as Settings);

export const SettingsContextProvider: FunctionComponent = ({ children }) => {
  const prefersColorScheme = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState<"system" | "light" | "dark">(
    getSavedTheme()
  );
  function updateTheme(theme: "system" | "light" | "dark") {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  }

  useEffect(() => {
    if (theme === "dark" || (theme === "system" && prefersColorScheme)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [prefersColorScheme, theme]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        updateTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
