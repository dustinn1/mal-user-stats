import { useRef, useCallback } from "react";
import { useVirtual } from "react-virtual";
import AnimeCard from "./Anime";
import MangaCard from "./Manga";
import { Anime, Manga } from "../../../interfaces/stats";
import { useWindowWidth } from "@react-hook/window-size/throttled";

type Props = {
  animes?: Anime[];
  mangas?: Manga[];
};

export default function StatCardsContainer({ animes, mangas }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtual({
    size: animes ? animes.length : mangas!.length,
    estimateSize: useCallback(() => 240, []),
    parentRef,
    windowRef: useRef(window),
    overscan: 5,
  });

  const width = useWindowWidth();
  let split: number;

  if (width >= 1280) {
    split = 3;
  } else if (width >= 768) {
    split = 3;
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
              if (animes) {
                if (animes[split * virtualRow.index + i] !== undefined) {
                  return (
                    <AnimeCard
                      anime={animes[split * virtualRow.index + i]}
                      key={i}
                    />
                  );
                }
              } else if (mangas) {
                if (mangas[split * virtualRow.index + i] !== undefined) {
                  return (
                    <MangaCard
                      manga={mangas[split * virtualRow.index + i]}
                      key={i}
                    />
                  );
                }
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
