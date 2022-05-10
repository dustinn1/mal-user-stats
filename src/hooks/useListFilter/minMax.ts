import { Anime } from "../../interfaces/stats";

export function getMin(
  animes: Anime[],
  category: "score" | "episodes_count" | "release_year" | "watch_year"
): number {
  return animes
    .map((anime) => anime[category])
    .filter((value) => value !== undefined)
    .reduce((prev, curr) => (prev! < curr! ? prev : curr))!;
}

export function getMax(
  animes: Anime[],
  category: "score" | "episodes_count" | "release_year" | "watch_year"
): number {
  return animes
    .map((anime) => anime[category])
    .filter((value) => value !== undefined)
    .reduce((prev, curr) => (prev! > curr! ? prev : curr))!;
}
