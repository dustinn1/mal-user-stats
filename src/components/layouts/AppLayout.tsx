import { ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SettingsContextProvider } from "../../contexts/SettingsContext";
import LoadingIndicator from "../LoadingIndicator";
import { NextSeo } from "next-seo";

const Navbar = dynamic(() => import("../Navbar"));

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoaded(true);
    }
  }, []);
  return (
    <>
      <NextSeo
        title="MyAnimeList User Stats"
        defaultTitle="MyAnimeList User Stats"
        titleTemplate="%s - MyAnimeList User Stats"
      />
      {loaded ? (
        <SettingsContextProvider>
          <Navbar />
          <main className="xl:container xl:mx-auto">{children}</main>
        </SettingsContextProvider>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
}
