import Dexie, { Table } from "dexie";
import { AnimeStats } from "./interfaces/stats";

export interface Stats {
  id?: number;
  username: string;
  type: string;
  data: AnimeStats;
}

export class StatsDexie extends Dexie {
  stats!: Table<Stats>;

  constructor() {
    super("statsDatabase");
    this.version(1).stores({
      stats: "++id, [username+type]",
    });
  }
}

export const db = new StatsDexie();
