import Link from "next/link";
import { useRouter } from "next/router";

const tabs = [
  {
    name: "Overall",
    url: "/anime/overview",
    active: true,
  },
  {
    name: "History",
    url: "/anime/history",
    active: false,
  },
  {
    name: "Genre",
    url: "/anime/genre",
    active: false,
  },
  {
    name: "Studios",
    url: "/anime/studios",
    active: false,
  },
];

export default function StatsSideNav() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div className="w-56 mr-5">
      <h1 className="text-2xl ml-2 my-1 pb-1 font-medium text-gray-700 inline-block border-solid border-b-2 border-black">
        Anime
      </h1>
      {tabs.map((tab) => (
        <Link href={`/stats/${username}/${tab.url}`} key={tab.name}>
          <a
            className={`p-2.5 my-1 text-lg rounded-md hover:cursor-pointer hover:bg-green-900 hover:text-white ${
              tab.active ? "bg-green-900 text-white" : "text-gray-500"
            }`}
          >
            {tab.name}
          </a>
        </Link>
      ))}
    </div>
  );
}
