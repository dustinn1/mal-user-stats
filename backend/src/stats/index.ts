import { fetchFullList } from "./fetch";
import { generateAnimeStats } from "./anime";
import { getUserInfo } from "./user";
import type { AnimeStats } from "../interfaces/animeStats";
import { writeFileSync } from "fs";
import { currentlyGenerating, generatedStats } from "../db";

export async function getStats(username: string): Promise<AnimeStats | null> {
  try {
    if (!currentlyGenerating.has(username)) {
      currentlyGenerating.add(username);
      writeFileSync(
        "src/temp_data/" + username + "_user.json",
        JSON.stringify(await getUserInfo(username)),
        "utf8"
      );
      writeFileSync(
        "src/temp_data/" + username + "_anime.json",
        JSON.stringify(
          generateAnimeStats(await fetchFullList(username, "anime"))
        ),
        "utf8"
      );
      generatedStats.set(username, "", 300000); // 5 minutes
      currentlyGenerating.delete(username);
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}
