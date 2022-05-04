import { useContext, memo } from "react";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StatArray } from "../../../interfaces/stats";
import { FilterContext } from "../../../contexts/FilterContext";
import { FilterCategories } from "../../../interfaces/filters";
import { classNames } from "../../../utils/classNames";

type animes = {
  data: StatArray[];
  name: FilterCategories;
};

export default memo(function FilterSelect({ data, name }: animes) {
  const filter = useContext(FilterContext);

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
        <span>{stat.name}</span>
        <div className="grid grid-cols-2 gap-2.5">
          <div
            className={classNames(
              "cursor-pointer rounded-md border border-green-500 px-1.5 transition-all hover:bg-green-500 hover:text-white",
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
              "cursor-pointer rounded-md border border-red-500 px-1.5 text-center transition-all hover:bg-red-500 hover:text-white",
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
      <div className="h-64 divide-y divide-gray-300 overflow-y-scroll px-4 py-1 ">
        {data
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((stat) => (
            <SelectRow key={stat.id} stat={stat} />
          ))}
      </div>
    </div>
  );
});
