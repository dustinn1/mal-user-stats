import { fetchFullList } from "./fetch";
import { generateAnimeStats } from "./anime";
import type { AnimeStats } from "../interfaces/animeStats";
import { writeFileSync } from "fs";

export async function getStats(username: string): Promise<AnimeStats | null> {
  try {
    writeFileSync(
      "src/temp/" + username + "_anime.json",
      JSON.stringify(
        generateAnimeStats(await fetchFullList(username, "anime"))
      ),
      "utf8"
    );
    //return generateAnimeStats(await fetchFullList(username, "anime"));
  } catch (error) {
    console.error(error);
  }
  return null;
}
