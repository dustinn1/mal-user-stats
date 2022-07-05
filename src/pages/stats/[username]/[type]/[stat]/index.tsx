import { useState, useContext, ReactElement } from "react";
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
import { NextSeo } from "next-seo";
//import ChartContainer from "../../../../../components/stats/ChartContainer";

/* const ChartContainer = dynamic(
  () => import("../../../../../components/stats/ChartContainer")
); */

export default function StatPage() {
  const router = useRouter();
  const { type, stat } = router.query;
  const [isGrid, setIsGrid] = useState(true);
  const [sort, setSort] = useState<"count" | "length" | "mean_score">("count");
  const [searchQuery, setSearchQuery] = useState("");
  const { user, ...stats } = useContext(StatsContext);

  const width = useWindowWidth();

  if (type !== "anime" && type !== "manga") {
    return <h1>404</h1>;
  }

  if (stat !== undefined && statsPages.some((v) => v.id[type] === stat)) {
    const pageInfo = statsPages.find((v) => v.id[type] === stat);
    const typeStats = stats[`${type}s`];
    const statsData: StatArray[] =
      typeStats[
        statsPages.find((v) => v.id[type] === stat)?.key as keyof StatArraysOnly
      ];
    const statsDataCards = [...statsData];
    const fuse = new Fuse(statsDataCards, {
      keys: ["name"],
      fieldNormWeight: 1,
    });
    return (
      <>
        <NextSeo
          title={`${pageInfo!.name.anime} / ${
            type === "anime" ? "Anime" : "Manga"
          } - ${user.username}`}
        />
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
              className="h-8 w-full appearance-none rounded-md border border-gray-400 bg-white px-3 outline-0 duration-100 ease-linear focus:border-blue-900 dark:border-gray-500 dark:bg-black dark:focus:border-blue-400 lg:h-auto"
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
          type={type}
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
      <>
        <NextSeo
          title={`Page Not Found / ${type === "anime" ? "Anime" : "Manga"} - ${
            user.username
          }`}
        />
        <h1 className="mt-8 text-center text-2xl font-bold">Page Not Found</h1>
      </>
    );
  }
}

StatPage.getLayout = function getLayout(page: ReactElement) {
  return <StatsLayout>{page}</StatsLayout>;
};
