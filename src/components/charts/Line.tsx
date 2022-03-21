import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import secondsToHours from "date-fns/secondsToHours";

type Props = {
  width?: number | string;
  height?: number | string;
  data: any[];
  keys: {
    x: string;
    y: string;
  };
};

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

export default function LineChart({ width, height, data, keys }: Props) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 55,
        right: 35,
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
          padding: 20,
          callback: function (value: number | string) {
            return keys.y === "time_watched"
              ? `${secondsToHours(value as number)} hrs`
              : value;
          },
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
        formatter: function (value: number) {
          return keys.y === "time_watched" ? secondsToHours(value) : value;
        },
      },
    },
  };

  const chartData = {
    labels: data.map((d) => d[keys.x]),
    datasets: [
      {
        label: keys.x,
        data: data.map((d) => d[keys.y]),
        backgroundColor: "rgba(229, 231, 235, 0.65)",
        pointBackgroundColor: "rgb(55, 65, 81)",
        borderColor: "rgb(55, 65, 81)",
        fill: true,
        tension: 0.25,
        pointRadius: 5,
      },
    ],
  };

  return (
    <div className="relative" style={{ height: height, width: width }}>
      <Line
        width={width}
        height={height}
        data={chartData}
        options={options}
        plugins={[ChartDataLabels]}
      />
    </div>
  );
}
