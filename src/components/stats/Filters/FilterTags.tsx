import { useContext } from "react";
import { FilterContext } from "../../../contexts/FilterContext";
import {
  faDeleteLeft,
  faFilter,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FilterCategories, FilterTypes } from "../../../interfaces/filters";
import { classNames } from "../../../utils/classNames";

type TagProps = {
  category: FilterCategories;
  type: FilterTypes;
  value: string;
};

export default function FilterTags() {
  const filter = useContext(FilterContext);

  function Tag({ category, type, value }: TagProps) {
    return (
      <div
        className={classNames(
          "group inline-flex h-7 items-center rounded px-2 py-0.5 text-sm capitalize text-white",
          type === "include" ? "bg-green-500" : "",
          type === "exclude" ? "bg-red-500" : "",
          type === "range" ? "bg-yellow-500" : "",
          type === "search" ? "bg-blue-500" : ""
        )}
      >
        <span className="mr-1 font-bold">{category.replaceAll("_", " ")}:</span>
        <span>{type !== "range" ? value : value.replaceAll(",", " - ")}</span>
        <div className="ml-1.5 mt-0.5 hidden group-hover:inline-block">
          <FontAwesomeIcon
            icon={faXmark}
            className="cursor-pointer rounded-full bg-white px-1 py-0.5 text-xs text-gray-700"
            onClick={() => filter.removeFilter(category, type, value)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="my-3.5 flex flex-wrap items-center gap-1.5">
      <span className="mr-2 text-lg font-bold">
        <FontAwesomeIcon icon={faFilter} className="mr-1" />{" "}
        {filter.filteredList.length} Animes
      </span>
      {filter.filters.map((filter) => (
        <Tag
          key={`${filter.category}_${filter.value}`}
          category={filter.category}
          type={filter.type}
          value={filter.value}
        />
      ))}
      <div
        className={classNames(
          "group inline-flex h-7 cursor-pointer items-center rounded bg-gray-400 px-2 py-0.5 text-sm capitalize text-white"
        )}
        onClick={() => filter.clearFilters()}
      >
        <span className="mr-1 font-bold">Clear</span>
        <FontAwesomeIcon icon={faDeleteLeft} className="ml-1 mt-0.5" />
      </div>
    </div>
  );
}
