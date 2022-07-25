import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";
import LoadingIndicator from "../components/LoadingIndicator";
import Button from "../components/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import UserCardsContainer from "../components/UserCards/CardsContainer";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { UserCardsContextProvider } from "../contexts/cards/UserCardsContext";
import { UserCardsTopBar } from "../components/stats/CardsTopBar";
import { UsersPagination } from "../components/stats/Pagination";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

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
            <div className="mb-4 flex items-center justify-between border-b-2 border-black pb-3 dark:border-white">
              <h1 className="text-4xl font-bold">Users</h1>
              <Link href="/generate">
                <a>
                  <Button size="lg" startIcon={faPlus} text="Generate Stats" />
                </a>
              </Link>
            </div>
            <UserCardsContextProvider data={users}>
              <UserCardsTopBar />
              <UserCardsContainer />
              <UsersPagination />
            </UserCardsContextProvider>
          </>
        ) : (
          <div className="mt-8 text-center">
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
