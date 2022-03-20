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
    <header className="my-3 flex h-48 flex-wrap items-center justify-between rounded-3xl bg-gray-200 px-14 text-gray-900">
      <div className="flex flex-wrap items-center">
        <div className="relative h-[130px] w-[130px]">
          <Image
            src="https://cdn.myanimelist.net/images/userimages/7296529.webp"
            alt="profile picture"
            layout="fill"
            objectFit="contain"
            quality={100}
            priority
          />
        </div>
        <div className="ml-5 flex flex-grow-0 flex-col items-start gap-3">
          <h1 className="text-5xl font-bold">triplezko</h1>
          <Button text="Save" icon={faPlus} size="sm" />
        </div>
      </div>
      <div className="ml-5 flex flex-grow-0 flex-col gap-3">
        <span className="text-lg">
          <FontAwesomeIcon icon={faClock} className="mr-1.5" />
          Last Updated: 5 months ago
        </span>
        <Button text="Update Stats" icon={faArrowsRotate} size="lg" />
      </div>
    </header>
  );
}
