import { useContext } from "react";
import { StatsContext } from "../../contexts/StatsContext";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import Modal from "../Modal";
import { useRouter } from "next/router";
import Tippy from "@tippyjs/react";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default function StatsHeader() {
  const { user } = useContext(StatsContext);
  const router = useRouter();

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
        <Tippy
          content={
            <span>
              {dayjs(user.generated_on).tz(dayjs.tz.guess()).format("LLL")}
            </span>
          }
        >
          <span className="text-lg">
            <FontAwesomeIcon icon={faClock} className="mr-1.5" />
            Last Updated: {dayjs(user.generated_on).fromNow()}
          </span>
        </Tippy>
        <Modal
          title="Update Stats"
          description="Are you sure you want to update your stats? Your current stats will be overriden."
          button={{ text: "Update Stats", icon: faArrowsRotate }}
          buttonOnClick={() =>
            router.push(
              {
                pathname: "/generate",
                query: { username: "triplezko" },
              },
              router.asPath
            )
          }
        />
      </div>
    </header>
  );
}
