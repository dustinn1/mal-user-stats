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
        <div className="mx-3 mt-5 xl:container xl:mx-auto">
          <h1 className="mb-4 border-b-2 border-black pb-3 text-4xl font-bold dark:border-white">
            Generate Stats
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="MyAnimeList Username"
                minLength={2}
                maxLength={16}
                className="h-12 w-full appearance-none rounded-md border border-gray-400 bg-white py-2 px-4 outline-0 duration-100 ease-linear placeholder:text-gray-500 focus:border-blue-900 dark:border-gray-500 dark:bg-black dark:placeholder:text-gray-400 dark:focus:border-blue-400 lg:h-auto"
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
