import { getAnimesInfo } from "../../utils/getAnimesInfo";
import CardsContainer from "./AnimeCard/CardsContainer";
import { useListFilter } from "../../hooks/useListFilter";
import { StatArray, AnimeStats } from "../../interfaces/stats";
import FilterContainer from "../stats/Filters/Container";
import { FilterContext } from "../../contexts/FilterContext";

type Props = {
  data: StatArray;
  allStats: AnimeStats;
};

export default function StatsSectionLoaded({ data, allStats }: Props) {
  const animesInfos = getAnimesInfo(data.animes, allStats.animes);

  const {
    filteredList,
    length,
    addFilter,
    removeFilter,
    clearFilters,
    filters,
  } = useListFilter(animesInfos);

  return (
    <>
      {length}
      <p onClick={() => clearFilters()}>Clear Filters</p>
      {JSON.stringify(filters)}
      {/* <Link href={`/stats/${username}/anime/${stat}`}>
        <a>
          <Button size="sm" icon={faAngleLeft} text="Back" />
        </a>
      </Link> */}
      <div className="my-4 w-full rounded-lg bg-gray-100 pt-3">
        <div className="mx-4 flex items-center justify-center font-bold">
          <span className="text-3xl">{data.name}</span>
        </div>
        <div className="mx-4 flex py-3 text-center">
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
      <FilterContext.Provider value={{ addFilter, removeFilter, filters }}>
        <FilterContainer stats={allStats} />
      </FilterContext.Provider>
      <CardsContainer data={filteredList} />
    </>
  );
}
