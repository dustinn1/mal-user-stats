import Dexie, { Table } from "dexie";
import { AnimeStats } from "./interfaces/stats";
import { userInfo } from "./interfaces/userInfo";

export interface UserDb {
  id?: number;
  username: string;
  data: userInfo;
}

export interface AnimeDb {
  id?: number;
  username: string;
  data: AnimeStats;
}

export class StatsDexie extends Dexie {
  userInfo!: Table<UserDb>;
  animeStats!: Table<AnimeDb>;

  constructor() {
    super("statsDatabase");
    this.version(1).stores({
      userInfo: "++id, username",
      animeStats: "++id, username",
    });
  }
}

export const db = new StatsDexie();
