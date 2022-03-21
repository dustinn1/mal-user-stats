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

type Props = {
  name: string;
  sort: "count" | "time_watched" | "mean_score";
  rank: number;
  amount: number;
  average: number;
  time: string;
  animes: number[];
};

function getCoversAnime(animes: number[], allAnimes: Anime[]): Anime[] {
  const coverAnimes: Anime[] = [];
  for (let id of animes) {
    coverAnimes.push(allAnimes.find((anime: any) => anime.id === id) as Anime);
  }
  return coverAnimes;
}

const allAnimes: Anime[] = stats.animes;

export default function Card({
  name,
  sort,
  rank,
  amount,
  average,
  time,
  animes,
}: Props) {
  const router = useRouter();
  const { username } = router.query;

  const CoversList = useMemo(() => {
    const covers = getCoversAnime(animes, allAnimes);
    return (
      <AutoSizer>
        {({ width }) => (
          <List
            height={130}
            width={width}
            layout="horizontal"
            itemCount={covers.length}
            itemSize={90}
            itemData={covers}
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
          href={{
            pathname: `${router.pathname}/comedy`,
            query: { username: username },
          }}
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
