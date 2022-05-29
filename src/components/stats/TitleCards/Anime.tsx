import Image from "next/image";
import Link from "next/link";
import { AnimeManga } from "../../../interfaces/stats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";

type Props = {
  anime: AnimeManga;
};

export default function AnimeCard({ anime }: Props) {
  return (
    <div className="rounded-lg border border-blue-600 bg-gray-100">
      <div className="flex">
        <div className="relative mr-1 h-56 w-1/3 self-center">
          <Image
            src={`https://cdn.myanimelist.net/images/anime/${anime.image_url_id}l.webp`}
            alt="image"
            layout="fill"
            objectFit="cover"
            className="rounded-l-md"
          />
          <div className="absolute top-0 left-0 m-1 rounded bg-gray-800/75 py-1 px-2 text-center text-white">
            <Link href={`/stats/triplezko/anime/formats/${anime.format.id}`}>
              <a className="underline hover:text-gray-200">
                {anime.format.name}
              </a>
            </Link>{" "}
            /{" "}
            <Link
              href={`/stats/triplezko/anime/episodes_counts/${anime.count}`}
            >
              <a className="underline hover:text-gray-200">
                {anime.count}{" "}
                {anime.count > 1 || anime.count === 0 ? "eps" : "ep"}
              </a>
            </Link>
          </div>
          <Link href={`https://myanimelist.net/anime/${anime.id}`}>
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
            <Tippy content={<span>{anime.title}</span>}>
              <h1
                className="text-lg font-bold leading-none line-clamp-2"
                title={anime.title}
              >
                {anime.title}
              </h1>
            </Tippy>
            <span className="mt-0 text-sm">
              <Link href={`/stats/triplezko/anime/statuses/${anime.status.id}`}>
                <a className="text-blue-500 hover:text-blue-600 hover:underline">
                  {anime.status.name}
                </a>
              </Link>{" "}
              / Score:{" "}
              <Link href={`/stats/triplezko/anime/scores/${anime.score}`}>
                <a className="text-blue-500 hover:text-blue-600 hover:underline">
                  {anime.score}
                </a>
              </Link>{" "}
              {anime.start_year && "/ Started Watching in "}
              {anime.start_year && (
                <Link
                  href={`/stats/triplezko/anime/watch_years/${anime.start_year}`}
                >
                  <a className="text-blue-500 hover:text-blue-600 hover:underline">
                    {anime.start_year}
                  </a>
                </Link>
              )}
            </span>
          </div>
          <div className="overflow-y-scroll">
            <div className="py-1">
              <div>
                <span>Studios: </span>
                {anime.creators.map((studio, i) => [
                  i > 0 && ", ",
                  <Link
                    href={`/stats/triplezko/anime/studios/${studio
                      .toLowerCase()
                      .replaceAll(" ", "_")}`}
                    key={studio}
                  >
                    <a className="text-blue-500 hover:text-blue-600 hover:underline">
                      {studio}
                    </a>
                  </Link>,
                ])}
              </div>
              <div>
                <span>Genres: </span>
                {anime.genres.map((genre, i) => [
                  i > 0 && ", ",
                  <Link
                    href={`/stats/triplezko/anime/genres/${genre
                      .toLowerCase()
                      .replaceAll(" ", "_")}`}
                    key={genre}
                  >
                    <a className="text-blue-500 hover:text-blue-600 hover:underline">
                      {genre}
                    </a>
                  </Link>,
                ])}
              </div>
              <div>
                <span>Released in: </span>
                {anime.release_year && (
                  <Link
                    href={`/stats/triplezko/anime/release_years/${Math.floor(
                      anime.release_year
                    )}`}
                  >
                    <a className="text-blue-500 hover:text-blue-600 hover:underline">
                      {anime.release_year}
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
