import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faTelevision } from "@fortawesome/free-solid-svg-icons";
import Tab from "../Tab";

const tabs = [
  {
    name: "Overview",
  },
  {
    name: "History",
  },
  {
    name: "Genres",
  },
  {
    name: "Studios",
  },
];

const dropdown = [
  { name: "Anime", icon: faTelevision },
  { name: "Manga", icon: faBook },
];

export default function Tabs() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div className="px-3 flex">
      <div className="pr-3.5 mr-3.5 border-r border-gray-400">
        <Menu as="div" className="relative inline-block">
          <Menu.Button>
            <Tab name="Anime" icon={faTelevision} dropdown />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute bg-white right-0 w-40 mt-2 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-1">
                {dropdown.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <button
                        className={`flex items-center rounded-md w-full px-3 py-2 my-0.5 ${
                          active ? "bg-gray-700 text-white" : "text-gray-900"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          className="w-6 mr-3"
                        />
                        {item.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="flex gap-3 overflow-x-scroll">
        {tabs.map((tab) => (
          <Link
            href={`/stats/${username}/anime/${tab.name.toLowerCase()}`}
            key={tab.name}
          >
            <a>
              <Tab
                name={tab.name}
                active={
                  router.asPath ===
                  `/stats/${username}/anime/${tab.name.toLowerCase()}`
                }
              />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
