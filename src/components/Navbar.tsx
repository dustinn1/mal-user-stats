import { Fragment, useContext } from "react";
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

const themes: { name: "system" | "light" | "dark"; icon: IconDefinition }[] = [
  { name: "system", icon: faDisplay },
  { name: "light", icon: faSun },
  { name: "dark", icon: faMoon },
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
      <div className="flex items-center gap-8">
        <FontAwesomeIcon icon={faLanguage} className="text-3xl" />
        <Menu as="div" className="relative inline-block">
          <Menu.Button className="w-12">
            <FontAwesomeIcon icon={faSun} className="text-2xl" />
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
            <Menu.Items className="absolute right-0 z-50 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
              <div className="px-0.5">
                {themes.map((theme) => (
                  <Menu.Item key={theme.name}>
                    {({ active }) => (
                      <button
                        className={classNames(
                          "my-0.5 flex w-full items-center rounded-md px-3 py-2 capitalize",
                          active || settings.theme === theme.name
                            ? "bg-gray-700 text-white dark:bg-gray-600"
                            : "text-gray-900 dark:text-gray-100"
                        )}
                        onClick={() => settings.updateTheme(theme.name)}
                      >
                        <FontAwesomeIcon
                          icon={theme.icon}
                          className="mr-3 w-6"
                        />
                        {theme.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
}
