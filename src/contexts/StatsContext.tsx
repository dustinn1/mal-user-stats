import { createContext, ReactNode, useEffect, useState } from "react";
import { AnimeStats } from "../interfaces/stats";
import { db } from "../db";
import { useLiveQuery } from "dexie-react-hooks";
import LoadingIndicator from "../components/LoadingIndicator";

type ContextProps = {
  children: ReactNode;
  username: string;
};

export const StatsContext = createContext<AnimeStats>({} as AnimeStats);

export const StatsContextProvider = ({ children, username }: ContextProps) => {
  const [loaded, setLoaded] = useState(false);

  const stats = useLiveQuery(async () => {
    return await db.stats
      .where("[username+type]")
      .equals([username, "anime"])
      .toArray();
  });

  useEffect(() => setLoaded(stats !== undefined), [stats]);

  if (!loaded) {
    return (
      <div className="flex h-48 items-center justify-center">
        <LoadingIndicator />;
      </div>
    );
  }

  return (
    <>
      {loaded && stats !== undefined && stats.length > 0 ? (
        <StatsContext.Provider value={stats[0].data}>
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
