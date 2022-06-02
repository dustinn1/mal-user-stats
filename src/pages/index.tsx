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

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  //const [showFavorites, setShowFavorites] = useState(false);
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
    <div className="mx-3 mt-5 xl:mx-auto">
      {loaded && users !== undefined && users.length > 0 ? (
        <>
          <div className="mb-3 flex flex-wrap justify-center gap-2 lg:justify-between">
            <div className="flex grow xl:w-1/2 xl:grow-0">
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
              {/* <div className="ml-2 w-1/2">
                <Button
                  onClick={() => setShowFavorites(false)}
                  size="sm"
                  icon={faUser}
                  text="All"
                  active={!showFavorites}
                />
                <Button
                  onClick={() => setShowFavorites(true)}
                  size="sm"
                  icon={faHeart}
                  text="Favorites"
                  active={showFavorites}
                />
              </div> */}
            </div>
            <div className="flex overflow-x-scroll">
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
          <UserCardsContainer users={users} search={search} sort={sort} />
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
  );
}
