import type { MangaListObject } from "../../interfaces/fetchList";
import type { Manga } from "../../interfaces/stats";
import upperCase from "lodash/upperCase";
import capitalize from "lodash/capitalize";

/* function capitalizeFormat(
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
} */

export function allMangas(mangaList: MangaListObject[]): Map<number, Manga> {
  const mangas: Map<number, Manga> = new Map();
  mangaList.map((item: MangaListObject) => {
    /* function getReleaseYear(): number | undefined {
      if (item.node.start_season) {
        return item.node.start_season.year;
      } else if (item.node.start_date) {
        return parseInt(item.node.start_date.split("-")[0] as string);
      } else {
        return undefined;
      }
    } */
    mangas.set(item.node.id, {
      id: item.node.id,
      title: item.node.title,
      title_en: item.node.title_en,
      title_ja: item.node.title_ja,
      image_url_id: item.node.image_url_id,
      genres: item.node.genres
        ? item.node.genres.map((genre) => genre.name)
        : [],
      authors: item.node.authors
        ? item.node.authors.map((author) => {
            return {
              name: author.node.first_name + " " + author.node.last_name,
              role: author.role,
            };
          })
        : [],
      chapters_count: item.node.num_chapters,
      volumes_count: item.node.num_volumes,
      format: {
        id: item.node.media_type,
        name: item.node.media_type,
      },
      release_year: 2000,
      watch_year: item.list_status.start_date
        ? parseInt(item.list_status.start_date.split("-")[0] as string)
        : undefined,
      score: item.list_status.score,
      status: {
        id: item.list_status.status,
        name: capitalize(item.list_status.status.replaceAll("_", " ")),
      },
    });
  });
  return mangas;
}
