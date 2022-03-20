import type { ReactElement } from "react";
import StatsLayout from "../../../../components/layouts/StatsLayout";
import Card from "../../../../components/stats/Card";
import stats from "../../../../data/mock/animeStats.json";
import type { Genre } from "../../../../interfaces/stats";
export default function StatsAnimeGenres() {
  const genres = stats.genres;

  return (
    <>
      <div className="flex flex-wrap">
        {[...genres].map((genre: Genre, index: number) => (
          <Card
            key={genre.id}
            name={genre.name}
            rank={index + 1}
            amount={genre.count}
            average={genre.mean_score}
            time={genre.time_watched.toString()}
            animes={genre.animes}
          />
        ))}
      </div>
    </>
  );
}

StatsAnimeGenres.getLayout = function getLayout(page: ReactElement) {
  return <StatsLayout>{page}</StatsLayout>;
};
