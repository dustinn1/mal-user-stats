import { fetchFullList } from "./fetch";
import { generateAnimeStats } from "./anime";
import type { AnimeStats } from "../interfaces/animeStats";

export async function getStats(
  username: string,
  type: "anime" | "manga"
): Promise<AnimeStats | null> {
  try {
    const list = await fetchFullList(username, type);
    return generateAnimeStats(list);
  } catch (error) {
    console.error(error);
  }
  return null;
}
