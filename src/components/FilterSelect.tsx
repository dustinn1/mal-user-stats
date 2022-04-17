import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StatArray } from "../../backend/src/interfaces/animeStats";
import { Filters } from "../interfaces/filters";

type Props = {
  data: StatArray[];
  name: "genres" | "studios" | "statuses" | "formats";
  addFilter(
    category: "genres" | "studios" | "statuses" | "formats",
    action: "includes" | "excludes",
    value: string
  ): void;
  removeFilter(
    category: "genres" | "studios" | "statuses" | "formats",
    action: "includes" | "excludes",
    value: string
  ): void;
  filters: Filters;
};

export default function FilterSelect({
  data,
  name,
  addFilter,
  removeFilter,
  filters,
}: Props) {
  return (
    <div className="h-80 divide-y divide-gray-300 overflow-y-scroll rounded-md bg-white px-4 py-2">
      {data
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((prop) => {
          const isIncluded = filters[name]["includes"].includes(prop.name);
          const isExcluded = filters[name]["excludes"].includes(prop.name);
          return (
            <div
              key={prop.id}
              className={`flex justify-between py-1 ${
                isIncluded ? "text-green-600" : ""
              } ${isExcluded ? "text-red-600" : ""}`}
            >
              <span>{prop.name}</span>
              <div className="grid grid-cols-2 gap-2.5">
                {!isExcluded ? (
                  <div
                    className={`cursor-pointer rounded-md border border-green-500 px-1.5 transition-all hover:bg-green-500 hover:text-white ${
                      isIncluded ? "bg-green-500 text-white" : "text-green-500"
                    }`}
                    onClick={() =>
                      !isIncluded
                        ? addFilter(name, "includes", prop.name)
                        : removeFilter(name, "includes", prop.name)
                    }
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                ) : (
                  <div className="cursor-not-allowed rounded-md border border-gray-300 px-1.5 text-gray-300">
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                )}
                {!isIncluded ? (
                  <div
                    className={`cursor-pointer rounded-md border border-red-500 px-1.5 text-center  transition-all hover:bg-red-500 hover:text-white ${
                      isExcluded ? "bg-red-500 text-white" : " text-red-500"
                    }`}
                    onClick={() =>
                      !isExcluded
                        ? addFilter(name, "excludes", prop.name)
                        : removeFilter(name, "excludes", prop.name)
                    }
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </div>
                ) : (
                  <div className="cursor-not-allowed rounded-md border border-gray-300 px-1.5 text-gray-300">
                    <FontAwesomeIcon icon={faMinus} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
