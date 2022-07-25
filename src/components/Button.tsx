import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  text: string;
  size: "xs" | "sm" | "lg";
  startIcon?: IconDefinition;
  endIcon?: IconDefinition;
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
  startIcon,
  endIcon,
  active,
  disabled,
  dropdown,
  onClick,
}: Props) {
  return (
    <div
      className={classNames(
        size === "xs" ? "py-1 px-2.5 text-sm" : "",
        size === "sm" ? "py-1.5 px-3" : "",
        size === "lg" ? "py-2 px-4" : "",
        active ? "bg-gray-700 text-white dark:bg-gray-500" : "",
        disabled
          ? "cursor-not-allowed opacity-40"
          : "hover:bg-gray-700 hover:text-white dark:bg-gray-800 dark:hover:bg-gray-500",
        "inline-block cursor-pointer select-none rounded-md border border-gray-700"
      )}
      onClick={!disabled ? onClick : undefined}
    >
      <div
        className={classNames(
          size === "sm" ? "text-sm" : "",
          "flex items-center justify-center gap-2 whitespace-nowrap"
        )}
      >
        {startIcon && <FontAwesomeIcon icon={startIcon} />}
        <span className="truncate">{text}</span>
        {endIcon && <FontAwesomeIcon icon={endIcon} />}
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
