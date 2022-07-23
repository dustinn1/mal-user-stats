import { useContext, ReactElement } from "react";
import { useRouter } from "next/router";
import type { StatArray } from "../../../../../interfaces/stats";
import StatsLayout from "../../../../../components/layouts/StatsLayout";
import { pageInfos } from "../../../../../data/statsPages";
import { StatsContext } from "../../../../../contexts/StatsContext";
import { NextSeo } from "next-seo";
import { StatCardsContextProvider } from "../../../../../contexts/cards/StatCardsContext";
import StatCardsContainer from "../../../../../components/stats/StatCards/CardsContainer";
import { StatCardsTopBar } from "../../../../../components/stats/CardsTopBar";
import { StatsPagination } from "../../../../../components/stats/Pagination";

export default function StatPage() {
  const router = useRouter();
  const { type, stat } = router.query;
  const { user, ...stats } = useContext(StatsContext);

  if (type !== "anime" && type !== "manga") {
    return <h1>404</h1>;
  }

  const pageInfo = pageInfos[type][stat as string];

  if (!pageInfo) {
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

  const typeStats = stats[`${type}s`];
  const statsData: StatArray[] = typeStats[pageInfo.key];

  return (
    <>
      <NextSeo
        title={`${pageInfo.name} / ${type === "anime" ? "Anime" : "Manga"} - ${
          user.username
        }`}
      />
      <StatCardsContextProvider type={type} data={statsData}>
        <StatCardsTopBar />
        <StatCardsContainer />
        <StatsPagination />
      </StatCardsContextProvider>
    </>
  );
}

StatPage.getLayout = function getLayout(page: ReactElement) {
  return <StatsLayout>{page}</StatsLayout>;
};
