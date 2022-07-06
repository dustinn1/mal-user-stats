import { useContext, ReactElement } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import StatsLayout from "../../../../components/layouts/StatsLayout";
import { StatsContext } from "../../../../contexts/StatsContext";
import { NextSeo } from "next-seo";
import TitleCardsContainerHeader from "../../../../components/stats/TitleCards/CardsContainer/Header";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import prettyMs from "pretty-ms";

const TitleCardsContainerFilters = dynamic(
  () =>
    import("../../../../components/stats/TitleCards/CardsContainer/WithFilters")
);

export default function StatOverview() {
  const router = useRouter();
  const { type } = router.query;
  const { user, ...stats } = useContext(StatsContext);
  const width = useWindowWidth();

  if (type !== "anime" && type !== "manga") {
    return <h1>404</h1>;
  }

  const typeStats = stats[`${type}s`];

  return (
    <>
      <NextSeo
        title={`Overview / ${type === "anime" ? "Anime" : "Manga"} - ${
          user.username
        }`}
      />
      <TitleCardsContainerHeader
        data={{
          title: "Overview",
          stats: [
            {
              id: "Animes",
              value: typeStats.overview.total,
            },
            {
              id: type === "anime" ? "Episodes Watched" : "Chapters Readed",
              value: typeStats.overview.watched_readed,
            },
            {
              id: "Watched",
              value:
                type === "anime"
                  ? typeStats.overview.length > 0
                    ? prettyMs(typeStats.overview.total * 1000, {
                        verbose: true,
                        unitCount: width >= 768 ? 3 : 2,
                      })
                    : "No time"
                  : null,
            },
            {
              id: "Average Score",
              value: typeStats.overview.mean_score,
            },
            {
              id: "Standard Deviation",
              value: typeStats.overview.standard_deviation,
            },
          ],
        }}
      />
      <TitleCardsContainerFilters
        type={type}
        key={router.asPath}
        allStats={typeStats}
      />
    </>
  );
}

StatOverview.getLayout = function getLayout(page: ReactElement) {
  return <StatsLayout>{page}</StatsLayout>;
};
