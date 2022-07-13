import Link from "next/link";
import { useRouter } from "next/router";
import type { StatArray } from "../../../interfaces/stats";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import { classNames } from "../../../utils/classNames";
import prettyMs from "pretty-ms";
import CoversList from "./CoverList";

type Props = {
  type: "anime" | "manga";
  data: StatArray;
  sort: "count" | "length" | "mean_score";
  rank: number;
  isGrid: boolean;
};

export default function StatCard({ type, data, sort, rank, isGrid }: Props) {
  const router = useRouter();
  const { username, stat } = router.query;
  const width = useWindowWidth();

  return (
    <div
      className="w-full rounded-lg border border-blue-600 bg-gray-100 pt-3 pb-0.5 dark:bg-gray-800"
      id={`card-${data.name}`}
    >
      <div className="mx-4 flex items-center font-bold">
        <div className="mr-2 whitespace-nowrap rounded-lg bg-gray-700 px-3 py-1 text-center text-white">
          # {rank}
        </div>
        <Link
          href={`/stats/${username}/${type}/${stat}/${data.name
            .toLowerCase()
            .replaceAll(" ", "_")}`}
        >
          <a className="truncate text-3xl text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-500 dark:hover:text-blue-400">
            {data.name}
          </a>
        </Link>
      </div>
      <CoversList type={type} statArray={data} />
      <div
        className={classNames(
          "mx-4 mb-3 justify-around text-center",
          isGrid ? "" : "flex"
        )}
      >
        {((!isGrid && width >= 768) || sort === "count") && (
          <p
            className={
              !isGrid && sort === "count"
                ? "border-b-2 border-black dark:border-white"
                : ""
            }
          >
            <strong>{data.count}</strong>{" "}
            {type === "anime" ? "Animes" : "Mangas"}
          </p>
        )}
        {((!isGrid && width >= 768) || sort === "length") && (
          <p
            className={
              !isGrid && sort === "length"
                ? "border-b-2 border-black dark:border-white"
                : ""
            }
          >
            {type === "anime" ? (
              <>
                <strong>
                  {data.length > 0
                    ? prettyMs(data.length * 1000, {
                        verbose: true,
                        unitCount: width >= 640 ? 3 : 2,
                      })
                    : "No time"}
                </strong>{" "}
                Watched
              </>
            ) : (
              <>
                <strong>{data.length > 0 ? data.length : "No chapters"}</strong>{" "}
                Read
              </>
            )}
          </p>
        )}
        {((!isGrid && width >= 768) || sort === "mean_score") && (
          <p
            className={
              !isGrid && sort === "mean_score"
                ? "border-b-2 border-black dark:border-white"
                : ""
            }
          >
            <strong>{data.mean_score}</strong> Average Score
          </p>
        )}
      </div>
    </div>
  );
}
