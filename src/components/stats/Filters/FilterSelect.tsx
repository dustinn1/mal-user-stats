import { useContext, useRef, useCallback } from "react";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StatArray } from "../../../interfaces/stats";
import { FilterContext } from "../../../contexts/FilterContext";
import { FilterCategories } from "../../../interfaces/filters";
import { classNames } from "../../../utils/classNames";
import { useVirtual } from "react-virtual";

type animes = {
  data: StatArray[];
  name: FilterCategories;
};

export default function FilterSelect({ data, name }: animes) {
  const filter = useContext(FilterContext);

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtual({
    size: data.length,
    parentRef,
    estimateSize: useCallback(() => 35, []),
    overscan: 5,
  });

  const dataSort = data.sort((a, b) => a.name.localeCompare(b.name));

  function SelectRow({ stat }: { stat: StatArray }) {
    const matchedFilter = filter.filters.find(
      (filter) => filter.category === name && filter.value === stat.name
    );
    return (
      <div
        key={stat.id}
        className={classNames(
          "flex justify-between py-1",
          matchedFilter && matchedFilter.type === "include"
            ? "text-green-600"
            : "",
          matchedFilter && matchedFilter.type === "exclude"
            ? "text-red-600"
            : ""
        )}
      >
        <span className="col-span-9 truncate">{stat.name}</span>
        <div className="flex gap-1">
          <div
            className={classNames(
              "w-7 cursor-pointer rounded-md border border-green-500 px-1.5 transition-all hover:bg-green-500 hover:text-white",
              matchedFilter && matchedFilter.type === "include"
                ? "bg-green-500 text-white"
                : "text-green-500"
            )}
            onClick={() => {
              if (matchedFilter && !(matchedFilter.type === "include")) {
                if (matchedFilter.type === "exclude") {
                  filter.removeFilter(name, "exclude", stat.name);
                }
                filter.addFilter(name, "include", stat.name);
              }
              if (matchedFilter && matchedFilter.type === "include") {
                filter.removeFilter(name, "include", stat.name);
              } else {
                filter.addFilter(name, "include", stat.name);
              }
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <div
            className={classNames(
              "w-7 cursor-pointer rounded-md border border-red-500 px-1.5 text-center transition-all hover:bg-red-500 hover:text-white",
              matchedFilter && matchedFilter.type === "exclude"
                ? "bg-red-500 text-white"
                : " text-red-500"
            )}
            onClick={() => {
              if (matchedFilter && !(matchedFilter.type === "exclude")) {
                if (matchedFilter.type === "include") {
                  filter.removeFilter(name, "include", stat.name);
                }
                filter.addFilter(name, "exclude", stat.name);
              }
              if (matchedFilter && matchedFilter.type === "exclude") {
                filter.removeFilter(name, "exclude", stat.name);
              } else {
                filter.addFilter(name, "exclude", stat.name);
              }
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md bg-white">
      <div className="border-b border-black px-4 py-1 font-bold capitalize">
        {name}
      </div>
      <div ref={parentRef} className="max-h-64 overflow-y-scroll px-4 py-1">
        <div
          className="relative divide-y divide-gray-300"
          style={{ height: `${rowVirtualizer.totalSize}px` }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => (
            <div
              key={virtualRow.index}
              className="absolute top-0 left-0 w-full"
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <SelectRow
                key={dataSort[virtualRow.index].id}
                stat={dataSort[virtualRow.index]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
