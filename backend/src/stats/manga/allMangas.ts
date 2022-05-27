import type { MangaListObject } from "../../interfaces/fetchList";
import type { Manga } from "../../interfaces/stats";
import upperCase from "lodash/upperCase";
import capitalize from "lodash/capitalize";

function capitalizeFormat(
  format:
    | "unknown"
    | "manga"
    | "light_novel"
    | "novel"
    | "one_shot"
    | "doujinshi"
    | "manhwa"
    | "manhua"
    | "oel"
) {
  switch (format) {
    case "oel":
      return upperCase(format);
    case "manga":
    case "novel":
    case "doujinshi":
    case "manhwa":
    case "manhua":
      return capitalize(format);
    case "light_novel":
    case "one_shot":
      return capitalize(format.replaceAll("_", " "));
    default:
      return "Unknown";
  }
}

export function allMangas(mangaList: MangaListObject[]): Map<number, Manga> {
  const mangas: Map<number, Manga> = new Map();
  mangaList.map((item: MangaListObject) => {
    function getReleaseYear(): number | undefined {
      if (item.node.start_date) {
        return parseInt(item.node.start_date.split("-")[0] as string);
      } else {
        return undefined;
      }
    }
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
        ? item.node.authors.map(
            (author) => author.node.first_name + " " + author.node.last_name
          )
        : [],
      chapters_count: item.node.num_chapters,
      volumes_count: item.node.num_volumes,
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
  return mangas;
}
