import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tab from "../Tab";
import { statsTabs } from "../../data/statsTabs";

type Props = {
  currentCategory: "anime" | "manga";
  setCurrentCategory: (category: "anime" | "manga") => void;
};

export default function Tabs({ currentCategory, setCurrentCategory }: Props) {
  const router = useRouter();
  const { username } = router.query;
  const currentCategoryTab = statsTabs.find(
    (tab) => tab.name.toLowerCase() === currentCategory
  )!;

  return (
    <div className="flex px-3">
      <div className="mr-3.5 border-r border-gray-400 pr-3.5">
        <Menu as="div" className="relative inline-block">
          <Menu.Button>
            <Tab
              name={currentCategoryTab.name}
              icon={currentCategoryTab.icon}
              dropdown
            />
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
            <Menu.Items className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-0.5">
                {statsTabs.map((tab) => (
                  <Menu.Item
                    key={tab.name.toLowerCase()}
                    onClick={() =>
                      setCurrentCategory(
                        tab.name.toLowerCase() as "anime" | "manga"
                      )
                    }
                  >
                    {({ active }) => (
                      <button
                        className={`my-0.5 flex w-full items-center rounded-md px-3 py-2  ${
                          active ||
                          currentCategory ===
                            tab.name.toLowerCase().replace(" ", "_")
                            ? "bg-gray-700 text-white"
                            : "text-gray-900"
                        }`}
                      >
                        <FontAwesomeIcon icon={tab.icon} className="mr-3 w-6" />
                        {tab.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="flex gap-2.5 overflow-x-scroll">
        {currentCategoryTab.tabs.map((tab) => (
          <Link
            href={`/stats/${username}/${currentCategory}/${tab
              .toLowerCase()
              .replace(" ", "_")}`}
            key={tab}
          >
            <a>
              <Tab
                name={tab}
                active={
                  router.asPath ===
                  `/stats/${username}/${currentCategory}/${tab
                    .toLowerCase()
                    .replace(" ", "_")}`
                }
              />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
