import axios from "axios";
import { setTimeout } from "timers/promises";
import type { AnimeListObject } from "../interfaces/fetchList";

const api_fields: { anime: string; manga: string } = {
  anime:
    "list_status{finish_date,num_times_rewatched},alternative_titles,start_date,end_date,mean,genres,media_type,status,num_episodes,start_season,broadcast,source,average_episode_duration,studios",
  manga:
    "alternative_titles,start_date,end_date,mean,genres,media_type,my_list_status{num_times_reread},num_volumes,num_chapters",
};

export async function fetchFullList(
  username: string,
  type: "anime" | "manga"
): Promise<AnimeListObject[]> {
  const list: AnimeListObject[] = [];
  let isEnd = false;
  let offset = 0;
  do {
    const response = await axios.get(
      `https://api.myanimelist.net/v2/users/${username}/${type}list`,
      {
        params: {
          offset: offset * 1000,
          fields: api_fields[type],
          limit: 1000,
          nsfw: 1,
        },
        headers: {
          "X-MAL-CLIENT-ID": process.env["MAL_CLIENT_ID"] as string,
        },
      }
    );
    const data = response.data;
    for (const title of data.data) {
      if (title.node.main_picture) {
        const image_url_split = title.node.main_picture.medium.split("/");
        title.node.image_url_id = `${image_url_split[5]}/${
          image_url_split[6].split(".")[0]
        }`;
      } else {
        title.node.image_url_id = "";
      }
      title.node.title_en =
        title.node.alternative_titles.en.length !== 0
          ? title.node.alternative_titles.en
          : title.node.title;
      title.node.title_ja =
        title.node.alternative_titles.ja.length !== 0
          ? title.node.alternative_titles.ja
          : title.node.title;
      if (type === "anime") {
        title.list_status.time_watched =
          (title.list_status.num_times_rewatched +
            (title.list_status.is_rewatching ? 1 : 0)) *
            (title.node.num_episodes * title.node.average_episode_duration) +
          title.list_status.num_episodes_watched *
            title.node.average_episode_duration;
      } else {
        title.list_status.chapters_read =
          (title.node.my_list_status.num_times_reread +
            (title.node.my_list_status.is_rereading ? 1 : 0)) *
            title.node.num_chapters +
          title.node.my_list_status.num_chapters_read;
      }
      list.push(title);
    }
    if (data.paging.next === undefined) {
      isEnd = true;
    } else {
      offset++;
      await setTimeout(1000); // 1s delay
    }
  } while (!isEnd);
  return list;
}
