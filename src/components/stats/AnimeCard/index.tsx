import Image from "next/image";
import Link from "next/link";
import { Anime } from "../../../interfaces/stats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

type Props = {
  anime: Anime;
};

export default function AnimeCard({ anime }: Props) {
  return (
    <div className="rounded-lg bg-gray-100">
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
              href={`/stats/triplezko/anime/episodes_counts/${anime.episodes_count}`}
            >
              <a className="underline hover:text-gray-200">
                {anime.episodes_count}{" "}
                {anime.episodes_count > 1 || anime.episodes_count === 0
                  ? "eps"
                  : "ep"}
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
            <h1
              className="text-lg font-bold leading-none line-clamp-2"
              title={anime.title}
            >
              {anime.title}
            </h1>
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
              {anime.watch_year && "/ Watched in "}
              {anime.watch_year && (
                <Link
                  href={`/stats/triplezko/anime/watch_years/${anime.watch_year}`}
                >
                  <a className="text-blue-500 hover:text-blue-600 hover:underline">
                    {anime.watch_year}
                  </a>
                </Link>
              )}
            </span>
          </div>
          <div className="overflow-y-scroll">
            <div className="py-1">
              <div>
                <span>Studios: </span>
                {anime.studios.map((studio, i) => [
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
