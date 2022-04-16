import type { Anime } from "../interfaces/stats";

export function getAnimesInfo(
  animes: number[],
  allAnimes: { [k: string]: Anime }
): Anime[] {
  return animes.map((id) => allAnimes[id]);
}
