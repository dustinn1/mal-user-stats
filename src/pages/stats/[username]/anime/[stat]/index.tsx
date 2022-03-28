import { useState, useEffect, ReactElement } from "react";
import { useRouter } from "next/router";
import type {
  StatArraysOnly,
  StatArray,
} from "../../../../../interfaces/stats";
import StatsLayout from "../../../../../components/layouts/StatsLayout";
import StatCard from "../../../../../components/stats/StatCard";
import ChartContainer from "../../../../../components/stats/ChartContainer";
import Button from "../../../../../components/Button";
import {
  faArrowDown91,
  faClock,
  faDivide,
  faGrip,
  faGripLines,
} from "@fortawesome/free-solid-svg-icons";
import { statsPages } from "../../../../../data/statsPages";
import stats from "../../../../../data/mock/animeStats.json";

function compare(prop: string) {
  if (prop === "count" || prop === "time_watched" || prop === "mean_score") {
    return function (a: StatArray, b: StatArray) {
      return b[prop] - a[prop];
    };
  } else {
    return function (a: StatArray, b: StatArray) {
      return b.count - a.count;
    };
  }
}

const validStats = [
  "episodes_counts",
  "formats",
  "genres",
  "release_years",
  "scores",
  "statuses",
  "studios",
  "watch_years",
];

export default function StatsAnimePage() {
  const router = useRouter();
  const query: string = router.query.stat as string;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGrid, setIsGrid] = useState(true);
  const [sort, setSort] = useState<"count" | "time_watched" | "mean_score">(
    "count"
  );

  useEffect(() => {
    if (!router.isReady) return;
    setIsLoaded(true);
  }, [router.isReady]);

  if (isLoaded) {
    if (query !== undefined && validStats.some((v) => v === query)) {
      const pageInfo = statsPages.find((v) => v.id === query)!;
      const statsData: StatArray[] = stats[query as keyof StatArraysOnly];
      const statsDataCards = [...statsData];
      return (
        <>
          <ChartContainer
            type={pageInfo.chart.type}
            data={statsData}
            xKey="name"
            name={pageInfo.name}
          />
          <div className="mb-5 flex justify-between">
            {/* <Input /> */}
            <div>
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
            <div>
              <Button
                onClick={() => setSort("count")}
                size="sm"
                icon={faArrowDown91}
                text="Count"
                active={sort === "count"}
              />
              <Button
                onClick={() => setSort("time_watched")}
                size="sm"
                icon={faClock}
                text="Time Watched"
                active={sort === "time_watched"}
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
          <div
            className={`grid ${isGrid ? "grid-cols-3" : "grid-cols-1"} gap-5`}
          >
            {statsDataCards
              .sort(compare(sort))
              .map((stat: StatArray, index: number) => (
                <StatCard
                  key={stat.id}
                  sort={sort}
                  name={stat.name}
                  rank={index + 1}
                  amount={stat.count}
                  average={stat.mean_score}
                  time={stat.time_watched.toString()}
                  animes={stat.animes}
                  isGrid={isGrid}
                />
              ))}
          </div>
        </>
      );
    } else {
      return <p>404</p>;
    }
  } else {
    return <p>Loading</p>;
  }
}

StatsAnimePage.getLayout = function getLayout(page: ReactElement) {
  return <StatsLayout>{page}</StatsLayout>;
};
