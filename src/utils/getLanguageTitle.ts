import { AnimeManga } from "../interfaces/stats";

export function getLanguageTitle(
  title: AnimeManga,
  language: "romaji" | "english" | "japanese"
) {
  switch (language) {
    case "romaji":
      return title.title;
    case "english":
      return title.title_en;
    case "japanese":
      return title.title_ja;
  }
}
