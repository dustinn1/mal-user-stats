import { useContext, ReactElement } from "react";
import { useRouter } from "next/router";
import { StatArray, StatArraysOnly } from "../../../../../interfaces/stats";
import StatsLayout from "../../../../../components/layouts/StatsLayout";
import { StatsContext } from "../../../../../contexts/StatsContext";
import CardFilters from "../../../../../components/stats/CardFilters";

export default function StatSection() {
  const router = useRouter();
  const { stat } = router.query;
  const section: string = router.query.section as string;

  const { mangas } = useContext(StatsContext);

  if (section !== undefined) {
    const statsSectionData: StatArray | undefined =
      [...mangas[stat as keyof StatArraysOnly]].find(
        (o: StatArray) => o.name.toLowerCase().replaceAll(" ", "_") === section
      ) ?? undefined;

    if (statsSectionData) {
      return (
        <CardFilters
          key={router.asPath}
          data={statsSectionData}
          allStats={mangas}
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
