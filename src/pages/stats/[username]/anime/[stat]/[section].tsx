import { useState, useEffect, useContext, ReactElement } from "react";
import { useRouter } from "next/router";
import { StatArray, StatArraysOnly } from "../../../../../interfaces/stats";
import StatsLayout from "../../../../../components/layouts/StatsLayout";
import { StatsContext } from "../../../../../contexts/StatsContext";
import AnimeCardsFilters from "../../../../../components/stats/AnimeCardsFilters";

export default function StatSection() {
  const router = useRouter();
  const { username, stat } = router.query;
  const query: string = router.query.section as string;
  const [isLoaded, setIsLoaded] = useState(false);

  const stats = useContext(StatsContext);

  useEffect(() => {
    if (!router.isReady) return;
    setIsLoaded(true);
  }, [router.isReady]);

  if (isLoaded) {
    if (query !== undefined) {
      const statsSectionData: StatArray | undefined =
        [...stats[stat as keyof StatArraysOnly]].find(
          (o: StatArray) => o.name.toLowerCase().replaceAll(" ", "_") === query
        ) ?? undefined;

      if (statsSectionData) {
        return <AnimeCardsFilters data={statsSectionData} allStats={stats} />;
      } else {
        return <p>404</p>;
      }
    } else {
      return <p>404</p>;
    }
  } else {
    return <p>Loading</p>;
  }
}

StatSection.getLayout = function getLayout(page: ReactElement) {
  return <StatsLayout>{page}</StatsLayout>;
};
