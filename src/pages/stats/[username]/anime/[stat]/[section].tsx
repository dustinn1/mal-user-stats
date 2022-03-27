import { useState, useEffect, ReactElement } from "react";
import { useRouter } from "next/router";
import { StatArray, StatArraysOnly } from "../../../../../interfaces/stats";
import Link from "next/link";
import StatsLayout from "../../../../../components/layouts/StatsLayout";
import Button from "../../../../../components/Button";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import stats from "../../../../../data/mock/animeStats.json";
import AnimeCard from "../../../../../components/stats/AnimeCard";

import { getAnimesInfo } from "../../../../../utils/getAnimesInfo";

export default function StatSection() {
  const router = useRouter();
  const { username, stat } = router.query;
  const query: string = router.query.section as string;
  const [isLoaded, setIsLoaded] = useState(false);

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
        const animesInfos = getAnimesInfo(
          statsSectionData.animes,
          stats.animes
        );
        return (
          <>
            <Link href={`/stats/${username}/anime/${stat}`}>
              <a>
                <Button size="sm" icon={faAngleLeft} text="Back" />
              </a>
            </Link>
            <div className="my-4 w-full rounded-lg bg-gray-100 pt-3">
              <div className="mx-4 flex items-center justify-center font-bold">
                <span className="text-3xl">{statsSectionData.name}</span>
              </div>
              <div className="mx-4 flex py-3 text-center">
                <span className="w-1/3">
                  <strong>{statsSectionData.count}</strong>
                  <br /> Animes
                </span>
                <span className="w-1/3">
                  <strong>{statsSectionData.time_watched}</strong>
                  <br /> Watched
                </span>
                <span className="w-1/3">
                  <strong>{statsSectionData.mean_score}</strong>
                  <br /> Average Score
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {animesInfos.map((anime) => (
                <AnimeCard anime={anime} key={anime.id} />
              ))}
            </div>
          </>
        );
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
