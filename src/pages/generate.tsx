import { useState, FormEvent, SyntheticEvent } from "react";
import FetchData from "../components/stats/FetchData";

export default function Generate() {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    if (value.length > 1 && value.length < 17) {
      setShow(true);
    }
    event.preventDefault();
  };

  return (
    <>
      <p>Generate</p>
      {!show ? (
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <input
              type="text"
              value={value}
              onChange={handleChange}
              minLength={2}
              maxLength={16}
              className="h-8 w-full appearance-none rounded-md border border-gray-400 bg-white px-3 outline-0 duration-100 ease-linear focus:border-blue-900 focus:transition-colors lg:h-auto"
            />
            <input
              type="submit"
              value="Submit"
              className="mx-1 inline-block cursor-pointer rounded-md border border-gray-700 py-2 px-4 transition-colors hover:bg-gray-700 hover:text-white"
            />
          </div>
        </form>
      ) : (
        <FetchData username={value} />
      )}
    </>
  );
}
