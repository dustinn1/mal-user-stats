import { useState, ReactNode, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import StatsHeader from "../../components/stats/Header";
import Tabs from "../stats/Tabs";
import { StatsContextProvider } from "../../contexts/StatsContext";
import LoadingIndicator from "../LoadingIndicator";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const username: string = router.query.username as string;

  const [currentCategory, setCurrentCategory] = useState<"anime" | "manga">(
    "anime"
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
              <div className="w-full bg-white px-3 pt-5">{children}</div>
            </div>
          </StatsContextProvider>
        </>
      );
    } else {
      return (
        <div className="flex h-48 items-center justify-center">
          <LoadingIndicator />;
        </div>
      );
    }
  } else {
    return (
      <div className="flex h-48 items-center justify-center">
        <LoadingIndicator />;
      </div>
    );
  }
}
