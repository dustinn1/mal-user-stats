import { useContext, ReactElement } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { StatArray, StatArraysOnly } from "../../../../../interfaces/stats";
import StatsLayout from "../../../../../components/layouts/StatsLayout";
import { StatsContext } from "../../../../../contexts/StatsContext";
import { statsPages } from "../../../../../data/statsPages";
import { NextSeo } from "next-seo";

const CardFilters = dynamic(
  () => import("../../../../../components/stats/CardFilters")
);

export default function StatSection() {
  const router = useRouter();
  const { stat } = router.query;
  const section: string = router.query.section as string;

  const { animes, user } = useContext(StatsContext);

  if (section !== undefined) {
    const pageInfo = statsPages.find((v) => v.id.anime === stat);
    const statsSectionData: StatArray | undefined =
      [...animes[pageInfo?.key as keyof StatArraysOnly]].find(
        (o: StatArray) => o.name.toLowerCase().replaceAll(" ", "_") === section
      ) ?? undefined;

    if (statsSectionData) {
      return (
        <>
          <NextSeo
            title={`${statsSectionData.name} / ${
              pageInfo!.name.anime
            } / Anime - ${user.username}`}
          />
          <CardFilters
            type="anime"
            key={router.asPath}
            data={statsSectionData}
            allStats={animes}
          />
        </>
      );
    } else {
      return (
        <>
          <NextSeo
            title={`Page Not Found / ${pageInfo!.name.anime} / Anime - ${
              user.username
            }`}
          />
          <h1 className="mt-8 text-center text-2xl font-bold">
            Page Not Found
          </h1>
        </>
      );
    }
  } else {
    return (
      <>
        <NextSeo title={`Page Not Found / Anime - ${user.username}`} />
        <h1 className="mt-8 text-center text-2xl font-bold">Page Not Found</h1>
      </>
    );
  }
}

StatSection.getLayout = function getLayout(page: ReactElement) {
  return <StatsLayout>{page}</StatsLayout>;
};
