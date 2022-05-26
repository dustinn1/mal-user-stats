import Fuse from "fuse.js";
import { Filter } from "../../../interfaces/filters";
import { Anime } from "../../../interfaces/stats";

export function filterList(titles: Anime[], filters: Filter[]): Anime[] {
  let filteredList = titles;
  for (const filter of filters) {
    if (filter.category !== "search") {
      filteredList = filteredList.filter((title) => {
        if (filter.category === "genres" || filter.category === "studios") {
          if (filter.type === "exclude") {
            return !title[filter.category!].includes(filter.value);
          }
          if (filter.type === "include") {
            return title[filter.category].includes(filter.value);
          }
        }
        if (filter.category === "format" || filter.category === "status") {
          if (filter.type === "exclude") {
            return !(
              title[filter.category].name.toLowerCase() ===
              filter.value.toLowerCase()
            );
          }
          if (filter.type === "include") {
            return (
              title[filter.category].name.toLowerCase() ===
              filter.value.toLowerCase()
            );
          }
        }
        if (
          filter.category === "score" ||
          filter.category === "release_year" ||
          filter.category === "watch_year"
        ) {
          const range = filter.value.split(",");
          return (
            (title[filter.category] ?? -1) >= parseInt(range[0]) &&
            (title[filter.category] ?? -1) <= parseInt(range[1])
          );
        }
        return false;
      });
      if (filteredList.length === 0) {
        break;
      }
    } else {
      const fuse = new Fuse(filteredList, {
        keys: ["title"],
        fieldNormWeight: 1,
      });
      filteredList = fuse.search(filter.value).map((result) => result.item);
    }
  }
  return filteredList;
}
