const genres = [
  {
    name: "Anime",
    active: true,
  },
  {
    name: "Manga",
    active: false,
  },
];

const tabs = [
  {
    name: "Overview",
    active: true,
  },
  {
    name: "History",
    active: false,
  },
  {
    name: "Genres",
    active: false,
  },
  {
    name: "Studios",
    active: false,
  },
];

export default function Nav() {
  return (
    <div className="flex p-1 mx-2 space-x-1 bg-blue-900/20 rounded-xl w-1/2">
      {tabs.map((tab) => (
        <div
          key={tab.name}
          className={`w-full py-2 mx-0.5 text-sm text-center font-medium rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 ${
            tab.active
              ? "bg-white shadow"
              : "text-gray-500 hover:bg-white/60 hover:text-gray-900"
          }`}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
}
