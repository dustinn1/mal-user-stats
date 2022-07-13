import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDisplay,
  faLanguage,
  faMoon,
  faSun,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "../utils/classNames";
import { SettingsContext } from "../contexts/SettingsContext";
import Dropdown from "./Dropdown";

const themes: { name: "system" | "light" | "dark"; icon: IconDefinition }[] = [
  { name: "system", icon: faDisplay },
  { name: "light", icon: faSun },
  { name: "dark", icon: faMoon },
];
const languages: {
  name: "romaji" | "english" | "japanese";
  display: string;
}[] = [
  { name: "romaji", display: "romaji" },
  { name: "english", display: "english" },
  { name: "japanese", display: "日本語" },
];

export default function Navbar() {
  const settings = useContext(SettingsContext);
  return (
    <nav className="flex items-center justify-between border-b border-gray-300 bg-blue-600 px-5 py-2 text-white dark:border-gray-700 dark:bg-blue-800 md:px-14">
      <Link href="/">
        <a className="flex items-center gap-2">
          <Image src="/logo_white.png" alt="logo" width={32} height={32} />
          <h1 className="hidden text-2xl font-semibold sm:block">
            MyAnimeList User Stats
          </h1>
        </a>
      </Link>
      <div className="flex items-center gap-2">
        <Dropdown
          menuButton={
            <div className="w-12">
              <FontAwesomeIcon icon={faLanguage} className="text-3xl" />
            </div>
          }
          items={{
            data: languages,
            key: "name",
            width: "32",
            button: ({ active, item }) => (
              <button
                className={classNames(
                  "my-0.5 flex w-full items-center rounded-md px-3 py-2 capitalize",
                  active || settings.titleLanguage === item.name
                    ? "bg-gray-700 text-white dark:bg-gray-600"
                    : "text-gray-900 dark:text-gray-100"
                )}
                onClick={() => settings.updateTitleLanguage(item.name)}
              >
                {item.display}
              </button>
            ),
          }}
        />
        <Dropdown
          menuButton={
            <div className="w-12">
              <FontAwesomeIcon icon={faSun} className="text-2xl" />
            </div>
          }
          items={{
            data: themes,
            key: "name",
            width: "32",
            button: ({ active, item }) => (
              <button
                className={classNames(
                  "my-0.5 flex w-full items-center rounded-md px-3 py-2 capitalize",
                  active || settings.theme === item.name
                    ? "bg-gray-700 text-white dark:bg-gray-600"
                    : "text-gray-900 dark:text-gray-100"
                )}
                onClick={() => settings.updateTheme(item.name)}
              >
                <FontAwesomeIcon icon={item.icon} className="mr-3 w-6" />
                {item.name}
              </button>
            ),
          }}
        />
      </div>
    </nav>
  );
}
