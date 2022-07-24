import { useMediaQuery } from "@react-hook/media-query";
import {
  createContext,
  useState,
  FunctionComponent,
  useEffect,
  ReactNode,
  useMemo,
  memo,
} from "react";

type Props = {
  children: ReactNode;
};
interface Settings {
  theme: "system" | "light" | "dark";
  updateTheme(theme: "system" | "light" | "dark"): void;
  titleLanguage: "romaji" | "english" | "japanese";
  updateTitleLanguage(language: "romaji" | "english" | "japanese"): void;
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

function getSavedTitleLanguage(): "romaji" | "english" | "japanese" {
  const local: string = localStorage.getItem("title")!;
  if (local === "romaji" || local === "english" || local === "japanese") {
    return local;
  } else {
    localStorage.setItem("title", "romaji");
    return "romaji";
  }
}

export const SettingsContext = createContext({} as Settings);

export const SettingsContextProvider = ({ children }: Props) => {
  const prefersColorScheme = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState<"system" | "light" | "dark">(
    getSavedTheme()
  );
  function updateTheme(theme: "system" | "light" | "dark") {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  }
  const [titleLanguage, setTitleLanguage] = useState<
    "romaji" | "english" | "japanese"
  >(getSavedTitleLanguage());
  function updateTitleLanguage(language: "romaji" | "english" | "japanese") {
    setTitleLanguage(language);
    localStorage.setItem("title", language);
  }

  useEffect(() => {
    if (theme === "dark" || (theme === "system" && prefersColorScheme)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [prefersColorScheme, theme]);

  const values = useMemo(() => {
    return {
      theme,
      updateTheme,
      titleLanguage,
      updateTitleLanguage,
    };
  }, [theme, titleLanguage]);

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};
