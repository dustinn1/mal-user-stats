import type { Anime } from "../interfaces/stats";

export function getAnimesInfo(
  animes: number[],
  allAnimes: { [k: string]: Anime }
): Anime[] {
  const animesInfo: Anime[] = [];
  for (let id of animes) {
    animesInfo.push(allAnimes[id] as Anime);
  }
  return animesInfo;
}
