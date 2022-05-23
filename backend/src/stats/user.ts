import axios from "axios";

async function getMalId(username: string): Promise<number> {
  const url = `https://myanimelist.net/profile/${username}`;
  const selector = ".user-image > img";
  const attr = "data-src";

  const response = await axios.get(
    `https://web.scraper.workers.dev/?url=${url}&selector=${selector}&scrape=attr&attr=${attr}`
  );
  return parseInt(response.data.result.split("/")[5].split(".")[0]);
}

export async function getUserInfo(username: string) {
  return {
    version: 1,
    username: username,
    mal_id: await getMalId(username),
    generated_on: new Date(),
  };
}
