import Dexie, { Table } from "dexie";
import { AnimeStats } from "./interfaces/stats";
import { userInfo } from "./interfaces/userInfo";

export interface UserDb {
  username: string;
  data: userInfo;
}

export interface AnimeDb {
  username: string;
  data: AnimeStats;
}

export class StatsDexie extends Dexie {
  userInfo!: Table<UserDb>;
  animeStats!: Table<AnimeDb>;

  constructor() {
    super("statsDatabase");
    this.version(1).stores({
      userInfo: "username",
      animeStats: "username",
    });
  }
}

export const db = new StatsDexie();
