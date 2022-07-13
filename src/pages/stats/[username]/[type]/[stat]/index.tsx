import { useState, useContext, ReactElement } from "react";
import { useRouter } from "next/router";
import type {
  StatArraysOnly,
  StatArray,
} from "../../../../../interfaces/stats";
import StatsLayout from "../../../../../components/layouts/StatsLayout";
import { statsPages } from "../../../../../data/statsPages";
import { StatsContext } from "../../../../../contexts/StatsContext";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import { NextSeo } from "next-seo";
import StatCardsContainerFilter from "../../../../../components/stats/StatCards/CardsContainer/withFilter";

export default function StatPage() {
  const router = useRouter();
  const { type, stat, page } = router.query;
  const [isGrid, setIsGrid] = useState(true);
  const [sort, setSort] = useState<"count" | "length" | "mean_score">("count");
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
    return (
      <>
        <NextSeo
          title={`${pageInfo!.name.anime} / ${
            type === "anime" ? "Anime" : "Manga"
          } - ${user.username}`}
        />
        <StatCardsContainerFilter
          key={router.asPath}
          type={type}
          data={statsData}
          offset={(parseInt((page as string) ?? 1) - 1) * 12}
          sort={sort}
          isGrid={isGrid && width >= 1024}
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
