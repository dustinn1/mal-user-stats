import { useState } from "react";
import { Disclosure, Popover, Transition } from "@headlessui/react";
import { usePopper } from "react-popper";
import FilterRange from "./FilterRange";
import FilterSelect from "./FilterSelect";
import Button from "../../Button";
import { FilterCategories } from "../../../interfaces/filters";
import { StatArraysOnly } from "../../../interfaces/stats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

type PopoverProps = {
  name: string;
  type: "select" | "range";
  select?: {
    dataKey: keyof StatArraysOnly;
    filterName: FilterCategories;
  };
  range?: {
    dataKey: "score" | "count" | "release_year" | "start_year";
  };
};

function PopoverPanel({ name, type, select, range }: PopoverProps) {
  let [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: "offset", options: { offset: [0, 6] } }],
  });

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button ref={setReferenceElement}>
            <Button size="xs" text={name} dropdown active={open} />
          </Popover.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            className="absolute z-10"
          >
            <Popover.Panel
              className="grid w-96 rounded-md border border-gray-700 bg-white py-1 shadow-lg dark:bg-gray-700"
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              <span className="mb-1 px-4 text-lg font-bold underline decoration-2 underline-offset-2">
                {name}
              </span>
              {type === "select" && select && (
                <FilterSelect
                  name={select.filterName}
                  dataKey={select.dataKey}
                />
              )}
              {type === "range" && range && (
                <FilterRange name={range.dataKey} />
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default function FiltersContainer() {
  return (
    <div className="text-center">
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="border-b-2 border-dashed border-gray-700 dark:border-white">
              Filters{" "}
              <FontAwesomeIcon
                icon={open ? faAngleUp : faAngleDown}
                className="ml-1"
              />
            </Disclosure.Button>
            <Disclosure.Panel className="mt-1.5 flex w-full flex-wrap justify-center gap-2">
              <PopoverPanel
                name="Genres"
                type="select"
                select={{ dataKey: "genres", filterName: "genres" }}
              />
              <PopoverPanel
                name="Studios"
                type="select"
                select={{ dataKey: "creators", filterName: "creators" }}
              />
              <PopoverPanel
                name="Statuses"
                type="select"
                select={{ dataKey: "statuses", filterName: "status" }}
              />
              <PopoverPanel
                name="Formats"
                type="select"
                select={{ dataKey: "formats", filterName: "format" }}
              />
              <PopoverPanel
                name="Scores"
                type="range"
                range={{ dataKey: "score" }}
              />
              <PopoverPanel
                name="Episodes Counts"
                type="range"
                range={{ dataKey: "count" }}
              />
              <PopoverPanel
                name="Release Years"
                type="range"
                range={{ dataKey: "release_year" }}
              />
              <PopoverPanel
                name="Start Years"
                type="range"
                range={{ dataKey: "start_year" }}
              />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
