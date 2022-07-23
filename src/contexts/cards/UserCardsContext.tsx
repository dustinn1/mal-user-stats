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
import Fuse from "fuse.js";
import { usePagination } from "../../hooks/usePagination";
import type { Pagination } from "../../interfaces/pagination";
import type { UserDb } from "../../db";

type Props = {
  data: UserDb[];
  children?: ReactNode;
};

type UserCardsContext = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  showFavorites: boolean;
  setShowFavorites: Dispatch<SetStateAction<boolean>>;
  usersData: UserDb[];
  pagination: Pagination;
};

function compare(prop: string) {
  if (prop === "username") {
    return function (a: UserDb, b: UserDb) {
      return a.data.username.localeCompare(b.data.username);
    };
  } else if (prop === "date") {
    return function (a: UserDb, b: UserDb) {
      return (
        new Date(b.data.generated_on).getTime() -
        new Date(a.data.generated_on).getTime()
      );
    };
  }
}

export const UserCardsContext = createContext<UserCardsContext>(
  {} as UserCardsContext
);

export const UserCardsContextProvider = ({ data, children }: Props) => {
  const router = useRouter();
  const { page, search } = router.query;

  const [sort, setSort] = useState("username");
  const [searchQuery, setSearchQuery] = useState((search as string) ?? "");
  const [showFavorites, setShowFavorites] = useState(false);

  const fuse: Fuse<UserDb> = useMemo(() => {
    return new Fuse(data, {
      keys: ["username"],
    });
  }, [data]);

  const usersData: UserDb[] = useMemo(() => {
    let users = searchQuery
      ? fuse.search(searchQuery).map((e) => e.item)
      : [...data].sort(compare(sort));
    if (localStorage.getItem("favorites") !== null && showFavorites) {
      const favorites = JSON.parse(localStorage.getItem("favorites")!);
      users = users.filter((user) => favorites.includes(user.data.mal_id));
    }
    return users;
  }, [data, fuse, searchQuery, showFavorites, sort]);

  const pagination = usePagination(usersData.length, parseInt(page as string));

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
    <UserCardsContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        sort,
        setSort,
        showFavorites,
        setShowFavorites,
        usersData,
        pagination,
      }}
    >
      {children}
    </UserCardsContext.Provider>
  );
};
