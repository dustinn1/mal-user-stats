import { useContext, useRef, useCallback } from "react";
import { StatArray, StatArraysOnly } from "../../../../interfaces/stats";
import { useVirtualizer } from "@tanstack/react-virtual";
import { StatsContext } from "../../../../contexts/StatsContext";
import { FilterCategories } from "../../../../interfaces/filters";
import SelectRow from "./Row";

type Props = {
  name: FilterCategories;
  dataKey: keyof StatArraysOnly;
};

export default function FilterSelect({ name, dataKey }: Props) {
  const stats = useContext(StatsContext);

  const typeStats = stats["animes"];
  const data: StatArray[] = typeStats[dataKey];

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => 35, []),
    overscan: 5,
    paddingEnd: 10,
  });

  const dataSort = data.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div ref={parentRef} className="max-h-96 overflow-y-scroll px-4">
      <div
        className="relative divide-y divide-gray-300"
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            className="absolute top-0 left-0 w-full"
            style={{
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <SelectRow name={name} stat={dataSort[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
