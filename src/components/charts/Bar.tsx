import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
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

ChartJS.register(CategoryScale, LinearScale, BarElement);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 55,
    },
  },
  scales: {
    xAxes: {
      ticks: {
        color: "#000",
        font: {
          size: 14,
        },
      },
    },
    yAxes: {
      ticks: {
        color: "#000",
        font: {
          size: 14,
        },
        padding: 10,
      },
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
    },
  },
};

export default function BarChart({ width, height, data, keys }: Props) {
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
      <Bar
        width={width}
        height={height}
        data={chartData}
        options={options}
        plugins={[ChartDataLabels]}
      />
    </div>
  );
}
