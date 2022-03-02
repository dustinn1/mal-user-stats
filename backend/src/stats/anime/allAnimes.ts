import type { AnimeListObject } from "../../interfaces/fetchList";

interface AnimeObject {
  id: number;
  title: string;
  image_url_id: string;
  title_en: string;
  title_ja: string;
}

export function allAnimes(animeList: AnimeListObject[]): AnimeObject[] {
  const animes: AnimeObject[] = [];
  animeList.map((item: AnimeListObject) =>
    animes.push({
      id: item.node.id,
      title: item.node.title,
      image_url_id: item.node.image_url_id,
      title_en: item.node.title_en,
      title_ja: item.node.title_ja,
    })
  );
  return animes;
}
