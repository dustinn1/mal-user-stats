import { useMemo, useRef, useCallback, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { Anime, StatArray } from "../../../interfaces/stats";
import intervalToDuration from "date-fns/intervalToDuration";
import formatDuration from "date-fns/formatDuration";
import { getAnimesInfo } from "../../../utils/getAnimesInfo";
import { useVirtual } from "react-virtual";
import { StatsContext } from "../../../contexts/StatsContext";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import { classNames } from "../../../utils/classNames";

type Props = {
  statArray: StatArray;
  sort: "count" | "time_watched" | "mean_score";
  rank: number;
  isGrid: boolean;
};

export default function StatCard({ statArray, sort, rank, isGrid }: Props) {
  const router = useRouter();
  const { username, stat } = router.query;
  const allAnimes: { [k: string]: Anime } = useContext(StatsContext).animes;
  const width = useWindowWidth();

  const listParentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtual({
    horizontal: true,
    size: statArray.animes.length,
    parentRef: listParentRef,
    estimateSize: useCallback(() => 90, []),
    paddingStart: 16,
    paddingEnd: 16,
  });

  const CoversList = useMemo(() => {
    const animesInfo = getAnimesInfo(statArray.animes, allAnimes);
    return (
      <div
        style={{
          width: `${rowVirtualizer.totalSize}px`,
          height: "120px",
          position: "relative",
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${virtualRow.size}px`,
              transform: `translateX(${virtualRow.start}px)`,
            }}
          >
            <Image
              src={`https://cdn.myanimelist.net/images/anime/${
                animesInfo[virtualRow.index].image_url_id
              }l.webp`}
              alt="image"
              height={"120"}
              width={"85"}
              objectFit="cover"
              className="rounded-md"
              priority={virtualRow.index < 6}
            />
          </div>
        ))}
      </div>
    );
  }, [
    allAnimes,
    rowVirtualizer.totalSize,
    rowVirtualizer.virtualItems,
    statArray.animes,
  ]);

  return (
    <div
      className="w-full rounded-lg bg-gray-100 pt-3 pb-0.5"
      id={`card-${statArray.name}`}
    >
      <div className="mx-4 flex items-center font-bold">
        <div className="mr-2 rounded-lg bg-gray-700 px-3 py-1 text-center text-white">
          # {rank}
        </div>
        <Link
          href={`/stats/${username}/anime/${stat}/${statArray.name
            .toLowerCase()
            .replaceAll(" ", "_")}`}
        >
          <a className="text-3xl text-blue-500 hover:text-blue-600 hover:underline">
            {statArray.name}
          </a>
        </Link>
      </div>
      <div className="overflow-auto py-3" ref={listParentRef}>
        {CoversList}
      </div>
      <div
        className={classNames(
          "mx-4 mb-3 justify-around text-center",
          isGrid ? "" : "flex"
        )}
      >
        {((!isGrid && width >= 768) || sort === "count") && (
          <p
            className={
              !isGrid && sort === "count" ? "border-b-2 border-black" : ""
            }
          >
            <strong>{statArray.count}</strong> Animes
          </p>
        )}
        {((!isGrid && width >= 768) || sort === "time_watched") && (
          <p
            className={
              !isGrid && sort === "time_watched"
                ? "border-b-2 border-black"
                : ""
            }
          >
            <strong>
              {statArray.time_watched > 0
                ? formatDuration(
                    intervalToDuration({
                      start: 0,
                      end: statArray.time_watched * 1000,
                    })
                  )
                : "No time"}
            </strong>{" "}
            Watched
          </p>
        )}
        {((!isGrid && width >= 768) || sort === "mean_score") && (
          <p
            className={
              !isGrid && sort === "mean_score" ? "border-b-2 border-black" : ""
            }
          >
            <strong>{statArray.mean_score}</strong> Average Score
          </p>
        )}
      </div>
    </div>
  );
}
