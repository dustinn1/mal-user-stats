import { useContext } from "react";
import { TitleCardsContext } from "../../../../contexts/cards/TitleCardsContext";
import type { StatArray } from "../../../../interfaces/stats";
import type { FilterCategories } from "../../../../interfaces/filters";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classNames } from "../../../../utils/classNames";

type Props = {
  name: FilterCategories;
  stat: StatArray;
};

export default function SelectRow({ name, stat }: Props) {
  const {
    listFilter: { filters, removeFilter, addFilter },
  } = useContext(TitleCardsContext);

  const matchedFilter = filters.find(
    (filter) => filter.category === name && filter.value === stat.name
  );
  return (
    <div
      key={stat.id}
      className={classNames(
        "flex justify-between py-1",
        matchedFilter && matchedFilter.type === "include"
          ? "font-bold text-emerald-700 dark:text-emerald-400"
          : "",
        matchedFilter && matchedFilter.type === "exclude"
          ? "font-bold text-red-600 dark:text-red-500"
          : ""
      )}
    >
      <span className="col-span-9 truncate">{stat.name}</span>
      <div className="flex gap-1.5">
        <button
          className={classNames(
            "rounded-l border border-green-500 px-1.5 transition-all hover:bg-green-500 hover:text-white",
            matchedFilter && matchedFilter.type === "include"
              ? "bg-green-500 text-white"
              : "text-green-500"
          )}
          onClick={() => {
            if (matchedFilter && !(matchedFilter.type === "include")) {
              if (matchedFilter.type === "exclude") {
                removeFilter(name, "exclude", stat.name);
              }
              addFilter(name, "include", stat.name);
            }
            if (matchedFilter && matchedFilter.type === "include") {
              removeFilter(name, "include", stat.name);
            } else {
              addFilter(name, "include", stat.name);
            }
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button
          className={classNames(
            "rounded-r border border-red-500 px-1.5 text-center transition-all hover:bg-red-500 hover:text-white",
            matchedFilter && matchedFilter.type === "exclude"
              ? "bg-red-500 text-white"
              : " text-red-500"
          )}
          onClick={() => {
            if (matchedFilter && !(matchedFilter.type === "exclude")) {
              if (matchedFilter.type === "include") {
                removeFilter(name, "include", stat.name);
              }
              addFilter(name, "exclude", stat.name);
            }
            if (matchedFilter && matchedFilter.type === "exclude") {
              removeFilter(name, "exclude", stat.name);
            } else {
              addFilter(name, "exclude", stat.name);
            }
          }}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>
    </div>
  );
}
