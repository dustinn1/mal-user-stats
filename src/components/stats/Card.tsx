import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  name: string;
  rank: number;
  amount: number;
  average: number;
  time: string;
  covers: string[];
};

export default function Card({
  name,
  rank,
  amount,
  average,
  time,
  covers,
}: Props) {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div
      className="w-96 mx-2 mb-4 pt-3 border border-gray-500 rounded-lg"
      id={`card-${name}`}
    >
      <div className="flex items-center mx-4 mb-1.5 font-bold">
        <div className="bg-gray-700 text-white text-center rounded-full px-3 mr-2 py-1">
          # {rank}
        </div>
        <Link
          href={{
            pathname: `${router.pathname}/comedy`,
            query: { username: username },
          }}
        >
          <a className="text-3xl text-blue-500 hover:text-blue-600 hover:underline">
            {name}
          </a>
        </Link>
      </div>
      <div className="mx-4 mb-2 pb-2.5 border-b border-gray-700">
        <p>
          {amount} <strong>Animes</strong>
        </p>
        <p>
          {average} <strong>Average Score</strong>
        </p>
        <p>
          {time} <strong>Time Watched</strong>
        </p>
      </div>
      <div className="flex overflow-x-scroll mt-4 mb-0.5 pb-3.5">
        {covers.map((id) => (
          <div
            key={id}
            className="h-[120px] w-[80px] mx-1 first:ml-4 last:mr-4"
          >
            <Image
              src={`https://cdn.myanimelist.net/images/anime/${id}.webp`}
              alt="image"
              height={120}
              width={80}
              layout="fixed"
              className="rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
