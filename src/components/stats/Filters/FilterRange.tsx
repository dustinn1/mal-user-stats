import { useContext, useEffect, useState, useMemo } from "react";
import { Range, getTrackBackground } from "react-range";
import { TitleCardsContext } from "../../../contexts/cards/TitleCardsContext";

type Props = {
  name: "score" | "count" | "release_year" | "start_year";
};

export default function FilterRange({ name }: Props) {
  const {
    listFilter: { ranges, setRanges, initialRanges, removeFilter, addFilter },
  } = useContext(TitleCardsContext);

  const [values, setValues] = useState(ranges[name]);

  useEffect(() => {
    setValues(ranges[name]);
  }, [ranges, name]);

  return (
    <div className="px-4 pb-5">
      <div className="mb-2.5 flex items-center justify-between">
        {values[0]} - {values[1]}
        {initialRanges[name].toString() !== values.toString() && (
          <span
            className="mr-2 cursor-pointer text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-300 dark:hover:text-blue-400"
            onClick={() => {
              setRanges({ [name]: initialRanges[name] });
              removeFilter(name);
              setValues(initialRanges[name]);
            }}
          >
            Reset
          </span>
        )}
      </div>
      <Range
        values={values}
        min={initialRanges[name][0]}
        max={initialRanges[name][1]}
        onChange={(values) => {
          setValues(values);
        }}
        onFinalChange={(values) => {
          setRanges({ [name]: values });
          if (values.toString() === initialRanges[name].toString()) {
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
                  min: initialRanges[name][0],
                  max: initialRanges[name][1],
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
