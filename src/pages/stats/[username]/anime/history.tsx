import type { ReactElement } from "react";
import StatsLayout from "../../../../components/layouts/StatsLayout";
import ChartContainer from "../../../../components/charts/Container";
import stats from "../../../../data/mock/animeStats.json";

const releaseYears = stats.release_years;
const episodesCounts = stats.episodes_counts;
const formats = stats.formats;

export default function StatsAnimeHistory() {
  return (
    <div>
      <ChartContainer
        type="line"
        data={releaseYears}
        xKey="year"
        name="Release Years"
      />
      {/* <ChartContainer
        type="bar"
        data={episodesCounts}
        xKey="length"
        name="Episodes Counts"
      />
      <ChartContainer type="pie" data={formats} xKey="format" name="Formats" /> */}
    </div>
  );
}

StatsAnimeHistory.getLayout = function getLayout(page: ReactElement) {
  return <StatsLayout>{page}</StatsLayout>;
};
