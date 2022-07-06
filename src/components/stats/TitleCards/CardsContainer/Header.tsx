type Props = {
  data: {
    title: string;
    stats: {
      id: string;
      value: string | number | null;
    }[];
  };
};

export default function TitleCardsContainerHeader({ data }: Props) {
  return (
    <div className="mb-3 w-full rounded-lg border border-blue-600 bg-gray-100 pt-3 dark:bg-gray-800">
      <div className="mx-4 flex items-center justify-center font-bold">
        <span className="text-3xl">{data.title}</span>
      </div>
      <div className="mx-4 grid grid-cols-auto-fit py-2 text-center">
        {data.stats.map((stat) => {
          if (stat.value !== null) {
            return (
              <span className="text-center" key={stat.id}>
                <strong>{stat.value}</strong>
                <br /> {stat.id}
              </span>
            );
          }
        })}
      </div>
    </div>
  );
}
