import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";

type Props = {
  pages: number;
};

export default function Pagination({ pages }: Props) {
  const router = useRouter();
  const { username, type, stat, page } = router.query;

  const [pageCount] = useState(pages);
  const [currentPage, setCurrentPage] = useState(
    parseInt((page as string) ?? 1)
  );

  const hasPrevious = currentPage - 1 > 0;
  const hasNext = currentPage < pageCount;

  const changePage = (pageNumber: number) => {
    router.push(
      {
        pathname: "/stats/[username]/[type]/[stat]",
        query: { username, type, stat, page: pageNumber },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(parseInt(event.target.value));
    changePage(parseInt(event.target.value));
  };

  const handleButton = (direction: "prev" | "next") => {
    const newPage = direction === "prev" ? currentPage - 1 : currentPage + 1;
    setCurrentPage(newPage);
    changePage(newPage);
  };

  return (
    <nav className="flex items-center">
      <div className="mr-3 text-lg">
        Page
        <select
          value={currentPage}
          onChange={handleSelect}
          className="mx-2 rounded border border-gray-700 px-1.5 py-0.5 font-bold"
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
        / {Math.ceil(pageCount)}
      </div>
      <Button
        size="sm"
        icon={faChevronLeft}
        text="Previous"
        disabled={!hasPrevious}
        onClick={() => handleButton("prev")}
      />
      <Button
        size="sm"
        icon={faChevronRight}
        text="Next"
        disabled={!hasNext}
        onClick={() => handleButton("next")}
      />
    </nav>
  );
}
