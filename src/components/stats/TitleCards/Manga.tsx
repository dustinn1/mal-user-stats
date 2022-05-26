import Image from "next/image";
import Link from "next/link";
import { Manga } from "../../../interfaces/stats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";

type Props = {
  manga: Manga;
};

export default function MangaCard({ manga }: Props) {
  return (
    <div className="rounded-lg bg-gray-100">
      <div className="flex">
        <div className="relative mr-1 h-56 w-1/3 self-center">
          <Image
            src={`https://cdn.myanimelist.net/images/manga/${manga.image_url_id}l.webp`}
            alt="image"
            layout="fill"
            objectFit="cover"
            className="rounded-l-md"
          />
          <div className="absolute top-0 left-0 m-1 rounded bg-gray-800/75 py-1 px-2 text-center text-white">
            <Link href={`/stats/triplezko/manga/formats/${manga.format.id}`}>
              <a className="underline hover:text-gray-200">
                {manga.format.name}
              </a>
            </Link>{" "}
            /{" "}
            <Link
              href={`/stats/triplezko/manga/episodes_counts/${manga.chapters_count}`}
            >
              <a className="underline hover:text-gray-200">
                {manga.chapters_count}{" "}
                {manga.chapters_count > 1 || manga.chapters_count === 0
                  ? "chs"
                  : "ch"}
              </a>
            </Link>
          </div>
          <Link href={`https://myanimelist.net/manga/${manga.id}`}>
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
            <Tippy content={<span>{manga.title}</span>}>
              <h1
                className="text-lg font-bold leading-none line-clamp-2"
                title={manga.title}
              >
                {manga.title}
              </h1>
            </Tippy>
            <span className="mt-0 text-sm">
              <Link href={`/stats/triplezko/manga/statuses/${manga.status.id}`}>
                <a className="text-blue-500 hover:text-blue-600 hover:underline">
                  {manga.status.name}
                </a>
              </Link>{" "}
              / Score:{" "}
              <Link href={`/stats/triplezko/manga/scores/${manga.score}`}>
                <a className="text-blue-500 hover:text-blue-600 hover:underline">
                  {manga.score}
                </a>
              </Link>{" "}
              {manga.start_year && "/ Started Reading in "}
              {manga.start_year && (
                <Link
                  href={`/stats/triplezko/manga/start_years/${manga.start_year}`}
                >
                  <a className="text-blue-500 hover:text-blue-600 hover:underline">
                    {manga.start_year}
                  </a>
                </Link>
              )}
            </span>
          </div>
          <div className="overflow-y-scroll">
            <div className="py-1">
              <div>
                <span>Authors: </span>
                {manga.authors.map((author, i) => [
                  i > 0 && ", ",
                  <Link
                    href={`/stats/triplezko/manga/authors/${author.name
                      .toLowerCase()
                      .replaceAll(" ", "_")}`}
                    key={author.name}
                  >
                    <a className="text-blue-500 hover:text-blue-600 hover:underline">
                      {author.name} ({author.role})
                    </a>
                  </Link>,
                ])}
              </div>
              <div>
                <span>Genres: </span>
                {manga.genres.map((genre, i) => [
                  i > 0 && ", ",
                  <Link
                    href={`/stats/triplezko/manga/genres/${genre
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
                {manga.release_year && (
                  <Link
                    href={`/stats/triplezko/manga/release_years/${Math.floor(
                      manga.release_year
                    )}`}
                  >
                    <a className="text-blue-500 hover:text-blue-600 hover:underline">
                      {manga.release_year}
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
