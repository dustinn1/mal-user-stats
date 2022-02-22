import Link from "next/link";
import { useRouter } from "next/router";

const nav = [
  {
    type: "Anime",
    tabs: ["Overview", "History", "Genres", "Studios"],
  },
  /* {
    type: "Manga",
    tabs: ["Overview", "History", "Genres"],
  }, */
];

export default function StatsSideNav() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div className="w-72 pt-5 px-5 text-center">
      {nav.map((nav) => (
        <div className="mb-3" key={nav.type}>
          <h1 className="text-2xl mb-2 font-medium text-gray-700 inline-block border-solid border-b-2 border-black">
            {nav.type}
          </h1>
          <div className="flex flex-wrap">
            {nav.tabs.map((tab) => (
              <Link
                href={`/stats/${username}/${nav.type.toLowerCase()}/${tab.toLowerCase()}`}
                key={tab}
              >
                <a
                  className={`py-2.5 my-1 w-full text-lg rounded-xl ${
                    router.asPath ===
                    `/stats/${username}/${nav.type.toLowerCase()}/${tab.toLowerCase()}`
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </a>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
