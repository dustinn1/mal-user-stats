import Link from "next/link";
import { useRouter } from "next/router";

const tabs = ["Overview", "History", "Genres", "Studios"];

export default function StatsSideNav() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div className="w-60 pt-5 pr-3 mr-3">
      <div className="w-full text-center">
        <h1 className="text-2xl mb-3 font-medium text-gray-700 inline-block border-solid border-b-2 border-black">
          Anime
        </h1>
      </div>
      <div className="flex flex-wrap">
        {tabs.map((name) => (
          <Link
            href={`/stats/${username}/anime/${name.toLowerCase()}`}
            key={name}
          >
            <a
              className={`py-2.5 px-14 my-1 w-full text-lg rounded-l-none rounded-lg ${
                router.asPath ===
                `/stats/${username}/anime/${name.toLowerCase()}`
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              {name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
