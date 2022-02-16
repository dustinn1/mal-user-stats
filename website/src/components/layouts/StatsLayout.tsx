import { ReactNode } from "react";
import Head from "next/head";
import AppLayout from "./AppLayout";
import StatsHeader from "../../components/stats/Header";
import StatsSideNav from "../../components/stats/SideNav";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>username - MyAnimeList User Stats</title>
      </Head>
      <AppLayout>
        <StatsHeader />
        <div className="px-14 mt-5 flex">
          <StatsSideNav />
          <h1>{children}</h1>
        </div>
      </AppLayout>
    </>
  );
}
