import { useContext } from "react";
import {
  faDeleteLeft,
  faFilter,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FilterCategories, FilterTypes } from "../../../interfaces/filters";
import { classNames } from "../../../utils/classNames";
import { TitleCardsContext } from "../../../contexts/cards/TitleCardsContext";

type TagProps = {
  category: FilterCategories;
  type: FilterTypes;
  value: string;
};

export default function FilterTags() {
  const {
    listFilter: {
      removeFilter,
      filteredList,
      filters,
      clearFilters,
      setSearchQuery,
    },
  } = useContext(TitleCardsContext);

  function Tag({ category, type, value }: TagProps) {
    return (
      <div
        className={classNames(
          "group inline-flex h-7 items-center rounded px-2 py-0.5 text-sm text-white",
          type === "include" ? "bg-emerald-700" : "",
          type === "exclude" ? "bg-red-600" : "",
          type === "range" ? "bg-purple-600" : "",
          type === "search" ? "bg-blue-600" : ""
        )}
      >
        <span className="mr-1 font-bold capitalize">
          {category.replaceAll("_", " ")}:
        </span>
        <span>{type !== "range" ? value : value.replaceAll(",", " - ")}</span>
        <div className="ml-1.5 mt-0.5 hidden group-hover:inline-block">
          <FontAwesomeIcon
            icon={faXmark}
            className="cursor-pointer rounded-full bg-white px-1 py-0.5 text-xs text-gray-700"
            onClick={() => removeFilter(category, type, value)}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {filters.length > 0 && (
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          <span className="mr-2 text-lg font-bold">
            <FontAwesomeIcon icon={faFilter} className="mr-1" />{" "}
            {filteredList.length} Match
            {filteredList.length !== 1 ? "es" : ""}
          </span>
          {filters.map((filter) => (
            <Tag
              key={`${filter.category}_${filter.value}`}
              category={filter.category}
              type={filter.type}
              value={filter.value}
            />
          ))}
          <div
            className={classNames(
              "group inline-flex h-7 cursor-pointer items-center rounded bg-gray-500 px-2 py-0.5 text-sm capitalize text-white"
            )}
            onClick={() => {
              clearFilters();
              setSearchQuery("");
            }}
          >
            <span className="mr-1 font-bold">Clear</span>
            <FontAwesomeIcon icon={faDeleteLeft} className="ml-1 mt-0.5" />
          </div>
        </div>
      )}
    </>
  );
}
