import { useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { StatsContextProvider } from "../../contexts/StatsContext";
import LoadingIndicator from "../LoadingIndicator";
import dynamic from "next/dynamic";

const StatsHeader = dynamic(() => import("../../components/stats/Header"));
const Tabs = dynamic(() => import("../stats/Tabs"));

type Props = {
  children: ReactNode;
};

export default function StatsLayout({ children }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    setIsLoaded(true);
  }, [router.isReady]);

  if (!isLoaded) {
    return (
      <div className="flex h-48 items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  if (username === undefined || typeof username !== "string") {
    return (
      <div className="flex h-48 items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <>
      <StatsContextProvider username={username}>
        <StatsHeader />
        <Tabs />
        <div className="mt-3 w-full px-3 xl:px-0">{children}</div>
      </StatsContextProvider>
    </>
  );
}
