import { useCallback, useEffect, useRef, useState } from "react";
import { useVirtual } from "react-virtual";
import { UserDb } from "../../db";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import UserCard from "./UserCard";
import Fuse from "fuse.js";

type Props = {
  users: UserDb[];
  search: string;
  sort: "username" | "date";
};

function compare(prop: string) {
  if (prop === "username") {
    return function (a: UserDb, b: UserDb) {
      return a.data.username.localeCompare(b.data.username);
    };
  } else if (prop === "date") {
    return function (a: UserDb, b: UserDb) {
      return (
        new Date(b.data.generated_on).getTime() -
        new Date(a.data.generated_on).getTime()
      );
    };
  }
}

export default function UserCardsContainer({ users, search, sort }: Props) {
  const [data, setData] = useState(users);
  useEffect(() => {
    const fuse = new Fuse(users, {
      keys: ["username"],
      fieldNormWeight: 1,
    });
    setData(
      search !== ""
        ? fuse.search(search).map((e) => e.item)
        : users.sort(compare(sort))
    );
  }, [users, search, sort]);

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtual({
    size: data.length,
    estimateSize: useCallback(() => 190, []),
    parentRef,
    windowRef: useRef(window),
    overscan: 3,
  });

  const width = useWindowWidth();
  let split: number;

  if (width >= 1280) {
    split = 3;
  } else if (width >= 768) {
    split = 2;
  } else {
    split = 1;
  }

  return (
    <div ref={parentRef}>
      <div
        style={{
          height: `${
            rowVirtualizer.totalSize / split + (width > 768 ? 200 : 50)
          }px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.index}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {[...Array(split)].map((_, i) => {
              if (data[split * virtualRow.index + i] !== undefined) {
                return (
                  <UserCard key={i} user={data[split * virtualRow.index + i]} />
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
