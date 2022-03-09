import type { ReactElement } from "react";
import StatsLayout from "../../../../components/layouts/StatsLayout";

export default function StatsAnimeOverview() {
  return <h1>Overview</h1>;
}

StatsAnimeOverview.getLayout = function getLayout(page: ReactElement) {
  return <StatsLayout>{page}</StatsLayout>;
};
