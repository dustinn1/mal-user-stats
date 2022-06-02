import Image from "next/image";
import Link from "next/link";
import type { UserDb } from "../../db";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default function UserCard({ user }: { user: UserDb }) {
  console.log(user);
  return (
    <Link
      href={`/stats/${user.data.username}/anime/overview`}
      key={user.data.username}
    >
      <a>
        <div className="rounded-xl border-2 border-blue-500 bg-gray-100 py-3 px-5 text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
          <div className="flex w-full flex-wrap items-center justify-center gap-x-5">
            <div className="relative h-[75px] w-[75px]">
              <Image
                src={`https://cdn.myanimelist.net/images/userimages/${user.data.mal_id}.webp`}
                alt="profile picture"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
            <div></div>
            <h1 className="w-full truncate text-center text-4xl font-bold">
              {user.data.username}
            </h1>
          </div>
          <div className="mt-0.5 flex w-full flex-grow-0 flex-col gap-3 truncate text-center">
            <span className="text-lg">
              <FontAwesomeIcon icon={faClock} className="mr-1.5" size="sm" />
              Last Updated: {dayjs(user.data.generated_on).fromNow()} (
              {dayjs(user.data.generated_on).tz(dayjs.tz.guess()).format("L")})
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
}
