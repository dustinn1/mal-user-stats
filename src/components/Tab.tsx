import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Props = {
  name: string;
  icon?: IconDefinition;
  dropdown?: boolean;
  active?: boolean;
};

export default function Tab({ name, dropdown, active, icon }: Props) {
  return (
    <div
      className={`bg-gray-200 inline-block py-2 px-4 rounded-md ${
        active ? "bg-gray-700 text-white" : "hover:bg-gray-300"
      }`}
    >
      <div className="flex items-center gap-3 justify-center">
        {icon && <FontAwesomeIcon icon={icon} className="text-sm" />}
        <span>{name}</span>
        {dropdown && <FontAwesomeIcon icon={faCaretDown} className="text-sm" />}
      </div>
    </div>
  );
}
