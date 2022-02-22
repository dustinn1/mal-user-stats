import { ReactNode } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import StatsHeader from "../../components/stats/Header";
import StatsSideNav from "../../components/stats/SideNav";

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
      <div className="flex h-screen bg-gray-100">
        <StatsSideNav />
        <div className="p-5 bg-white w-full shadow">
          <h1>{children}</h1>
        </div>
      </div>
    </>
  );
}
