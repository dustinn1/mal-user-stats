import { getAnimesInfo } from "../../utils/getAnimesInfo";
import CardsContainer from "./AnimeCard/CardsContainer";
import { useListFilter } from "../../hooks/useListFilter";
import { StatArray, AnimeStats, Anime } from "../../interfaces/stats";
import FilterContainer from "../stats/Filters/Container";
import { FilterContext } from "../../contexts/FilterContext";

type Props = {
  data: StatArray;
  allStats: AnimeStats;
};

function compare(prop: string) {
  if (prop === "title") {
    return function (a: Anime, b: Anime) {
      return a[prop].localeCompare(b[prop]);
    };
  } else if (
    prop === "score" ||
    prop === "episodes_count" ||
    prop === "release_year" ||
    prop === "watch_year"
  ) {
    return function (a: Anime, b: Anime) {
      return b[prop]! - a[prop]!;
    };
  }
}

export default function StatsSectionLoaded({ data, allStats }: Props) {
  const animesInfos = getAnimesInfo(data.animes, allStats.animes);

  const filtersContext = useListFilter(animesInfos);

  return (
    <>
      {/* <Link href={`/stats/${username}/anime/${stat}`}>
        <a>
          <Button size="sm" icon={faAngleLeft} text="Back" />
        </a>
      </Link> */}
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
            <strong>{data.time_watched}</strong>
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
        data={filtersContext.filteredList.sort(compare(filtersContext.sort))}
      />
    </>
  );
}
