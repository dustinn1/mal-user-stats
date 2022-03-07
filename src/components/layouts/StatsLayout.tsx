import { ReactNode } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import StatsHeader from "../../components/stats/Header";
import Tabs from "../stats/Tabs";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter();
  const { username } = router.query;

  return (
    <>
      <Head>
        <title>{username} - MyAnimeList User Stats</title>
      </Head>
      <StatsHeader />
      <Tabs />
      <div className="flex h-screen">
        <div className="px-5 pt-7 bg-white w-full">
          <h1>{children}</h1>
        </div>
      </div>
    </>
  );
}
