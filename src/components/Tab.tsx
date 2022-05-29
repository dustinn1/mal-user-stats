import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { classNames } from "../utils/classNames";

type Props = {
  name: string;
  icon?: IconDefinition;
  dropdown?: boolean;
  active?: boolean;
};

export default function Tab({ name, dropdown, active, icon }: Props) {
  return (
    <div
      className={classNames(
        "truncate rounded-md py-2 px-4",
        dropdown
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : active
          ? "bg-gray-600 text-white"
          : "bg-gray-200 hover:bg-gray-300"
      )}
    >
      <div className="flex items-center justify-center gap-3">
        {icon && <FontAwesomeIcon icon={icon} className="text-sm" />}
        <span className="truncate">{name}</span>
        {dropdown && <FontAwesomeIcon icon={faCaretDown} className="text-sm" />}
      </div>
    </div>
  );
}
