import { useState, useContext, useEffect, memo } from "react";
import { FilterContext } from "../../../contexts/FilterContext";
import { FilterCategories } from "../../../interfaces/filters";
import { Range, getTrackBackground } from "react-range";
import { StatArray } from "../../../interfaces/stats";

type Props = {
  name: FilterCategories;
  data: StatArray[];
};

export default memo(function FilterRange({ name, data }: Props) {
  const filter = useContext(FilterContext);

  const dataRange = data.map((e) => e.name);
  const min: number = parseInt(dataRange[0]);
  const max: number = parseInt(dataRange[dataRange.length - 1]);
  const [values, setValues] = useState([min, max]);

  useEffect(() => {
    if (filter.filters.length === 0) {
      setValues([min, max]);
    }
  }, [filter.filters.length, max, min]);

  return (
    <div className="rounded-md bg-white px-3.5 pb-5 pt-2.5">
      <div className="mb-2.5 flex justify-between">
        <span className="font-bold capitalize">
          {name.replaceAll("_", " ")}
        </span>
        <span>
          {values[0]} - {values[1]}
        </span>
      </div>
      <Range
        values={values}
        min={min}
        max={max}
        onChange={(values) => {
          setValues(values);
        }}
        onFinalChange={(values) => {
          if (values.toString() === [min, max].toString()) {
            filter.removeFilter(name);
          } else if (
            filter.filters.find((filter) => filter.category === name)
          ) {
            filter.updateFilter(name, "range", values.toString());
          } else {
            filter.addFilter(name, "range", values.toString());
          }
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
            }}
            className="flex w-full"
          >
            <div
              ref={props.ref}
              style={{
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#548BF4", "#ccc"],
                  min: min,
                  max: max,
                }),
              }}
              className="h-1.5 w-full self-center rounded-md"
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
            }}
            className="h-5 w-5 rounded-full border border-gray-400 bg-white"
          ></div>
        )}
      />
    </div>
  );
});
