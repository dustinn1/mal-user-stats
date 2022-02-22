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
      className="w-full border border-gray-600 rounded-lg py-1.5 px-3 outline-0  ring-blue-300 focus:border-blue-400 focus:ring-4 focus:transition-colors duration-200 ease-linear"
    />
  );
}
