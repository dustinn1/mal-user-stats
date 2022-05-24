import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";
import LoadingIndicator from "../components/LoadingIndicator";
import Image from "next/image";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const userInfo = useLiveQuery(async () => {
    return await db.userInfo.toArray();
  });

  useEffect(() => setLoaded(userInfo !== undefined), [userInfo]);

  if (!loaded) {
    return (
      <div className="flex h-48 items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="mt-5">
      {loaded && userInfo !== undefined && userInfo.length > 0 ? (
        <div className="flex flex-col gap-5">
          {userInfo.map((user) => (
            <div
              key={user.username}
              className="mx-3 flex h-40 flex-wrap items-center justify-between rounded-2xl bg-gray-200 py-3 px-10 text-gray-900"
            >
              <div className="flex w-full flex-wrap items-center justify-center lg:w-auto">
                <div className="relative h-[100px] w-[100px]">
                  <Image
                    src={`https://cdn.myanimelist.net/images/userimages/${user.data.mal_id}.webp`}
                    alt="profile picture"
                    layout="fill"
                    objectFit="contain"
                    priority
                  />
                </div>
                <h1 className="ml-5 w-full break-words text-center text-xl font-bold sm:w-auto sm:text-2xl md:text-4xl xl:text-5xl">
                  {user.data.username}
                </h1>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <p>Does not exist</p>
        </>
      )}
    </div>
  );
}
