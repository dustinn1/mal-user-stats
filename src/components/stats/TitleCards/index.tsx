import { useContext } from "react";
import Image from "next/future/image";
import Link from "next/link";
import { AnimeManga } from "../../../interfaces/stats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import { getLanguageTitle } from "../../../utils/getLanguageTitle";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { StatsContext } from "../../../contexts/StatsContext";

type Props = {
  type: "anime" | "manga";
  title: AnimeManga;
};

export default function Card({ type, title }: Props) {
  const { titleLanguage } = useContext(SettingsContext);
  const { user } = useContext(StatsContext);

  const username = user.username;

  return (
    <div className="rounded-lg border border-blue-600 bg-gray-100 dark:bg-gray-800">
      <div className="flex">
        <div className="relative mr-1 h-56 w-[165px] self-center">
          <Image
            src={`https://cdn.myanimelist.net/images/${type}/${title.image_url_id}l.webp`}
            alt="image"
            height={225}
            width={165}
            className="h-full rounded-l-md object-cover"
          />
          <div className="absolute top-0 left-0 m-1 rounded bg-gray-800/80 py-1 px-2 text-center text-white">
            <Link
              href={`/stats/${username}/${type}/formats/${title.format.id}`}
            >
              <a className="underline hover:text-gray-200">
                {title.format.name}
              </a>
            </Link>{" "}
            /{" "}
            <Link
              href={`/stats/${username}/${type}/episodes_counts/${title.count}`}
            >
              <a className="underline hover:text-gray-200">
                {title.count} {type === "anime" ? "ep" : "ch"}
                {title.count > 1 || title.count === 0 ? "s" : ""}
              </a>
            </Link>
          </div>
          <Link href={`https://myanimelist.net/${type}/${title.id}`}>
            <a
              className="absolute bottom-0 right-0 m-1 rounded bg-gray-800/75 py-1 px-2 text-center text-sm text-white"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          </Link>
        </div>
        <div className="max-h-56 w-2/3 overflow-y-scroll py-1.5 px-2">
          <div className="border-b border-gray-600 pb-0.5">
            <Tippy
              content={<span>{getLanguageTitle(title, titleLanguage)}</span>}
            >
              <h1 className="text-lg font-bold leading-none line-clamp-2">
                {getLanguageTitle(title, titleLanguage)}
              </h1>
            </Tippy>
            <span className="mt-0 text-sm">
              <Link
                href={`/stats/${username}/${type}/statuses/${title.status.id}`}
              >
                <a className="text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
                  {title.status.name}
                </a>
              </Link>{" "}
              / Score:{" "}
              <Link href={`/stats/${username}/${type}/scores/${title.score}`}>
                <a className="text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
                  {title.score}
                </a>
              </Link>{" "}
              {title.start_year &&
                `/ Started ${type === "anime" ? "Watch" : "Read"}ing in `}
              {title.start_year && (
                <Link
                  href={`/stats/${username}/${type}/start_years/${title.start_year}`}
                >
                  <a className="text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
                    {title.start_year}
                  </a>
                </Link>
              )}
            </span>
          </div>
          <div className="overflow-y-scroll">
            <div className="py-1">
              <div>
                <span>{type == "anime" ? "Studios:" : "Authors:"} </span>
                {title.creators.map((creator, i) => [
                  i > 0 && ", ",
                  <Link
                    href={`/stats/${username}/${type}/${
                      type == "anime" ? "studios" : "authors"
                    }/${creator.toLowerCase().replaceAll(" ", "_")}`}
                    key={creator}
                  >
                    <a className="text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
                      {creator}
                    </a>
                  </Link>,
                ])}
              </div>
              <div>
                <span>Genres: </span>
                {title.genres.map((genre, i) => [
                  i > 0 && ", ",
                  <Link
                    href={`/stats/${username}/${type}/genres/${genre
                      .toLowerCase()
                      .replaceAll(" ", "_")}`}
                    key={genre}
                  >
                    <a className="text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
                      {genre}
                    </a>
                  </Link>,
                ])}
              </div>
              <div>
                <span>Released in: </span>
                {title.release_year && (
                  <Link
                    href={`/stats/${username}/${type}/release_years/${Math.floor(
                      title.release_year
                    )}`}
                  >
                    <a className="text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
                      {title.release_year}
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
