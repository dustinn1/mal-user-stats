import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  text: string;
  size: "sm" | "lg";
  icon?: IconDefinition;
  active?: boolean;
  disabled?: boolean;
  dropdown?: boolean;
  onClick?: () => void;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Button({
  text,
  size = "lg",
  icon,
  active,
  disabled,
  dropdown,
  onClick,
}: Props) {
  return (
    <div
      className={classNames(
        size === "sm" ? "py-1.5 px-3" : "py-2 px-4",
        active ? "bg-gray-700 text-white dark:bg-gray-500" : "",
        disabled
          ? "cursor-not-allowed opacity-40"
          : "hover:bg-gray-700 hover:text-white dark:bg-gray-800 dark:hover:bg-gray-500",
        "mx-1 inline-block cursor-pointer select-none rounded-md border border-gray-700"
      )}
      onClick={!disabled ? onClick : undefined}
    >
      <div
        className={classNames(
          size === "sm" ? "text-sm" : "",
          "flex items-center justify-center gap-2 whitespace-nowrap"
        )}
      >
        {icon && <FontAwesomeIcon icon={icon} />}
        <span className="truncate">{text}</span>
        {dropdown && (
          <FontAwesomeIcon
            icon={active ? faCaretUp : faCaretDown}
            className="text-sm"
          />
        )}
      </div>
    </div>
  );
}
