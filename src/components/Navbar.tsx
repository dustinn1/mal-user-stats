import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage, faSun } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
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
      <div className="flex items-center gap-5">
        <FontAwesomeIcon icon={faLanguage} className="text-3xl" />
        <FontAwesomeIcon icon={faSun} className="text-2xl" />
      </div>
    </nav>
  );
}
