import { useContext } from "react";
import { TitleCardsContext } from "../../../../contexts/cards/TitleCardsContext";
import TitleCard from "..";
import type { AnimeManga } from "../../../../interfaces/stats";

function compare(prop: string) {
  if (prop === "title") {
    return function (a: AnimeManga, b: AnimeManga) {
      return a[prop].localeCompare(b[prop]);
    };
  } else if (
    prop === "score" ||
    prop === "count" ||
    prop === "release_year" ||
    prop === "start_year"
  ) {
    return function (a: AnimeManga, b: AnimeManga) {
      return b[prop]! - a[prop]!;
    };
  }
}

export default function TitleCardsContainer() {
  const {
    type,
    listFilter: { filteredList, sort, searchQuery },
    pagination: { range },
  } = useContext(TitleCardsContext);
  const list = searchQuery
    ? filteredList
    : [...filteredList].sort(compare(sort));
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {list.slice(range[0], range[1]).map((title) => (
        <TitleCard key={title.id} type={type} title={title} />
      ))}
    </div>
  );
}
