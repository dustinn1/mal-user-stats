import { useRef, useCallback } from "react";
import { useVirtual } from "react-virtual";
import AnimeCard from ".";
import { Anime } from "../../../interfaces/stats";

type Props = {
  data: Anime[];
};

export default function StatCardsContainer({ data }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtual({
    size: data.length,
    estimateSize: useCallback(() => 240, []),
    parentRef,
    windowRef: useRef(window),
    overscan: 5,
  });

  return (
    <div ref={parentRef}>
      <div
        style={{
          height: `${rowVirtualizer.totalSize / 3}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.index}
            className="grid grid-cols-3 gap-4"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {[...Array(3)].map((_, i) => {
              if (data[3 * virtualRow.index + i] !== undefined) {
                return (
                  <AnimeCard anime={data[3 * virtualRow.index + i]} key={i} />
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
