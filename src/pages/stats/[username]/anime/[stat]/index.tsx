import { useState, useEffect, useContext, ReactElement } from "react";
import { useRouter } from "next/router";
//import dynamic from "next/dynamic";
import type {
  StatArraysOnly,
  StatArray,
} from "../../../../../interfaces/stats";
import StatsLayout from "../../../../../components/layouts/StatsLayout";
import Button from "../../../../../components/Button";
import {
  faArrowDown91,
  faClock,
  faDivide,
  faGrip,
  faGripLines,
} from "@fortawesome/free-solid-svg-icons";
import { statsPages } from "../../../../../data/statsPages";
import { StatsContext } from "../../../../../contexts/StatsContext";
import StatCardsContainer from "../../../../../components/stats/StatCard/CardsContainer";
import { DebounceInput } from "react-debounce-input";
import Fuse from "fuse.js";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import LoadingIndicator from "../../../../../components/LoadingIndicator";
//import ChartContainer from "../../../../../components/stats/ChartContainer";

/* const ChartContainer = dynamic(
  () => import("../../../../../components/stats/ChartContainer")
); */

export default function StatsAnimePage() {
  const router = useRouter();
  const query: string = router.query.stat as string;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGrid, setIsGrid] = useState(true);
  const [sort, setSort] = useState<"count" | "length" | "mean_score">("count");
  const [searchQuery, setSearchQuery] = useState("");
  const { animes } = useContext(StatsContext);

  const width = useWindowWidth();

  useEffect(() => {
    if (!router.isReady) return;
    setIsLoaded(true);
  }, [router.isReady]);

  if (isLoaded) {
    if (query !== undefined && statsPages.some((v) => v.id.anime === query)) {
      const pageInfo = statsPages.find((v) => v.id.anime === query);
      const statsData: StatArray[] =
        animes[
          statsPages.find((v) => v.id.anime === query)
            ?.key as keyof StatArraysOnly
        ];
      const statsDataCards = [...statsData];
      const fuse = new Fuse(statsDataCards, {
        keys: ["name"],
        fieldNormWeight: 1,
      });
      return (
        <>
          {/* <ChartContainer
            type={pageInfo.chart.type}
            data={statsData}
            xKey="name"
            name={pageInfo.name}
          /> */}
          <div className="mb-5 flex flex-wrap justify-center gap-2 lg:justify-between">
            <div className="flex grow xl:w-1/2 xl:grow-0">
              <DebounceInput
                type="search"
                id="search"
                name="search"
                placeholder="Search"
                autoComplete="off"
                className="h-8 w-full appearance-none rounded-md border border-gray-400 bg-white px-3 outline-0 duration-100 ease-linear focus:border-blue-900 focus:transition-colors lg:h-auto"
                debounceTimeout={300}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              {width >= 1024 && (
                <div className="ml-2 w-1/2">
                  <Button
                    onClick={() => setIsGrid(true)}
                    size="sm"
                    icon={faGrip}
                    text="Grid"
                    active={isGrid}
                  />
                  <Button
                    onClick={() => setIsGrid(false)}
                    size="sm"
                    icon={faGripLines}
                    text="Rows"
                    active={!isGrid}
                  />
                </div>
              )}
            </div>
            <div className="flex overflow-x-scroll">
              <Button
                onClick={() => setSort("count")}
                size="sm"
                icon={faArrowDown91}
                text="Count"
                active={sort === "count"}
              />
              <Button
                onClick={() => setSort("length")}
                size="sm"
                icon={faClock}
                text="Time Watched"
                active={sort === "length"}
              />
              <Button
                onClick={() => setSort("mean_score")}
                size="sm"
                icon={faDivide}
                text="Mean Score"
                active={sort === "mean_score"}
              />
            </div>
          </div>
          <StatCardsContainer
            type="anime"
            data={
              searchQuery !== ""
                ? fuse.search(searchQuery).map((e) => e.item)
                : statsDataCards
            }
            sort={sort}
            isGrid={isGrid && width >= 1024}
            isSearching={searchQuery !== ""}
          />
        </>
      );
    } else {
      return (
        <h1 className="mt-8 text-center text-2xl font-bold">Page Not Found</h1>
      );
    }
  } else {
    return (
      <div className="flex h-48 items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }
}

StatsAnimePage.getLayout = function getLayout(page: ReactElement) {
  return <StatsLayout>{page}</StatsLayout>;
};
