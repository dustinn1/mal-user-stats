import type { AnimeListObject } from "../../interfaces/fetchList";
import type { Anime } from "../../interfaces/animeStats";

export function allAnimes(animeList: AnimeListObject[]): Anime[] {
  const animes: Anime[] = [];
  animeList.map((item: AnimeListObject) => {
    function getReleaseYear(): number | undefined {
      if (item.node.start_season) {
        return item.node.start_season.year;
      } else if (item.node.start_date) {
        return parseInt(item.node.start_date.split("-")[0] as string);
      } else {
        return undefined;
      }
    }
    animes.push({
      id: item.node.id,
      title: item.node.title,
      title_en: item.node.title_en,
      title_ja: item.node.title_ja,
      image_url_id: item.node.image_url_id,
      genres: item.node.genres
        ? item.node.genres.map((genre) => genre.name)
        : [],
      studios: item.node.studios
        ? item.node.studios.map((studio) => studio.name)
        : [],
      episodes_count: item.node.num_episodes,
      format: item.node.media_type,
      release_year: getReleaseYear(),
      watch_year: item.list_status.start_date
        ? parseInt(item.list_status.start_date.split("-")[0] as string)
        : undefined,
      score: item.list_status.score,
      status: item.list_status.status,
    });
  });
  return animes;
}
