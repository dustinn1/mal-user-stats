import { useState, FormEvent, SyntheticEvent } from "react";
import FetchData from "../components/stats/FetchData";
import { useRouter } from "next/router";

export default function Generate() {
  const router = useRouter();
  const { username } = router.query;

  const [value, setValue] = useState((username as string) ?? "");
  const [show, setShow] = useState((username as string) !== undefined);

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
      {!show ? (
        <div className="mt-5 px-3">
          <h1 className="text-3xl font-bold">Generate Stats</h1>
          <p className="mb-3 mt-2">
            Enter the username of the MyAnimeList profile
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="MyAnimeList username"
                minLength={2}
                maxLength={16}
                className="h-12 w-full appearance-none rounded-md border border-gray-400 bg-white py-2 px-4 outline-0 duration-100 ease-linear focus:border-blue-900 dark:border-gray-500 dark:bg-black dark:focus:border-blue-400 lg:h-auto"
              />
              <input
                type="submit"
                value="Submit"
                className="mx-1 inline-block cursor-pointer rounded-md border border-gray-700 py-2 px-4 hover:bg-gray-700 hover:text-white dark:bg-gray-800 dark:hover:bg-gray-500"
              />
            </div>
          </form>
        </div>
      ) : (
        <FetchData username={value} />
      )}
    </>
  );
}
