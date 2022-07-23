import { useContext, ReactElement } from "react";
import { useRouter } from "next/router";
import { StatArray } from "../../../../../interfaces/stats";
import StatsLayout from "../../../../../components/layouts/StatsLayout";
import { StatsContext } from "../../../../../contexts/StatsContext";
import { pageInfos } from "../../../../../data/statsPages";
import { NextSeo } from "next-seo";
import TitleCardsContainerHeader from "../../../../../components/stats/TitleCards/CardsContainer/Header";
import prettyMs from "pretty-ms";
import { TitleCardsContextProvider } from "../../../../../contexts/cards/TitleCardsContext";
import TitleCardsContainer from "../../../../../components/stats/TitleCards/CardsContainer";
import { TitlesPagination } from "../../../../../components/stats/Pagination";
import { TitleCardsTopBar } from "../../../../../components/stats/CardsTopBar";

export default function StatSectionPage() {
  const router = useRouter();
  const { type, stat, section } = router.query;
  const { user, ...stats } = useContext(StatsContext);

  if (type !== "anime" && type !== "manga") {
    return <h1>404</h1>;
  }

  const pageInfo = pageInfos[type][stat as string];

  if (!pageInfo || !section) {
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
  const statsSectionData: StatArray | undefined = typeStats[pageInfo.key].find(
    (o: StatArray) => o.name.toLowerCase().replaceAll(" ", "_") === section
  );

  if (!statsSectionData) {
    return (
      <>
        <NextSeo
          title={`Page Not Found / ${pageInfo.name} / ${
            type === "anime" ? "Anime" : "Manga"
          } - ${user.username}`}
        />
        <h1 className="mt-8 text-center text-2xl font-bold">Page Not Found</h1>
      </>
    );
  }

  return (
    <>
      <NextSeo
        title={`${statsSectionData.name} / ${pageInfo.name} / ${
          type === "anime" ? "Anime" : "Manga"
        } - ${user.username}`}
      />
      <TitleCardsContextProvider type={type} data={statsSectionData}>
        <TitleCardsContainerHeader
          data={{
            title: statsSectionData.name,
            stats: [
              {
                id: "Animes",
                value: statsSectionData.count,
              },
              {
                id: type === "anime" ? "Watched" : "Read",
                value:
                  type === "anime"
                    ? statsSectionData.length > 0
                      ? prettyMs(statsSectionData.length * 1000, {
                          verbose: true,
                          unitCount: 3,
                        })
                      : "No time"
                    : statsSectionData.length > 0
                    ? `${statsSectionData.length} chapters`
                    : "No chapters",
              },
              {
                id: "Average Score",
                value: statsSectionData.mean_score,
              },
            ],
          }}
        />
        <TitleCardsTopBar />
        <TitleCardsContainer />
        <TitlesPagination />
      </TitleCardsContextProvider>
    </>
  );
}

StatSectionPage.getLayout = function getLayout(page: ReactElement) {
  return <StatsLayout>{page}</StatsLayout>;
};
