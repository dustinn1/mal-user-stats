import LineChart from "./Line";
import BarChart from "./Bar";

type Props = {
  type: "line" | "bar";
};

export default function ChartContainer({ type }: Props) {
  return (
    <div className="my-5 rounded-lg border border-blue-600 bg-gray-100 px-5 py-3 xl:mx-7">
      {type === "line" && <LineChart />}
      {type === "bar" && <BarChart />}
    </div>
  );
}
