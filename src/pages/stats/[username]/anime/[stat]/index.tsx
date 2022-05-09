import { useState, useEffect, useContext, ReactElement } from "react";
import { useRouter } from "next/router";
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
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { statsPages } from "../../../../../data/statsPages";
import { StatsContext } from "../../../../../contexts/StatsContext";
import StatCardsContainer from "../../../../../components/stats/StatCard/CardsContainer";

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

  const stats = useContext(StatsContext);

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
          {/* <ChartContainer
            type={pageInfo.chart.type}
            data={statsData}
            xKey="name"
            name={pageInfo.name}
          /> */}
          <div className="mb-5 flex justify-between">
            <div className="flex w-1/2">
              <div className="grow">{/* <Input /> */}</div>
              <Button size="sm" icon={faFilter} text="Filter" />
            </div>
            {/* <div>
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
            </div> */}
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
          <StatCardsContainer data={statsDataCards} sort={sort} />
          {/* <div
            className={`grid ${isGrid ? "grid-cols-3" : "grid-cols-1"} gap-5`}
          >
          </div> */}
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
