import { useContext, ReactElement } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { StatArray, StatArraysOnly } from "../../../../../interfaces/stats";
import StatsLayout from "../../../../../components/layouts/StatsLayout";
import { StatsContext } from "../../../../../contexts/StatsContext";
import { statsPages } from "../../../../../data/statsPages";
import { NextSeo } from "next-seo";
import TitleCardsContainerHeader from "../../../../../components/stats/TitleCards/CardsContainer/Header";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import prettyMs from "pretty-ms";

const TitleCardsContainerFilters = dynamic(
  () =>
    import(
      "../../../../../components/stats/TitleCards/CardsContainer/WithFilters"
    )
);

export default function StatSection() {
  const router = useRouter();
  const { type, stat, section } = router.query;
  const { user, ...stats } = useContext(StatsContext);
  const width = useWindowWidth();

  if (type !== "anime" && type !== "manga") {
    return <h1>404</h1>;
  }

  if (section === undefined) {
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

  const pageInfo = statsPages.find((v) => v.id[type] === stat);
  const typeStats = stats[`${type}s`];
  const statsSectionData: StatArray | undefined = typeStats[
    pageInfo?.key as keyof StatArraysOnly
  ].find(
    (o: StatArray) => o.name.toLowerCase().replaceAll(" ", "_") === section
  );

  if (statsSectionData) {
    return (
      <>
        <NextSeo
          title={`${statsSectionData.name} / ${pageInfo!.name[type]} / ${
            type === "anime" ? "Anime" : "Manga"
          } - ${user.username}`}
        />
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
                          unitCount: width >= 768 ? 3 : 2,
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
        <TitleCardsContainerFilters
          type={type}
          key={router.asPath}
          data={statsSectionData}
          allStats={typeStats}
        />
      </>
    );
  } else {
    return (
      <>
        <NextSeo
          title={`Page Not Found / ${pageInfo!.name[type]} / ${
            type === "anime" ? "Anime" : "Manga"
          } - ${user.username}`}
        />
        <h1 className="mt-8 text-center text-2xl font-bold">Page Not Found</h1>
      </>
    );
  }
}

StatSection.getLayout = function getLayout(page: ReactElement) {
  return <StatsLayout>{page}</StatsLayout>;
};
