import { useContext } from "react";
import { FilterContext } from "../../../contexts/FilterContext";
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
import { AnimeStats } from "../../../interfaces/stats";
import FilterRange from "./FilterRange";
import FilterTags from "./FilterTags";
import { Disclosure, Transition } from "@headlessui/react";
import FilterInput from "./FilterInput";

type Props = {
  stats: AnimeStats;
};

export default function FilterContainer({ stats }: Props) {
  const filter = useContext(FilterContext);

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div className="mb-3 flex justify-between">
            <div className="flex w-1/3">
              <div className="grow">
                <FilterInput />
              </div>
              <Disclosure.Button>
                <Button
                  size="sm"
                  icon={faFilter}
                  text="Filters"
                  dropdown
                  active={open}
                />
              </Disclosure.Button>
            </div>
            <div>
              <Button
                onClick={() => filter.setSort("title")}
                size="sm"
                icon={faArrowDownAZ}
                text="Title"
                active={filter.sort === "title"}
              />
              <Button
                onClick={() => filter.setSort("score")}
                size="sm"
                icon={faArrowDown91}
                text="Score"
                active={filter.sort === "score"}
              />
              <Button
                onClick={() => filter.setSort("episodes_count")}
                size="sm"
                icon={faTv}
                text="Episodes Count"
                active={filter.sort === "episodes_count"}
              />
              <Button
                onClick={() => filter.setSort("release_year")}
                size="sm"
                icon={faCalendar}
                text="Release Year"
                active={filter.sort === "release_year"}
              />
              <Button
                onClick={() => filter.setSort("watch_year")}
                size="sm"
                icon={faCalendar}
                text="Watch Year"
                active={filter.sort === "watch_year"}
              />
            </div>
          </div>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-100 opacity-0"
            enterTo="transform opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-100 opacity-0"
          >
            <Disclosure.Panel className="mb-4 grid grid-cols-4 gap-4 rounded-md bg-gray-200 p-5">
              <FilterSelect data={stats.genres} name="genres" />
              <FilterSelect data={stats.studios} name="studios" />
              <FilterSelect data={stats.statuses} name="status" />
              <FilterSelect data={stats.formats} name="format" />
              {/* <FilterRange name="score" />
              <FilterRange name="episodes_count" />
              <FilterRange name="release_year" />
              <FilterRange name="watch_year" /> */}
            </Disclosure.Panel>
          </Transition>
          <FilterTags />
        </>
      )}
    </Disclosure>
  );
}
