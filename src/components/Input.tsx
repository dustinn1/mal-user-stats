import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Input() {
  return (
    <input
      type="search"
      id="search"
      name="search"
      placeholder="Search"
      autoComplete="off"
      className="w-full rounded-lg border border-gray-600 py-1.5 px-3 outline-0  ring-blue-300 duration-200 ease-linear focus:border-blue-400 focus:ring-4 focus:transition-colors"
    />
  );
}
