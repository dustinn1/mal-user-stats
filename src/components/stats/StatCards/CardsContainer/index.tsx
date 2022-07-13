import type { StatArray } from "../../../../interfaces/stats";
import { classNames } from "../../../../utils/classNames";
import StatCard from "..";

type Props = {
  type: "anime" | "manga";
  data: StatArray[];
  offset: number;
  sort: "count" | "length" | "mean_score";
  isGrid: boolean;
};

export default function StatCardsContainer({
  type,
  data,
  offset,
  sort,
  isGrid,
}: Props) {
  return (
    <div
      className={classNames(
        "grid gap-4",
        isGrid ? "grid-cols-3" : "grid-cols-1"
      )}
    >
      {data.slice(offset, offset + 12).map((stat, index) => (
        <StatCard
          key={stat.id}
          type={type}
          data={stat}
          sort={sort}
          rank={offset + index + 1}
          isGrid={isGrid}
        />
      ))}
    </div>
  );
}
