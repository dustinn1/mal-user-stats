import {
  createContext,
  useState,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useRouter } from "next/router";
import type { StatArray } from "../interfaces/stats";
import Fuse from "fuse.js";
import { usePagination } from "../hooks/usePagination";
import type { Pagination } from "../interfaces/pagination";

type Props = {
  type: "anime" | "manga";
  data: StatArray[];
  children?: ReactNode;
};

type StatCardsContext = {
  type: "anime" | "manga";
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  statsData: StatArray[];
  pagination: Pagination;
};

function compare(prop: string) {
  if (prop === "count" || prop === "length" || prop === "mean_score") {
    return function (a: StatArray, b: StatArray) {
      return b[prop] - a[prop];
    };
  }
}

export const StatCardsContext = createContext<StatCardsContext>(
  {} as StatCardsContext
);

export const StatCardsContextProvider = ({ data, type, children }: Props) => {
  const router = useRouter();
  const { page, search } = router.query;

  const [sort, setSort] = useState("count");
  const [searchQuery, setSearchQuery] = useState((search as string) ?? "");

  const fuse: Fuse<StatArray> = useMemo(() => {
    return new Fuse(data, {
      keys: ["name"],
    });
  }, [data]);

  const statsData: StatArray[] = useMemo(() => {
    return searchQuery
      ? fuse.search(searchQuery).map((e) => e.item)
      : [...data].sort(compare(sort));
  }, [data, fuse, searchQuery, sort]);

  const pagination = usePagination(statsData.length, parseInt(page as string));

  useEffect(() => {
    let url = `
      ${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    if (searchQuery) {
      url += `?search=${searchQuery}`;
    }
    if (pagination.page > 1) {
      url += `${searchQuery ? "&" : "?"}page=${pagination.page}`;
    }
    window.history.replaceState(null, "", url);
  }, [pagination.page, searchQuery]);

  return (
    <StatCardsContext.Provider
      value={{
        type,
        searchQuery,
        setSearchQuery,
        sort,
        setSort,
        statsData,
        pagination,
      }}
    >
      {children}
    </StatCardsContext.Provider>
  );
};
