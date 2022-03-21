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
      className={`inline-block rounded-md py-2 px-4 ${
        active ? "bg-gray-700 text-white" : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      <div className="flex items-center justify-center gap-3">
        {icon && <FontAwesomeIcon icon={icon} className="text-sm" />}
        <span>{name}</span>
        {dropdown && <FontAwesomeIcon icon={faCaretDown} className="text-sm" />}
      </div>
    </div>
  );
}