import Link from "next/link";
import Button from "../Button";
import {
  faAngleLeft,
  faArrowDown91,
  faArrowDownAZ,
  faCalendar,
  faFilter,
  faTv,
} from "@fortawesome/free-solid-svg-icons";

import { getAnimesInfo } from "../../utils/getAnimesInfo";
import CardsContainer from "./AnimeCard/CardsContainer";
import Input from "../Input";
import FilterSelect from "../FilterSelect";
import { useListFilter } from "../../hooks/useListFilter";
import { StatArray, AnimeStats } from "../../interfaces/stats";

type Props = {
  data: StatArray;
  allStats: AnimeStats;
};

export default function StatsSectionLoaded({ data, allStats }: Props) {
  const animesInfos = getAnimesInfo(data.animes, allStats.animes);

  const { filteredList, length, addFilter, clearFilters, filters } =
    useListFilter(animesInfos);

  return (
    <>
      {length}
      <p onClick={() => clearFilters()}>Clear Filters</p>
      {JSON.stringify(filters)}
      {/* <Link href={`/stats/${username}/anime/${stat}`}>
        <a>
          <Button size="sm" icon={faAngleLeft} text="Back" />
        </a>
      </Link> */}
      <div className="my-4 w-full rounded-lg bg-gray-100 pt-3">
        <div className="mx-4 flex items-center justify-center font-bold">
          <span className="text-3xl">{data.name}</span>
        </div>
        <div className="mx-4 flex py-3 text-center">
          <span className="w-1/3">
            <strong>{data.count}</strong>
            <br /> Animes
          </span>
          <span className="w-1/3">
            <strong>{data.time_watched}</strong>
            <br /> Watched
          </span>
          <span className="w-1/3">
            <strong>{data.mean_score}</strong>
            <br /> Average Score
          </span>
        </div>
      </div>
      <div className="mb-3 flex justify-between">
        <div className="flex w-1/3">
          <div className="grow">
            <Input />
          </div>
          <Button size="sm" icon={faFilter} text="Filter" dropdown />
        </div>
        <div>
          <Button
            //onClick={() => setSort("count")}
            size="sm"
            icon={faArrowDownAZ}
            text="Title"
            //active={sort === "count"}
          />
          <Button
            //onClick={() => setSort("count")}
            size="sm"
            icon={faArrowDown91}
            text="Score"
            //active={sort === "count"}
          />
          <Button
            //onClick={() => setSort("count")}
            size="sm"
            icon={faCalendar}
            text="Release Year"
            //active={sort === "count"}
          />
          <Button
            //onClick={() => setSort("count")}
            size="sm"
            icon={faCalendar}
            text="Watch Year"
            //active={sort === "count"}
          />
          <Button
            //onClick={() => setSort("count")}
            size="sm"
            icon={faTv}
            text="Episode Count"
            //active={sort === "count"}
          />
        </div>
      </div>
      <div className="mb-5 grid grid-cols-4 gap-5 rounded-md bg-gray-200 p-5">
        <FilterSelect
          data={allStats.genres}
          name="genres"
          addFilter={addFilter}
        />
        <FilterSelect
          data={allStats.studios}
          name="studios"
          addFilter={addFilter}
        />
        <FilterSelect
          data={allStats.statuses}
          name="statuses"
          addFilter={addFilter}
        />
        <FilterSelect
          data={allStats.formats}
          name="formats"
          addFilter={addFilter}
        />
      </div>
      <CardsContainer data={filteredList} />
    </>
  );
}
