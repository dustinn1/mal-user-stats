import Dexie, { Table } from "dexie";
import { AnimeStats, MangaStats } from "./interfaces/stats";
import { userInfo } from "./interfaces/userInfo";

export interface UserDb {
  username: string;
  data: userInfo;
}

export interface AnimeDb {
  username: string;
  data: AnimeStats;
}

export interface MangaDb {
  username: string;
  data: MangaStats;
}

export class StatsDexie extends Dexie {
  userInfo!: Table<UserDb>;
  animeStats!: Table<AnimeDb>;
  mangaStats!: Table<MangaDb>;

  constructor() {
    super("statsDatabase");
    this.version(1).stores({
      userInfo: "username",
      animeStats: "username",
      mangaStats: "username",
    });
  }
}

export const db = new StatsDexie();
