import { getTitlesInfo } from "../../../../utils/getTitlesInfo";
import CardsContainer from ".";
import { useListFilter } from "../../../../hooks/useListFilter";
import { StatArray, Stats, AnimeManga } from "../../../../interfaces/stats";
import FilterContainer from "../../Filters/Container";
import { FilterContext } from "../../../../contexts/FilterContext";

type Props = {
  type: "anime" | "manga";
  data?: StatArray;
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

export default function TitleCardsContainerFilters({
  type,
  data,
  allStats,
}: Props) {
  const titlesInfo = getTitlesInfo(allStats.titles, data?.titles);
  const filtersContext = useListFilter(titlesInfo);

  return (
    <>
      <FilterContext.Provider value={filtersContext}>
        <FilterContainer type={type} stats={allStats} />
      </FilterContext.Provider>
      <CardsContainer
        type={type}
        titles={filtersContext.filteredList.sort(compare(filtersContext.sort))}
      />
    </>
  );
}
