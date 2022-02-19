import type { ReactElement } from "react";
import StatsLayout from "../../../../components/layouts/StatsLayout";

export default function StatsAnimeGenres() {
  return (
    <>
      <h1>Genres</h1>
    </>
  );
}

StatsAnimeGenres.getLayout = function getLayout(page: ReactElement) {
  return <StatsLayout>{page}</StatsLayout>;
};
