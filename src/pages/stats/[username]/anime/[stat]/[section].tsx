import { useContext, ReactElement } from "react";
import { useRouter } from "next/router";
import { StatArray, StatArraysOnly } from "../../../../../interfaces/stats";
import StatsLayout from "../../../../../components/layouts/StatsLayout";
import { StatsContext } from "../../../../../contexts/StatsContext";
import AnimeCardsFilters from "../../../../../components/stats/AnimeCardsFilters";

export default function StatSection() {
  const router = useRouter();
  const { stat } = router.query;
  const section: string = router.query.section as string;

  const { animes } = useContext(StatsContext);

  if (section !== undefined) {
    const statsSectionData: StatArray | undefined =
      [...animes[stat as keyof StatArraysOnly]].find(
        (o: StatArray) => o.name.toLowerCase().replaceAll(" ", "_") === section
      ) ?? undefined;

    if (statsSectionData) {
      return (
        <AnimeCardsFilters
          key={router.asPath}
          data={statsSectionData}
          allStats={animes}
        />
      );
    } else {
      return (
        <h1 className="mt-8 text-center text-2xl font-bold">Page Not Found</h1>
      );
    }
  } else {
    return (
      <h1 className="mt-8 text-center text-2xl font-bold">Page Not Found</h1>
    );
  }
}

StatSection.getLayout = function getLayout(page: ReactElement) {
  return <StatsLayout>{page}</StatsLayout>;
};
