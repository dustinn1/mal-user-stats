import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";
import LoadingIndicator from "../components/LoadingIndicator";
import Button from "../components/Button";
import {
  faArrowDownAZ,
  faClock,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import UserCardsContainer from "../components/home/CardsContainer";
import Link from "next/link";
import { NextSeo } from "next-seo";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [sort, setSort] = useState<"username" | "date">("username");
  const [search, setSearch] = useState("");

  const users = useLiveQuery(async () => {
    return await db.userInfo.toArray();
  });

  useEffect(() => setLoaded(users !== undefined), [users]);

  if (!loaded) {
    return (
      <div className="flex h-48 items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <>
      <NextSeo title="Home" />
      <div className="mx-3 mt-5 xl:mx-auto">
        {loaded && users !== undefined && users.length > 0 ? (
          <>
            <div className="mb-3 flex flex-wrap justify-center gap-y-2 md:justify-between">
              <div className="flex grow gap-x-1 xl:w-1/3 xl:grow-0">
                <input
                  type="search"
                  id="search"
                  name="search"
                  placeholder="Search"
                  autoComplete="off"
                  className="h-8 w-full appearance-none rounded-md border border-gray-400 bg-white px-3 outline-0 duration-100 ease-linear focus:border-blue-900 dark:border-gray-500 dark:bg-black dark:focus:border-blue-400 lg:h-auto"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <Button
                  onClick={() => setShowFavorites(!showFavorites)}
                  size="sm"
                  icon={faHeart}
                  text="Favorites"
                  active={showFavorites}
                />
              </div>
              <div className="flex items-start overflow-x-scroll">
                <Button
                  onClick={() => setSort("username")}
                  size="sm"
                  icon={faArrowDownAZ}
                  text="Username"
                  active={sort === "username"}
                />
                <Button
                  onClick={() => setSort("date")}
                  size="sm"
                  icon={faClock}
                  text="Date Updated"
                  active={sort === "date"}
                />
              </div>
            </div>
            <UserCardsContainer
              users={users}
              search={search}
              sort={sort}
              showFavorites={showFavorites}
            />
          </>
        ) : (
          <div className="mt-8 text-center ">
            <h1 className="mb-3 text-2xl font-bold">
              No User Stats Have Been Generated
            </h1>
            <Link href="/generate">
              <a className="text-xl text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-500 dark:hover:text-blue-400">
                Start Generating
              </a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
