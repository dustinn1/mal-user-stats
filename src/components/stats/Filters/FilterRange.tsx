import { useContext, useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { TitleCardsContext } from "../../../contexts/TitleCardsContext";

type Props = {
  name: "score" | "count" | "release_year" | "start_year";
};

export default function FilterRange({ name }: Props) {
  const {
    listFilter: { ranges, setRanges, initialRanges, removeFilter, addFilter },
  } = useContext(TitleCardsContext);

  const [minMax] = useState(initialRanges[name]);
  const [values, setValues] = useState(ranges[name]);

  useEffect(() => {
    setValues(ranges[name]);
  }, [ranges, name]);

  return (
    <div className="rounded-md bg-white px-4 pb-5 dark:bg-gray-700 ">
      <div className="mb-2.5 flex items-center justify-between">
        {values[0]} - {values[1]}
        {minMax.toString() !== values.toString() && (
          <span
            className="mr-2 cursor-pointer text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-300 dark:hover:text-blue-400"
            onClick={() => {
              setRanges({ [name]: minMax });
              removeFilter(name);
              setValues(minMax);
            }}
          >
            Reset
          </span>
        )}
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
          if (values.toString() === minMax.toString()) {
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
