import type { Anime } from "../interfaces/stats";

export function getAnimesInfo(animes: number[], allAnimes: Anime[]): Anime[] {
  const animesInfo: Anime[] = [];
  for (let id of animes) {
    animesInfo.push(allAnimes.find((anime: any) => anime.id === id) as Anime);
  }
  return animesInfo;
}
