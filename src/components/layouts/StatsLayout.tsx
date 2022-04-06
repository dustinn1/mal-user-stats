import { useState, useContext, ReactNode } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import StatsHeader from "../../components/stats/Header";
import Tabs from "../stats/Tabs";
import { StatsContextProvider } from "../../contexts/StatsContext";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter();
  const { username } = router.query;

  const [currentCategory, setCurrentCategory] = useState<"anime" | "manga">(
    "anime"
  );

  const setCategory = (category: "anime" | "manga") => {
    setCurrentCategory(category);
  };

  return (
    <>
      <Head>
        <title>{username} - MyAnimeList User Stats</title>
      </Head>
      <StatsHeader />
      <Tabs
        currentCategory={currentCategory}
        setCurrentCategory={setCategory}
      />
      <StatsContextProvider>
        <div className="flex h-screen">
          <div className="w-full bg-white px-3 pt-7">{children}</div>
        </div>
      </StatsContextProvider>
    </>
  );
}
