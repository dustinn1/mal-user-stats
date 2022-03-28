import Image from "next/image";
import Link from "next/link";
import { Anime } from "../../interfaces/stats";

type Props = {
  anime: Anime;
};

export default function AnimeCard({ anime }: Props) {
  return (
    <div className="rounded-lg bg-gray-100" key={anime.id}>
      <div className="flex">
        <div className="relative mr-1 h-56 w-1/3 self-center">
          <Image
            src={`https://cdn.myanimelist.net/images/anime/${anime.image_url_id}l.webp`}
            alt="image"
            layout="fill"
            objectFit="cover"
            className="rounded-l-md"
          />
          <div className="absolute top-0 left-0 m-1 rounded bg-gray-700/75 py-1 px-2 text-center text-white">
            {anime.format} / {anime.episodes_count}{" "}
            {anime.episodes_count > 1 ? "eps" : "ep"}
          </div>
        </div>
        <div className="w-2/3 divide-y divide-gray-500 py-1 px-2">
          <h1 className="pb-1 text-lg font-bold">{anime.title}</h1>
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
            <span>
              Released in:{" "}
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
            </span>
          </div>
          <div className="pt-1">
            <p>
              Status:{" "}
              <Link href={`/stats/triplezko/anime/statuses/${anime.status}`}>
                <a className="text-blue-500 hover:text-blue-600 hover:underline">
                  {anime.status}
                </a>
              </Link>
            </p>
            <p>
              Watched in:{" "}
              {anime.watch_year && (
                <Link
                  href={`/stats/triplezko/anime/watch_years/${Math.floor(
                    anime.watch_year
                  )}`}
                >
                  <a className="text-blue-500 hover:text-blue-600 hover:underline">
                    {anime.watch_year}
                  </a>
                </Link>
              )}
            </p>
            <p>
              Score:{" "}
              <Link href={`/stats/triplezko/anime/scores/${anime.score}`}>
                <a className="text-blue-500 hover:text-blue-600 hover:underline">
                  {anime.score}
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
