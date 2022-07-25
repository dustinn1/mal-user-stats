import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { userInfo } from "../interfaces/userInfo";
import { Stats } from "../interfaces/stats";
import { db } from "../db";
import { useLiveQuery } from "dexie-react-hooks";
import LoadingIndicator from "../components/LoadingIndicator";
import { NextSeo } from "next-seo";
import Link from "next/link";

type ContextProps = {
  children: ReactNode;
  username: string;
};

type StatsContext = { user: userInfo; animes: Stats; mangas: Stats };

export const StatsContext = createContext<StatsContext>({
  user: {} as userInfo,
  animes: {} as Stats,
  mangas: {} as Stats,
});

export const StatsContextProvider = ({ children, username }: ContextProps) => {
  const [loaded, setLoaded] = useState(false);

  const userInfo = useLiveQuery(async () => {
    return await db.userInfo
      .where("username")
      .equals(username.toLowerCase())
      .toArray();
  }, [username]);

  const animeStats = useLiveQuery(async () => {
    return await db.animeStats
      .where("username")
      .equals(username.toLowerCase())
      .toArray();
  }, [username]);

  const mangaStats = useLiveQuery(async () => {
    return await db.mangaStats
      .where("username")
      .equals(username.toLowerCase())
      .toArray();
  }, [username]);

  useEffect(
    () => setLoaded(!!(userInfo && animeStats && mangaStats)),
    [userInfo, animeStats, mangaStats]
  );

  const values = useMemo(() => {
    if (!userInfo || !animeStats || !mangaStats) return undefined;
    if (userInfo.length < 1 || animeStats.length < 1 || mangaStats.length < 1)
      return undefined;
    return {
      user: userInfo[0].data,
      animes: animeStats[0].data,
      mangas: mangaStats[0].data,
    };
  }, [animeStats, mangaStats, userInfo]);

  if (!loaded) {
    return (
      <div className="flex h-48 items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  return values ? (
    <StatsContext.Provider value={values}>{children}</StatsContext.Provider>
  ) : (
    <>
      <NextSeo title="User Not Found" />
      <div className="mt-8 text-center">
        <h1 className="mb-3 text-2xl font-bold">User Not Found</h1>
        <p className="text-xl">
          The user either doesn&#39;t exist or you need to{" "}
          <Link href="/generate">
            <a className="text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-500 dark:hover:text-blue-400">
              generate their stats
            </a>
          </Link>{" "}
          first
        </p>
      </div>
    </>
  );
};
