import { useEffect, useState } from "react";
import { StatArray } from "../../../../interfaces/stats";
import { DebounceInput } from "react-debounce-input";
import Pagination from "../../Pagination";
import Fuse from "fuse.js";
import StatCardsContainer from ".";

type Props = {
  type: "anime" | "manga";
  data: StatArray[];
  offset: number;
  sort: "count" | "length" | "mean_score";
  isGrid: boolean;
};

function compare(prop: string) {
  if (prop === "count" || prop === "length" || prop === "mean_score") {
    return function (a: StatArray, b: StatArray) {
      return b[prop] - a[prop];
    };
  }
}

export default function StatCardsContainerFilter({
  type,
  data,
  offset,
  sort,
  isGrid,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [fuse, setFuse] = useState(
    new Fuse(data, {
      keys: ["name"],
      fieldNormWeight: 1,
    })
  );

  useEffect(() => {
    setFuse(
      new Fuse(data, {
        keys: ["name"],
        fieldNormWeight: 1,
      })
    );
  }, [data]);

  const stats =
    searchQuery !== ""
      ? fuse.search(searchQuery).map((e) => e.item)
      : data.sort(compare("count"));

  return (
    <>
      <div className="mt-1 mb-4 flex flex-wrap justify-center gap-2 lg:justify-between">
        <div className="flex grow xl:w-1/2 xl:grow-0">
          <DebounceInput
            type="search"
            id="search"
            name="search"
            placeholder="Search"
            autoComplete="off"
            className="h-8 w-full appearance-none rounded-md border border-gray-400 bg-white px-3 outline-0 duration-100 ease-linear focus:border-blue-900 dark:border-gray-500 dark:bg-black dark:focus:border-blue-400 lg:h-auto"
            debounceTimeout={300}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
        <Pagination pages={Math.ceil(stats.length / 12)} />
      </div>
      <StatCardsContainer
        type={type}
        data={stats}
        offset={offset}
        sort={sort}
        isGrid={isGrid}
      />
    </>
  );
}
