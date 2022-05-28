import { useContext } from "react";
import { FilterContext } from "../../../contexts/FilterContext";
import Button from "../../Button";
import {
  faAngleLeft,
  faArrowDown91,
  faArrowDownAZ,
  faBook,
  faCalendar,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import FilterSelect from "./FilterSelect";
import { Stats } from "../../../interfaces/stats";
import FilterTags from "./FilterTags";
import { Disclosure, Transition } from "@headlessui/react";
import FilterInput from "./FilterInput";

type Props = {
  stats: Stats;
};

export default function MangaFilterContainer({ stats }: Props) {
  const { setSort, sort } = useContext(FilterContext);

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div className="mb-5 flex flex-wrap justify-center gap-2 lg:justify-between">
            <div className="flex grow xl:w-1/3 xl:grow-0">
              <FilterInput />
              <Disclosure.Button className="ml-1">
                <Button
                  size="sm"
                  icon={faFilter}
                  text="Filters"
                  dropdown
                  active={open}
                />
              </Disclosure.Button>
            </div>
            <div className="flex overflow-x-scroll">
              <Button
                onClick={() => setSort("title")}
                size="sm"
                icon={faArrowDownAZ}
                text="Title"
                active={sort === "title"}
              />
              <Button
                onClick={() => setSort("score")}
                size="sm"
                icon={faArrowDown91}
                text="Score"
                active={sort === "score"}
              />
              <Button
                onClick={() => setSort("chapters_count")}
                size="sm"
                icon={faBook}
                text="Chapters Count"
                active={sort === "chapters_count"}
              />
              <Button
                onClick={() => setSort("release_year")}
                size="sm"
                icon={faCalendar}
                text="Release Year"
                active={sort === "release_year"}
              />
              <Button
                onClick={() => setSort("start_year")}
                size="sm"
                icon={faCalendar}
                text="Start Year"
                active={sort === "start_year"}
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
            <Disclosure.Panel className="mb-4 grid grid-cols-1 gap-4 rounded-md bg-gray-200 p-3 md:grid-cols-2 xl:grid-cols-4 xl:p-5">
              <FilterSelect data={stats.genres} name="genres" />
              <FilterSelect data={stats.creators} name="creators" />
              <FilterSelect data={stats.statuses} name="status" />
              <FilterSelect data={stats.formats} name="format" />
            </Disclosure.Panel>
          </Transition>
          <FilterTags />
        </>
      )}
    </Disclosure>
  );
}
