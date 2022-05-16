import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSun } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-300 px-5 py-2 md:px-14">
      <Link href="/">
        <a className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <h1 className="hidden text-2xl font-semibold sm:block">
            MyAnimeList User Stats
          </h1>
        </a>
      </Link>
      <div className="flex gap-5 text-2xl">
        <FontAwesomeIcon icon={faSun} />
        <FontAwesomeIcon icon={faGear} />
      </div>
    </nav>
  );
}
