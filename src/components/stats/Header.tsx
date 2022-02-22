import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export default function StatsHeader() {
  return (
    <header className="flex justify-between items-center bg-gray-900 text-white h-44 px-14">
      <div className="flex items-center gap-5">
        <Image
          src="https://cdn.myanimelist.net/images/userimages/7296529.webp"
          alt="profile picture"
          width={120}
          height={120}
          className="rounded-md"
        />
        <div className="flex flex-col gap-2.5">
          <h1 className="text-5xl font-bold">triplezko</h1>
          <span className="text-lg text-gray-200">
            <FontAwesomeIcon icon={faClock} className="mr-1.5" />
            Updated 5 months ago
          </span>
        </div>
      </div>
    </header>
  );
}
