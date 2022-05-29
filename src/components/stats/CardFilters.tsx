import { getTitlesInfo } from "../../utils/getTitlesInfo";
import CardsContainer from "./TitleCards/CardsContainer";
import { useListFilter } from "../../hooks/useListFilter";
import { StatArray, Stats, AnimeManga } from "../../interfaces/stats";
import AnimeFilterContainer from "./Filters/AnimeContainer";
import MangaFilterContainer from "./Filters/MangaContainer";
import { FilterContext } from "../../contexts/FilterContext";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import prettyMs from "pretty-ms";

type Props = {
  type: "anime" | "manga";
  data: StatArray;
  allStats: Stats;
};

function compare(prop: string) {
  if (prop === "title") {
    return function (a: AnimeManga, b: AnimeManga) {
      return a[prop].localeCompare(b[prop]);
    };
  } else if (
    prop === "score" ||
    prop === "count" ||
    prop === "release_year" ||
    prop === "start_year"
  ) {
    return function (a: AnimeManga, b: AnimeManga) {
      return b[prop]! - a[prop]!;
    };
  }
}

export default function CardsFilters({ type, data, allStats }: Props) {
  const animesInfos = getTitlesInfo(data.titles, allStats.titles);
  const filtersContext = useListFilter(animesInfos);

  const width = useWindowWidth();

  return (
    <>
      <div className="mb-3 w-full rounded-lg border border-blue-600 bg-gray-100 pt-3">
        <div className="mx-4 flex items-center justify-center font-bold">
          <span className="text-center text-3xl">{data.name}</span>
        </div>
        <div className="mx-4 flex py-2 text-center">
          <span className="w-1/3">
            <strong>{data.count}</strong>
            <br /> Animes
          </span>
          <span className="w-1/3">
            <strong>
              {type === "anime"
                ? data.length > 0
                  ? prettyMs(data.length * 1000, {
                      verbose: true,
                      unitCount: width >= 768 ? 3 : 2,
                    })
                  : "No time"
                : data.length > 0
                ? `${data.length} chapters`
                : "No chapters"}
            </strong>
            <br /> {type === "anime" ? "Watched" : "Read"}
          </span>
          <span className="w-1/3">
            <strong>{data.mean_score}</strong>
            <br /> Average Score
          </span>
        </div>
      </div>
      <FilterContext.Provider value={filtersContext}>
        {type === "anime" ? (
          <AnimeFilterContainer stats={allStats} />
        ) : (
          <MangaFilterContainer stats={allStats} />
        )}
      </FilterContext.Provider>
      <CardsContainer
        type={type}
        titles={filtersContext.filteredList.sort(compare(filtersContext.sort))}
      />
    </>
  );
}
