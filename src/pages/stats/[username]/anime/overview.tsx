import { useContext, ReactElement } from "react";
import StatsLayout from "../../../../components/layouts/StatsLayout";
import CardsContainer from "../../../../components/stats/TitleCards/CardsContainer";
import AnimeFilterContainer from "../../../../components/stats/Filters/AnimeContainer";
import { FilterContext } from "../../../../contexts/FilterContext";
import { StatsContext } from "../../../../contexts/StatsContext";
import { useListFilter } from "../../../../hooks/useListFilter";
import { AnimeManga } from "../../../../interfaces/stats";
import { getTitlesInfo } from "../../../../utils/getTitlesInfo";
import { useWindowWidth } from "@react-hook/window-size";
import prettyMs from "pretty-ms";
import LoadingIndicator from "../../../../components/LoadingIndicator";

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

export default function StatsAnimeOverview() {
  const { animes } = useContext(StatsContext);
  const animesInfos = getTitlesInfo(
    Object.keys(animes.titles).map(Number),
    animes.titles
  );
  const filtersContext = useListFilter(animesInfos as AnimeManga[]);

  const width = useWindowWidth();

  if (typeof window !== "undefined") {
    return (
      <>
        <div className="mb-3 w-full rounded-lg bg-gray-100 pt-3">
          <div className="mx-4 flex items-center justify-center font-bold">
            <span className="text-3xl">Overview</span>
          </div>
          <div className="mx-4 flex py-2 text-center">
            <span className="w-1/5">
              <strong>{animes.overview.total}</strong>
              <br /> Animes
            </span>
            <span className="w-1/5">
              <strong>{animes.overview.watched_readed}</strong>
              <br /> Episodes Watched
            </span>
            <span className="w-1/5">
              <strong>
                {animes.overview.length > 0
                  ? prettyMs(animes.overview.length * 1000, {
                      verbose: true,
                      unitCount: width >= 768 ? 3 : 2,
                    })
                  : "No time"}
              </strong>
              <br /> Watched
            </span>
            <span className="w-1/5">
              <strong>{animes.overview.mean_score}</strong>
              <br /> Average Score
            </span>
            <span className="w-1/5">
              <strong>{animes.overview.standard_deviation}</strong>
              <br /> Standard Deviation
            </span>
          </div>
        </div>
        <FilterContext.Provider value={filtersContext}>
          <AnimeFilterContainer stats={animes} />
        </FilterContext.Provider>
        <CardsContainer
          type="anime"
          titles={filtersContext.filteredList.sort(
            compare(filtersContext.sort)
          )}
        />
      </>
    );
  } else {
    return (
      <div className="flex h-48 items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }
}

StatsAnimeOverview.getLayout = function getLayout(page: ReactElement) {
  return <StatsLayout>{page}</StatsLayout>;
};
