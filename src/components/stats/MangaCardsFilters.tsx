import { getTitlesInfo } from "../../utils/getTitlesInfo";
import CardsContainer from "./TitleCards/CardsContainer";
import { useListFilter } from "../../hooks/useListFilter";
import { StatArray, MangaStats, Manga } from "../../interfaces/stats";
import FilterContainer from "./Filters/Container";
import { FilterContext } from "../../contexts/FilterContext";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import prettyMs from "pretty-ms";

type Props = {
  data: StatArray;
  allStats: MangaStats;
};

function compare(prop: string) {
  if (prop === "title") {
    return function (a: Manga, b: Manga) {
      return a[prop].localeCompare(b[prop]);
    };
  } else if (
    prop === "score" ||
    prop === "chapters_count" ||
    prop === "release_year" ||
    prop === "start_year"
  ) {
    return function (a: Manga, b: Manga) {
      return b[prop]! - a[prop]!;
    };
  }
}

export default function MangaCardsFilters({ data, allStats }: Props) {
  const animesInfos = getTitlesInfo(data.titles, allStats.mangas);
  const filtersContext = useListFilter(animesInfos);

  const width = useWindowWidth();

  return (
    <>
      <div className="mb-3 w-full rounded-lg bg-gray-100 pt-3">
        <div className="mx-4 flex items-center justify-center font-bold">
          <span className="text-3xl">{data.name}</span>
        </div>
        <div className="mx-4 flex py-2 text-center">
          <span className="w-1/3">
            <strong>{data.count}</strong>
            <br /> Mangas
          </span>
          <span className="w-1/3">
            <strong>{data.length > 0 ? data.length : "No chapters"}</strong>
            <br /> Read
          </span>
          <span className="w-1/3">
            <strong>{data.mean_score}</strong>
            <br /> Average Score
          </span>
        </div>
      </div>
      <FilterContext.Provider value={filtersContext}>
        <FilterContainer stats={allStats} />
      </FilterContext.Provider>
      <CardsContainer
        mangas={filtersContext.filteredList.sort(compare(filtersContext.sort))}
      />
    </>
  );
}
