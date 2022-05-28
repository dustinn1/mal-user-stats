import type { AnimeListObject } from "../../interfaces/fetchList";
import type { Anime } from "../../interfaces/stats";
import upperCase from "lodash/upperCase";
import capitalize from "lodash/capitalize";

function capitalizeFormat(
  format: "unknown" | "tv" | "ova" | "movie" | "special" | "ona" | "music"
) {
  switch (format) {
    case "tv":
    case "ova":
    case "ona":
      return upperCase(format);
    case "movie":
    case "special":
    case "music":
      return capitalize(format);
    default:
      return "Unknown";
  }
}

export function allAnimes(animeList: AnimeListObject[]): Map<number, Anime> {
  const animes: Map<number, Anime> = new Map();
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
    animes.set(item.node.id, {
      id: item.node.id,
      title: item.node.title,
      title_en: item.node.title_en,
      title_ja: item.node.title_ja,
      image_url_id: item.node.image_url_id,
      genres: item.node.genres
        ? item.node.genres.map((genre) => genre.name)
        : [],
      creators: item.node.studios
        ? item.node.studios.map((studio) => studio.name)
        : [],
      count: item.node.num_episodes,
      format: {
        id: item.node.media_type,
        name: capitalizeFormat(item.node.media_type),
      },
      release_year: getReleaseYear(),
      start_year: item.list_status.start_date
        ? parseInt(item.list_status.start_date.split("-")[0] as string)
        : undefined,
      score: item.list_status.score,
      status: {
        id: item.list_status.status,
        name: capitalize(item.list_status.status.replaceAll("_", " ")),
      },
    });
  });
  return animes;
}
