import { useRef, useCallback } from "react";
import { useVirtual } from "react-virtual";
import StatCard from "./StatCard";
import { StatArray } from "../../interfaces/stats";

type Props = {
  data: StatArray[];
  sort: "count" | "time_watched" | "mean_score";
};

function compare(prop: string) {
  if (prop === "count" || prop === "time_watched" || prop === "mean_score") {
    return function (a: StatArray, b: StatArray) {
      return b[prop] - a[prop];
    };
  } else {
    return function (a: StatArray, b: StatArray) {
      return b.count - a.count;
    };
  }
}

export default function StatCardsContainer({ data, sort }: Props) {
  const stats = data.sort(compare(sort));
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtual({
    size: stats.length,
    estimateSize: useCallback(() => 245, []),
    parentRef,
    windowRef: useRef(window),
  });

  return (
    <div className="grid grid-cols-1" ref={parentRef}>
      <div
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <StatCard
              key={stats[virtualRow.index].id}
              sort={sort}
              name={stats[virtualRow.index].name}
              rank={virtualRow.index + 1}
              amount={stats[virtualRow.index].count}
              average={stats[virtualRow.index].mean_score}
              time={stats[virtualRow.index].time_watched.toString()}
              animes={stats[virtualRow.index].animes}
              isGrid={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
