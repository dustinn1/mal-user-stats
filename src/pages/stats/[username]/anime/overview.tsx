import { useContext, ReactElement } from "react";
import StatsLayout from "../../../../components/layouts/StatsLayout";
import CardsContainer from "../../../../components/stats/AnimeCard/CardsContainer";
import FilterContainer from "../../../../components/stats/Filters/Container";
import { FilterContext } from "../../../../contexts/FilterContext";
import { StatsContext } from "../../../../contexts/StatsContext";
import { useListFilter } from "../../../../hooks/useListFilter";
import { Anime } from "../../../../interfaces/stats";
import { getAnimesInfo } from "../../../../utils/getAnimesInfo";
import { useWindowWidth } from "@react-hook/window-size";
import prettyMs from "pretty-ms";
import LoadngIndicator from "../../../../components/LoadngIndicator";

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

export default function StatsAnimeOverview() {
  const stats = useContext(StatsContext);
  const animesInfos = getAnimesInfo(
    Object.keys(stats.animes).map(Number),
    stats.animes
  );
  const filtersContext = useListFilter(animesInfos);

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
              <strong>{stats.overview.total_anime}</strong>
              <br /> Animes
            </span>
            <span className="w-1/5">
              <strong>{stats.overview.episodes_watched}</strong>
              <br /> Episodes
            </span>
            <span className="w-1/5">
              <strong>
                {stats.overview.time_watched > 0
                  ? prettyMs(stats.overview.time_watched * 1000, {
                      verbose: true,
                      unitCount: width >= 768 ? 3 : 2,
                    })
                  : "No time"}
              </strong>
              <br /> Watched
            </span>
            <span className="w-1/5">
              <strong>{stats.overview.mean_score}</strong>
              <br /> Average Score
            </span>
            <span className="w-1/5">
              <strong>{stats.overview.standard_deviation}</strong>
              <br /> Standard Deviation
            </span>
          </div>
        </div>
        <FilterContext.Provider value={filtersContext}>
          <FilterContainer stats={stats} />
        </FilterContext.Provider>
        <CardsContainer
          data={filtersContext.filteredList.sort(compare(filtersContext.sort))}
        />
      </>
    );
  } else {
    return <LoadngIndicator />;
  }
}

StatsAnimeOverview.getLayout = function getLayout(page: ReactElement) {
  return <StatsLayout>{page}</StatsLayout>;
};
