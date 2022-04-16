import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StatArray } from "../../backend/src/interfaces/animeStats";

type Props = {
  data: StatArray[];
  name: "genres" | "studios" | "statuses" | "formats";
  addFilter(
    category: "genres" | "studios" | "statuses" | "formats",
    action: "includes" | "excludes",
    value: string
  ): void;
};

export default function FilterSelect({ data, name, addFilter }: Props) {
  return (
    <div className="h-80 divide-y divide-black overflow-y-scroll bg-white px-4 py-2">
      {data
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((prop) => (
          <div key={prop.id} className="flex justify-between py-1">
            <span>{prop.name}</span>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faCheck}
                className="cursor-pointer text-green-500"
                onClick={() => addFilter(name, "includes", prop.name)}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className="cursor-pointer text-red-500"
                onClick={() => addFilter(name, "excludes", prop.name)}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
