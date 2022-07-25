import { useEffect, useState } from "react";
import type { Pagination } from "../interfaces/pagination";

const itemsPerPage = 12;

export function usePagination(
  dataLength: number,
  currentPage: number
): Pagination {
  const [pageCount, setPageCount] = useState(
    Math.ceil(dataLength / itemsPerPage)
  );
  const [page, setPage] = useState(
    !isNaN(currentPage) && currentPage <= pageCount ? currentPage : 1
  );
  const [hasPrevious, setHasPrevious] = useState(page - 1 > 0);
  const [hasNext, setHasNext] = useState(page < pageCount);
  const [range, setRange] = useState([
    (page - 1) * itemsPerPage,
    (page - 1) * itemsPerPage + itemsPerPage,
  ]);

  useEffect(() => {
    setHasPrevious(page - 1 > 0);
    setHasNext(page < pageCount);
    const offset = (page - 1) * itemsPerPage;
    setRange([offset, offset + itemsPerPage]);
  }, [page, pageCount]);

  useEffect(() => {
    const pageCount =
      dataLength !== 0 ? Math.ceil(dataLength / itemsPerPage) : 1;
    setPageCount(pageCount);
    if (page > pageCount) {
      setPage(1);
    }
  }, [dataLength, page]);

  return {
    pageCount,
    page,
    range,
    setPage,
    hasPrevious,
    hasNext,
  };
}
