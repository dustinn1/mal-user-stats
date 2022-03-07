import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Props = {
  text: string;
  size: "sm" | "lg";
  icon: IconDefinition;
  active?: boolean;
};

export default function Button({ text, size, icon, active }: Props) {
  return (
    <button
      className={`border border-gray-700 inline-block rounded-md ${
        size === "sm" ? "py-1.5 px-3" : "py-2 px-4"
      } ${
        active
          ? "bg-gray-700 text-white"
          : "hover:bg-gray-700 hover:text-white transition-colors"
      }`}
    >
      <div
        className={`flex items-center gap-2 justify-center ${
          size === "sm" ? "text-sm" : ""
        }`}
      >
        {icon && <FontAwesomeIcon icon={icon} />}
        <span>{text}</span>
      </div>
    </button>
  );
}
