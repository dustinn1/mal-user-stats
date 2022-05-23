import { useContext } from "react";
import { StatsContext } from "../../contexts/StatsContext";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function StatsHeader() {
  const { user } = useContext(StatsContext);
  return (
    <header className="h-68 my-3 mx-3 flex flex-wrap items-center justify-between rounded-3xl bg-gray-200 py-3 px-5 text-gray-900 sm:h-52 xl:mx-auto xl:h-44 xl:px-14">
      <div className="flex w-full flex-wrap items-center justify-center lg:w-auto">
        <div className="relative h-[100px] w-[100px]">
          <Image
            src={`https://cdn.myanimelist.net/images/userimages/${user.mal_id}.webp`}
            alt="profile picture"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
        <h1 className="ml-5 w-full break-words text-center text-xl font-bold sm:w-auto sm:text-2xl md:text-4xl xl:text-5xl">
          {user.username}
        </h1>
      </div>
      <div className="flex w-full flex-grow-0 flex-col gap-3 text-center lg:w-auto">
        <span className="text-lg">
          <FontAwesomeIcon icon={faClock} className="mr-1.5" />
          Last Updated: {dayjs(user.generated_on).fromNow()}
        </span>
        <Button text="Update Stats" icon={faArrowsRotate} size="lg" />
      </div>
    </header>
  );
}
