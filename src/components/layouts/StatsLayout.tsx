import { useState, ReactNode, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { StatsContextProvider } from "../../contexts/StatsContext";
import LoadingIndicator from "../LoadingIndicator";
import dynamic from "next/dynamic";

const StatsHeader = dynamic(() => import("../../components/stats/Header"));
const Tabs = dynamic(() => import("../stats/Tabs"));

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const username: string = router.query.username as string;

  const [currentCategory, setCurrentCategory] = useState<"anime" | "manga">(
    router.asPath.split("/")[3] as "anime" | "manga"
  );
  const setCategory = (category: "anime" | "manga") => {
    setCurrentCategory(category);
  };

  useEffect(() => {
    if (!router.isReady) return;
    setIsLoaded(true);
  }, [router.isReady]);

  if (isLoaded) {
    if (username !== undefined) {
      return (
        <>
          <Head>
            <title>{username} - MyAnimeList User Stats</title>
          </Head>
          <StatsContextProvider username={username}>
            <StatsHeader />
            <Tabs
              currentCategory={currentCategory}
              setCurrentCategory={setCategory}
            />
            <div className="flex h-screen">
              <div className="mt-3 w-full px-3 xl:px-0">{children}</div>
            </div>
          </StatsContextProvider>
        </>
      );
    } else {
      return (
        <div className="flex h-48 items-center justify-center">
          <LoadingIndicator />
        </div>
      );
    }
  } else {
    return (
      <div className="flex h-48 items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }
}
