import type { ReactElement } from "react";
import StatsLayout from "../../../../components/layouts/StatsLayout";

export default function StatsAnimeStudios() {
  return <h1>Studios</h1>;
}

StatsAnimeStudios.getLayout = function getLayout(page: ReactElement) {
  return <StatsLayout>{page}</StatsLayout>;
};
