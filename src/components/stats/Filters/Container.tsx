import Button from "../../Button";
import {
  faAngleLeft,
  faArrowDown91,
  faArrowDownAZ,
  faCalendar,
  faFilter,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import FilterSelect from "./FilterSelect";
import Input from "../../Input";
import { AnimeStats } from "../../../interfaces/stats";
import FilterRange from "./FilterRange";

type Props = {
  stats: AnimeStats;
};

export default function FilterContainer({ stats }: Props) {
  return (
    <>
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
        <FilterSelect data={stats.genres} name="genres" />
        <FilterSelect data={stats.studios} name="studios" />
        <FilterSelect data={stats.statuses} name="status" />
        <FilterSelect data={stats.formats} name="format" />
        <FilterRange name="score" data={stats.scores} />
        {/* <FilterRange name="episodes_count" data={stats.episodes_counts} /> */}
        <FilterRange name="release_year" data={stats.release_years} />
        <FilterRange name="watch_year" data={stats.watch_years} />
      </div>
    </>
  );
}
