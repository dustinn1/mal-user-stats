import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faPlus,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";

export default function StatsHeader() {
  return (
    <header className="flex justify-between items-center flex-wrap bg-gray-200 text-gray-900 h-48 px-14 my-3 rounded-3xl">
      <div className="flex flex-wrap items-center">
        <div className="w-[130px] h-[130px] relative">
          <Image
            src="https://cdn.myanimelist.net/images/userimages/7296529.webp"
            alt="profile picture"
            layout="fill"
            objectFit="contain"
            quality={100}
            priority
          />
        </div>
        <div className="flex flex-col flex-grow-0 items-start ml-5 gap-3">
          <h1 className="text-5xl font-bold">triplezko</h1>
          <Button text="Save" icon={faPlus} size="sm" />
        </div>
      </div>
      <div className="flex flex-col flex-grow-0 ml-5 gap-3">
        <span className="text-lg">
          <FontAwesomeIcon icon={faClock} className="mr-1.5" />
          Last Updated: 5 months ago
        </span>
        <Button text="Update Stats" icon={faArrowsRotate} size="lg" />
      </div>
    </header>
  );
}
