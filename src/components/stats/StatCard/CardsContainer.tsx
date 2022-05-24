import { useRef, useCallback } from "react";
import { useVirtual } from "react-virtual";
import StatCard from ".";
import { StatArray } from "../../../interfaces/stats";
import { classNames } from "../../../utils/classNames";
import { useWindowWidth } from "@react-hook/window-size";

type Props = {
  data: StatArray[];
  sort: "count" | "time_watched" | "mean_score";
  isGrid: boolean;
  isSearching: boolean;
};

function compare(prop: string) {
  if (prop === "count" || prop === "time_watched" || prop === "mean_score") {
    return function (a: StatArray, b: StatArray) {
      return b[prop] - a[prop];
    };
  }
}

export default function StatCardsContainer({
  data,
  sort,
  isGrid,
  isSearching,
}: Props) {
  const stats = !isSearching ? data.sort(compare(sort)) : data;
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtual({
    size: stats.length,
    estimateSize: useCallback(() => 245, []),
    parentRef,
    windowRef: useRef(window),
    overscan: 3,
  });

  const width = useWindowWidth();

  return (
    <div ref={parentRef}>
      <div
        style={{
          height: `${
            rowVirtualizer.totalSize / (isGrid ? 3 : 1) +
            (width > 768 ? 200 : 50)
          }px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.index}
            className={classNames(
              "grid gap-4",
              isGrid ? "grid-cols-3" : "grid-cols-1"
            )}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {[...Array(isGrid ? 3 : 1)].map((_, i) => {
              const index = isGrid
                ? 3 * virtualRow.index + i
                : virtualRow.index;
              if (stats[index] !== undefined) {
                return (
                  <StatCard
                    key={stats[index].id}
                    statArray={stats[index]}
                    sort={sort}
                    rank={index + 1}
                    isGrid={isGrid}
                  />
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
