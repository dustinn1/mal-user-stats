import { useEffect, useState } from "react";
import axios from "axios";
import LoadingIndicator from "../LoadingIndicator";
import { db } from "../../db";
import { useRouter } from "next/router";

function sleep(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export default function FetchData({ username }: { username: string }) {
  const [message, setMessage] = useState("Connecting to backend...");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const initialStatus = await axios.post(
        "http://localhost:8000/generate/status",
        {
          username: username,
        }
      );
      if (initialStatus.data.code === 404) {
        let generated = false;
        setMessage("Generating stats...");
        console.log(
          await axios.post("http://localhost:8000/generate/new", {
            username: username,
          })
        );
        while (!generated) {
          const status = await axios.post(
            "http://localhost:8000/generate/status",
            {
              username: username,
            }
          );
          console.log(status.data);
          if (status.data.code === 200) {
            generated = true;
            break;
          }
          await sleep(5000);
        }
      }
      setMessage("Fetching generated stats... (1/2)");
      const animeStats = await axios.post(
        "http://localhost:8000/generate/fetch",
        {
          username: username,
          type: "anime",
        }
      );
      await db.animeStats.add({
        username: username,
        data: animeStats.data,
      });
      setMessage("Fetching generated stats... (2/2)");
      const userInfo = await axios.post(
        "http://localhost:8000/generate/fetch",
        {
          username: username,
          type: "user",
        }
      );
      await db.userInfo.add({
        username: username,
        data: userInfo.data,
      });
      setMessage("Stats fetched");
      return router.push(`/stats/${username}/anime/overview`);
    };
    fetchData().catch(() =>
      setMessage("Unable to connect to backend. Try again later.")
    );
  }, [router, username]);

  return (
    <div className="mt-20 flex flex-wrap items-center justify-center">
      <p className="mb-5 w-full text-center text-lg">{message}</p>
      <LoadingIndicator />
    </div>
  );
}
