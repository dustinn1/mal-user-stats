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
      className="h-full w-full rounded-md border border-gray-400 px-3 outline-0 duration-100 ease-linear focus:border-blue-900 focus:transition-colors"
    />
  );
}
