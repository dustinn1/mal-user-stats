import { CSSProperties, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { Anime } from "../../interfaces/stats";
import stats from "../../data/mock/animeStats.json";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import intervalToDuration from "date-fns/intervalToDuration";
import formatDuration from "date-fns/formatDuration";
import { getAnimesInfo } from "../../utils/getAnimesInfo";

type Props = {
  name: string;
  sort: "count" | "time_watched" | "mean_score";
  rank: number;
  amount: number;
  average: number;
  time: string;
  animes: number[];
};

const allAnimes: Anime[] = stats.animes;

export default function StatCard({
  name,
  sort,
  rank,
  amount,
  average,
  time,
  animes,
}: Props) {
  const router = useRouter();
  const { username, stat } = router.query;

  const CoversList = useMemo(() => {
    const animesInfo = getAnimesInfo(animes, allAnimes);
    return (
      <AutoSizer>
        {({ width }) => (
          <List
            height={130}
            width={width}
            layout="horizontal"
            itemCount={animesInfo.length}
            itemSize={90}
            itemData={animesInfo}
            style={{ bottom: 10 }}
          >
            {({
              data,
              index,
              style,
            }: {
              data: Anime[];
              index: number;
              style: CSSProperties;
            }) => {
              return (
                <div
                  style={{
                    ...style,
                    left: (style.left as number) + 16,
                  }}
                >
                  <Image
                    src={`https://cdn.myanimelist.net/images/anime/${data[index].image_url_id}.webp`}
                    alt="image"
                    height={120}
                    width={80}
                    layout="fixed"
                    className="rounded-md"
                  />
                </div>
              );
            }}
          </List>
        )}
      </AutoSizer>
    );
  }, [animes]);

  return (
    <div
      className="mb-4 w-full rounded-lg bg-gray-100 pt-3"
      id={`card-${name}`}
    >
      <div className="mx-4 flex items-center font-bold">
        <div className="mr-2 rounded-lg bg-gray-700 px-3 py-1 text-center text-white">
          # {rank}
        </div>
        <Link
          href={`/stats/${username}/anime/${stat}/${name
            .toLowerCase()
            .replaceAll(" ", "_")}`}
        >
          <a className="text-3xl text-blue-500 hover:text-blue-600 hover:underline">
            {name}
          </a>
        </Link>
      </div>
      <div className="mt-5 h-[120px]">{CoversList}</div>
      <div className="mx-4 mb-3 flex justify-around text-center">
        <span className={sort === "count" ? "border-b-2 border-black" : ""}>
          <strong>{amount}</strong> Animes
        </span>
        <span
          className={sort === "time_watched" ? "border-b-2 border-black" : ""}
        >
          <strong>
            {parseInt(time) > 0
              ? formatDuration(
                  intervalToDuration({
                    start: 0,
                    end: parseInt(time) * 1000,
                  })
                )
              : "No time"}
          </strong>{" "}
          Watched
        </span>
        <span
          className={sort === "mean_score" ? "border-b-2 border-black" : ""}
        >
          <strong>{average}</strong> Average Score
        </span>
      </div>
    </div>
  );
}
