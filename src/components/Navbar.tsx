import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 px-5 py-3 md:px-14">
      <Link href="/">
        <a className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={35} height={35} />
          <h1 className="hidden text-2xl font-semibold sm:block">
            MyAnimeList User Stats
          </h1>
        </a>
      </Link>
      <div className="text-2xl">
        <FontAwesomeIcon icon={faSun} />
      </div>
    </nav>
  );
}
