import { createContext, ReactNode, useEffect, useState } from "react";
import { userInfo } from "../interfaces/userInfo";
import { AnimeStats } from "../interfaces/stats";
import { db } from "../db";
import { useLiveQuery } from "dexie-react-hooks";
import LoadingIndicator from "../components/LoadingIndicator";

type ContextProps = {
  children: ReactNode;
  username: string;
};

type StatsContext = { user: userInfo; animes: AnimeStats };

export const StatsContext = createContext<StatsContext>({
  user: {} as userInfo,
  animes: {} as AnimeStats,
});

export const StatsContextProvider = ({ children, username }: ContextProps) => {
  const [loaded, setLoaded] = useState(false);

  const userInfo = useLiveQuery(async () => {
    return await db.userInfo.where("username").equals(username).toArray();
  });
  const animeStats = useLiveQuery(async () => {
    return await db.animeStats.where("username").equals(username).toArray();
  });

  useEffect(
    () => setLoaded(userInfo !== undefined && animeStats !== undefined),
    [userInfo, animeStats]
  );

  if (!loaded) {
    return (
      <div className="flex h-48 items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <>
      {loaded &&
      animeStats !== undefined &&
      animeStats.length > 0 &&
      userInfo !== undefined &&
      userInfo.length > 0 ? (
        <StatsContext.Provider
          value={{ user: userInfo[0].data, animes: animeStats[0].data }}
        >
          {children}
        </StatsContext.Provider>
      ) : (
        <>
          <p>Does not exist</p>
        </>
      )}
    </>
  );
};
