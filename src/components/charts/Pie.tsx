import { Chart as ChartJS, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

type Props = {
  width: number;
  height: number;
  data: any[];
  keys: {
    x: string;
    y: string;
  };
};

ChartJS.register(ArcElement);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 40,
      bottom: 40,
    },
  },
  plugins: {
    datalabels: {
      backgroundColor: "#000",
      borderRadius: 4,
      color: "white",
      font: {
        weight: "bold" as const,
        size: 14,
      },
      padding: 6,
      align: "end" as const,
      anchor: "end" as const,
      offset: 8,
      //display: "auto" as const,
    },
  },
};

export default function PieChart({ width, height, data, keys }: Props) {
  const chartData = {
    labels: data.map((d) => d[keys.x]),
    datasets: [
      {
        label: keys.x,
        data: data.map((d) => d[keys.y]),
        backgroundColor: "rgb(55, 65, 81)",
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className="relative">
      <Pie
        width={width}
        height={height}
        data={chartData}
        options={options}
        plugins={[ChartDataLabels]}
      />
    </div>
  );
}
