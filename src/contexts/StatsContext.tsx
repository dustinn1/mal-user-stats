import { createContext, FunctionComponent } from "react";
import { AnimeStats } from "../interfaces/stats";
import mock from "../data/mock/animeStats.json";

export const StatsContext = createContext<AnimeStats>({} as AnimeStats);

export const StatsContextProvider: FunctionComponent = ({ children }) => {
  return (
    <StatsContext.Provider value={mock as AnimeStats}>
      {children}
    </StatsContext.Provider>
  );
};
