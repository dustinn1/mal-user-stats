import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tab from "./Tab";
import { statsTabs } from "../../../data/statsTabs";
import { classNames } from "../../../utils/classNames";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import LoadingIndicator from "../../LoadingIndicator";
import Dropdown from "../../Dropdown";

export default function Tabs() {
  const router = useRouter();
  const { username, type, stat } = router.query;
  const [currentCategory, setCurrentCategory] = useState(type);

  const currentCategoryTab = statsTabs.find(
    (tab) => tab.name.toLowerCase() === currentCategory
  )!;
  const width = useWindowWidth();

  if (currentCategoryTab === undefined) {
    return <LoadingIndicator />;
  }

  const pathSplit = router.asPath.split("/");

  return (
    <div className="grid grid-cols-2 gap-3 px-3 lg:flex xl:px-0">
      <Dropdown
        menuButton={
          <div className="w-full">
            <Tab
              name={currentCategoryTab.name}
              icon={currentCategoryTab.icon}
              dropdown
            />
          </div>
        }
        items={{
          data: statsTabs,
          key: "id",
          button: ({ active, item }) => (
            <button
              className={classNames(
                "my-0.5 flex w-full items-center rounded-md px-3 py-2",
                active ||
                  currentCategory ===
                    item.name.toLowerCase().replaceAll(" ", "_")
                  ? "bg-gray-700 text-white dark:bg-gray-600"
                  : "text-gray-900 dark:text-gray-100"
              )}
              onClick={() =>
                setCurrentCategory(item.name.toLowerCase() as "anime" | "manga")
              }
            >
              <FontAwesomeIcon icon={item.icon} className="mr-3 w-6" />
              {item.name}
            </button>
          ),
        }}
      />
      {width >= 1024 ? (
        <div className="auto-cols-max grid-flow-col gap-2.5 overflow-x-scroll lg:grid">
          {currentCategoryTab.tabs.map((tab) => (
            <Link
              href={`/stats/${username}/${currentCategory}/${tab
                .toLowerCase()
                .replaceAll(" ", "_")}`}
              key={tab}
            >
              <a>
                <Tab
                  name={tab}
                  active={
                    pathSplit[3] === currentCategory &&
                    stat === tab.toLowerCase().replaceAll(" ", "_")
                  }
                />
              </a>
            </Link>
          ))}
        </div>
      ) : (
        <Dropdown
          menuButton={
            <div className="w-full capitalize">
              <Tab name={pathSplit[4].replaceAll("_", " ")} dropdown />
            </div>
          }
          items={{
            data: currentCategoryTab.tabs,
            key: "id",
            button: ({ active, item }) => (
              <Link
                href={`/stats/${username}/${currentCategory}/${item
                  .toLowerCase()
                  .replaceAll(" ", "_")}`}
                key={item}
              >
                <a
                  className={classNames(
                    "my-0.5 flex w-full items-center truncate rounded-md px-3 py-2",
                    active ||
                      pathSplit[4] === item.toLowerCase().replaceAll(" ", "_")
                      ? "bg-gray-700 text-white dark:bg-gray-600"
                      : "text-gray-900 dark:text-gray-100"
                  )}
                >
                  {item}
                </a>
              </Link>
            ),
          }}
        />
      )}
    </div>
  );
}
