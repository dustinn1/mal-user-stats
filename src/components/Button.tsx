import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Props = {
  text: string;
  size: "sm" | "lg";
  icon?: IconDefinition;
  active?: boolean;
  onClick?: () => void;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Button({ text, size, icon, active, onClick }: Props) {
  return (
    <button
      className={classNames(
        size === "sm" ? "py-1.5 px-3" : "py-2 px-4",
        active
          ? `bg-gray-700 text-white`
          : `hover:bg-gray-700 hover:text-white transition-colors`,
        "border border-gray-700 inline-block rounded-md mx-1"
      )}
      onClick={onClick}
    >
      <div
        className={classNames(
          size === "sm" ? "text-sm" : "",
          "flex items-center gap-2 justify-center"
        )}
      >
        {icon && <FontAwesomeIcon icon={icon} />}
        <span>{text}</span>
      </div>
    </button>
  );
}
