import { useContext, useEffect, useState } from "react";
import { StatsContext } from "../../contexts/StatsContext";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faArrowsRotate,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import Modal from "../Modal";
import { useRouter } from "next/router";
import Tippy from "@tippyjs/react";
import { db } from "../../db";
import Button from "../Button";
import { useUserFavorite } from "../../hooks/useUserFavorite";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default function StatsHeader() {
  const { user } = useContext(StatsContext);
  const router = useRouter();
  const { isFavorite, updateFavorite } = useUserFavorite(user.mal_id);

  return (
    <header className="h-68 my-2.5 mx-3 flex flex-wrap items-center justify-between rounded-2xl border-2 border-blue-500 bg-gray-200 py-3 px-5 text-gray-900 dark:bg-gray-900 dark:text-gray-200 sm:h-52 xl:mx-auto xl:h-44 xl:px-14">
      <div className="flex w-full flex-wrap items-center justify-center gap-x-5 lg:w-auto">
        <div className="relative h-[100px] w-[100px]">
          <Image
            src={`https://cdn.myanimelist.net/images/userimages/${user.mal_id}.webp`}
            alt="profile picture"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
        <h1 className="w-full break-words text-center text-xl font-bold sm:w-auto sm:text-2xl md:text-4xl xl:text-5xl">
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
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="lg"
            text={isFavorite ? "Favorited" : "Favorite"}
            active={isFavorite}
            startIcon={faHeart}
            onClick={() => updateFavorite()}
          />
          <Modal
            title="Update Stats"
            description="Are you sure you want to update this user's stats? These current stats will be overriden."
            button={{ text: "Update Stats", icon: faArrowsRotate }}
            actionButton={{
              text: "Update",
              onClick: () =>
                router.push(
                  {
                    pathname: "/generate",
                    query: { username: user.username },
                  },
                  router.asPath
                ),
            }}
          />
          {/* <Modal
            title="Delete Stats"
            description="Are you sure you want to delete this user's stats? You will have to regenerate to view them again."
            button={{ text: "Delete Stats", icon: faTrashCan }}
            actionButton={{
              text: "Delete",
              onClick: () => {
                router.push("/");
                db.userInfo.delete(user.username);
                db.animeStats.delete(user.username);
              },
            }}
          /> */}
        </div>
      </div>
    </header>
  );
}
