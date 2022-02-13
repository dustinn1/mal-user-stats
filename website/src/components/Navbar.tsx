import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center border-b-2 border-gray-200 px-10 py-4 mb-5">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="logo" width={35} height={35} />
        <h1 className="text-2xl font-semibold hidden md:block">
          MyAnimeList User Stats
        </h1>
      </div>
    </div>
  );
}
