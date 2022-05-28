import { getTitlesInfo } from "../../utils/getTitlesInfo";
import CardsContainer from "./TitleCards/CardsContainer";
import { useListFilter } from "../../hooks/useListFilter";
import { StatArray, Stats, AnimeManga } from "../../interfaces/stats";
import FilterContainer from "./Filters/AnimeContainer";
import { FilterContext } from "../../contexts/FilterContext";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import prettyMs from "pretty-ms";

type Props = {
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

export default function AnimeCardsFilters({ data, allStats }: Props) {
  const animesInfos = getTitlesInfo(data.titles, allStats.titles);
  const filtersContext = useListFilter(animesInfos as AnimeManga[]);

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
            <br /> Animes
          </span>
          <span className="w-1/3">
            <strong>
              {data.length > 0
                ? prettyMs(data.length * 1000, {
                    verbose: true,
                    unitCount: width >= 768 ? 3 : 2,
                  })
                : "No time"}
            </strong>
            <br /> Watched
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
        titles={filtersContext.filteredList.sort(compare(filtersContext.sort))}
      />
    </>
  );
}
