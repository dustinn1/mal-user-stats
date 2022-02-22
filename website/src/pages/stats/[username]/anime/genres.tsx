import type { ReactElement } from "react";
import StatsLayout from "../../../../components/layouts/StatsLayout";
import Card from "../../../../components/stats/Card";

export default function StatsAnimeGenres() {
  const mock = [
    "1223/96541",
    "1299/110774",
    "7/81992",
    "9/76662",
    "1764/106659",
    "1972/111635",
    "6/89879",
    "1255/110636",
    "8/80356",
    "1671/111411",
  ];

  return (
    <>
      <div className="flex flex-wrap">
        <Card
          name="Comedy"
          rank={1}
          amount={201}
          average={8.23}
          time="32 days 26 minutes"
          covers={mock}
        />
      </div>
    </>
  );
}

StatsAnimeGenres.getLayout = function getLayout(page: ReactElement) {
  return <StatsLayout>{page}</StatsLayout>;
};
