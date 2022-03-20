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
    <div
      className={classNames(
        size === "sm" ? "py-1.5 px-3" : "py-2 px-4",
        active
          ? `bg-gray-700 text-white`
          : `transition-colors hover:bg-gray-700 hover:text-white`,
        "mx-1 inline-block rounded-md border border-gray-700"
      )}
      onClick={onClick}
    >
      <div
        className={classNames(
          size === "sm" ? "text-sm" : "",
          "flex items-center justify-center gap-2"
        )}
      >
        {icon && <FontAwesomeIcon icon={icon} />}
        <span>{text}</span>
      </div>
    </div>
  );
}
