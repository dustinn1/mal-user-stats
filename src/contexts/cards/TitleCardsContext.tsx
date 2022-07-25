import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useRouter } from "next/router";
import type { StatArray } from "../../interfaces/stats";
import { usePagination } from "../../hooks/usePagination";
import type { Pagination } from "../../interfaces/pagination";
import { getTitlesInfo } from "../../utils/getTitlesInfo";
import { useFilter } from "../../hooks/useFilter";
import { StatsContext } from "../StatsContext";
import type { FilterHookExports } from "../../interfaces/filters";

type Props = {
  type: "anime" | "manga";
  data?: StatArray;
  children?: ReactNode;
};

type TitleCardsContext = {
  type: "anime" | "manga";
  listFilter: FilterHookExports;
  pagination: Pagination;
};

export const TitleCardsContext = createContext<TitleCardsContext>(
  {} as TitleCardsContext
);

export const TitleCardsContextProvider = ({ data, type, children }: Props) => {
  const router = useRouter();
  const { page, search } = router.query;
  const stats = useContext(StatsContext);
  const initialList = useMemo(() => {
    return getTitlesInfo(stats[`${type}s`].titles, data?.titles);
  }, [data?.titles, stats, type]);
  const listFilter = useFilter(initialList, search as string);

  const pagination = usePagination(
    listFilter.filteredList.length,
    parseInt(page as string)
  );

  useEffect(() => {
    let url = `
      ${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    if (listFilter.searchQuery) {
      url += `?search=${listFilter.searchQuery}`;
    }
    if (pagination.page > 1) {
      url += `${listFilter.searchQuery ? "&" : "?"}page=${pagination.page}`;
    }
    window.history.replaceState(null, "", url);
  }, [pagination.page, listFilter.searchQuery]);

  return (
    <TitleCardsContext.Provider
      value={{
        type,
        listFilter,
        pagination,
      }}
    >
      {children}
    </TitleCardsContext.Provider>
  );
};
