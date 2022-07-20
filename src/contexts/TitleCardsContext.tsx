import { createContext, ReactNode, useContext } from "react";
import { useRouter } from "next/router";
import type { StatArray } from "../interfaces/stats";
import { usePagination } from "../hooks/usePagination";
import type { Pagination } from "../interfaces/pagination";
import { getTitlesInfo } from "../utils/getTitlesInfo";
import { useFilter } from "../hooks/useFilter";
import { StatsContext } from "./StatsContext";
import type { FilterHookExports } from "../interfaces/filters";

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
  const { page /* search */ } = router.query;
  const stats = useContext(StatsContext);
  const listFilter = useFilter(
    getTitlesInfo(stats[`${type}s`].titles, data?.titles)
  );

  const pagination = usePagination(
    listFilter.filteredList.length,
    parseInt(page as string)
  );

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
