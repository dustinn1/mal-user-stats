import "../styles/globals.css";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { NextSeo } from "next-seo";
import { SettingsContextProvider } from "../contexts/SettingsContext";
import Navbar from "../components/Navbar";
import LoadingIndicator from "../components/LoadingIndicator";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "tippy.js/dist/tippy.css";
config.autoAddCss = false;

type AppPropsWithLayout = AppProps & {
  Component: {
    getLayout?: (page: ReactElement) => ReactNode;
  };
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoaded(true);
    }
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page);
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
          <main className="xl:container xl:mx-auto">
            {getLayout(<Component {...pageProps} />)}
          </main>
        </SettingsContextProvider>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
}
