import { ChangeEvent, useContext } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import type { Pagination } from "../../interfaces/pagination";
import { StatCardsContext } from "../../contexts/cards/StatCardsContext";
import { TitleCardsContext } from "../../contexts/cards/TitleCardsContext";
import { UserCardsContext } from "../../contexts/cards/UserCardsContext";

function PaginationBase({ pagination }: { pagination: Pagination }) {
  const { pageCount, page, setPage, hasPrevious, hasNext } = pagination;
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setPage(parseInt(event.target.value));
  };

  const handleButton = (direction: "prev" | "next") => {
    const newPage = direction === "prev" ? page - 1 : page + 1;
    setPage(newPage);
  };

  return (
    <nav className="sticky bottom-0 my-2 flex items-center justify-center gap-2 bg-white py-2 dark:bg-gray-900">
      <div className="mr-1 text-lg">
        Page
        <select
          value={page}
          onChange={handleSelect}
          className="mx-2 rounded border border-gray-700 px-1.5 py-0.5 font-bold disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-900 dark:text-white"
          disabled={pageCount === 1}
        >
          {[...Array(pageCount)].map((_, i) => {
            const count = 1 + i;
            return (
              <option value={count} key={count}>
                {count}
              </option>
            );
          })}
        </select>
        / {pageCount}
      </div>
      <Button
        size="sm"
        startIcon={faChevronLeft}
        text="Previous"
        disabled={!hasPrevious}
        onClick={() => handleButton("prev")}
      />
      <Button
        size="sm"
        endIcon={faChevronRight}
        text="Next"
        disabled={!hasNext}
        onClick={() => handleButton("next")}
      />
    </nav>
  );
}

export function StatsPagination() {
  const { pagination } = useContext(StatCardsContext);
  return <PaginationBase pagination={pagination} />;
}

export function TitlesPagination() {
  const { pagination } = useContext(TitleCardsContext);
  return <PaginationBase pagination={pagination} />;
}

export function UsersPagination() {
  const { pagination } = useContext(UserCardsContext);
  return <PaginationBase pagination={pagination} />;
}
