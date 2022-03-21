import { useState, ReactElement } from "react";
import StatsLayout from "../../../../components/layouts/StatsLayout";
import Card from "../../../../components/stats/Card";
import stats from "../../../../data/mock/animeStats.json";
import type { Genre } from "../../../../interfaces/stats";
import ChartContainer from "../../../../components/stats/ChartContainer";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import {
  faArrowDown19,
  faClock,
  faDivide,
} from "@fortawesome/free-solid-svg-icons";

function compare(prop: string) {
  if (prop === "count" || prop === "time_watched" || prop === "mean_score") {
    return function (a: Genre, b: Genre) {
      return b[prop] - a[prop];
    };
  } else {
    return function (a: Genre, b: Genre) {
      return b.count - a.count;
    };
  }
}
const genres = stats.genres;
const genresCards = [...genres];

export default function StatsAnimeGenres() {
  const [sort, setSort] = useState<"count" | "time_watched" | "mean_score">(
    "count"
  );

  return (
    <>
      <ChartContainer type="bar" data={genres} xKey="name" name="Genres" />
      <div className="mb-5 flex justify-between">
        <Input />
        <div>
          <Button
            onClick={() => setSort("count")}
            size="sm"
            icon={faArrowDown19}
            text="Count"
            active={sort === "count"}
          />
          <Button
            onClick={() => setSort("time_watched")}
            size="sm"
            icon={faClock}
            text="Time Watched"
            active={sort === "time_watched"}
          />
          <Button
            onClick={() => setSort("mean_score")}
            size="sm"
            icon={faDivide}
            text="Mean Score"
            active={sort === "mean_score"}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        {genresCards.sort(compare(sort)).map((genre: Genre, index: number) => (
          <Card
            key={genre.id}
            sort={sort}
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
