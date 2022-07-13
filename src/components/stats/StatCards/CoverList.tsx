import { useRef, useCallback, useContext } from "react";
import type { StatArray } from "../../../interfaces/stats";
import { StatsContext } from "../../../contexts/StatsContext";
import { useVirtualizer } from "@tanstack/react-virtual";
import Image from "next/future/image";

type Props = {
  type: "anime" | "manga";
  statArray: StatArray;
};

export default function CoverList({ type, statArray }: Props) {
  const stats = useContext(StatsContext);
  const allTitles = stats[`${type}s`].titles;
  const listParentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: statArray.titles.length,
    getScrollElement: () => listParentRef.current,
    estimateSize: useCallback(() => 90, []),
    horizontal: true,
    paddingStart: 16,
    paddingEnd: 16,
  });

  return (
    <div className="overflow-auto py-3" ref={listParentRef}>
      <div
        style={{
          width: `${rowVirtualizer.getTotalSize()}px`,
          height: "120px",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          return (
            <div
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: `${virtualItem.size}px`,
                transform: `translateX(${virtualItem.start}px)`,
              }}
            >
              <Image
                src={`https://cdn.myanimelist.net/images/${type}/${
                  allTitles[statArray.titles[virtualItem.index]].image_url_id
                }.webp`}
                alt="image"
                height={120}
                width={85}
                className="h-full rounded-md object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
