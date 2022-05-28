import { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../../contexts/FilterContext";
import { Range, getTrackBackground } from "react-range";

type Props = {
  name: "score" | "count" | "release_year" | "start_year";
};

export default function FilterRange({ name }: Props) {
  const { ranges, setRanges, initialRanges, removeFilter, addFilter } =
    useContext(FilterContext);

  const [minMax] = useState(initialRanges[name]);
  const [values, setValues] = useState(ranges[name]);

  useEffect(() => {
    setValues(ranges[name]);
  }, [ranges, name]);

  return (
    <div className="rounded-md bg-white px-3.5 pb-5 pt-2.5">
      <div className="mb-2.5 flex justify-between">
        <span className="font-bold capitalize">
          {name.replaceAll("_", " ")}
        </span>
        <span className="flex items-center">
          {minMax.toString() !== values.toString() && (
            <span
              className="mr-2 cursor-pointer text-blue-500 hover:text-blue-600"
              onClick={() => {
                setRanges({ [name]: minMax });
                removeFilter(name);
                setValues(minMax);
              }}
            >
              Reset
            </span>
          )}
          {values[0]} - {values[1]}
        </span>
      </div>
      <Range
        values={values}
        min={minMax[0]}
        max={minMax[1]}
        onChange={(values) => {
          setValues(values);
        }}
        onFinalChange={(values) => {
          setRanges({ [name]: values });
          if (values.toString() === [0, 10].toString()) {
            removeFilter(name);
          } else {
            addFilter(name, "range", values.toString());
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
                  min: minMax[0],
                  max: minMax[1],
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
}
