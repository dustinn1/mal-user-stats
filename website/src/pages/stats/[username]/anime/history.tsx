import type { ReactElement } from "react";
import StatsLayout from "../../../../components/layouts/StatsLayout";

export default function StatsAnimeHistory() {
  return (
    <>
      <h1>History</h1>
    </>
  );
}

StatsAnimeHistory.getLayout = function getLayout(page: ReactElement) {
  return <StatsLayout>{page}</StatsLayout>;
};
