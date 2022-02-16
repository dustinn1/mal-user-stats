import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-14 py-3">
      <Link href="/">
        <a className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={35} height={35} />
          <h1 className="text-2xl font-semibold hidden md:block">
            MyAnimeList User Stats
          </h1>
        </a>
      </Link>
    </div>
  );
}
