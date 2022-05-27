import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

type Props = {
  width: number | string;
  height: number | string;
  data: any[];
  keys: {
    x: string;
    y: string;
  };
};

Chart.register(CategoryScale, LinearScale, BarElement);

export default function BarChart({ width, height, data, keys }: Props) {
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
          /* callback: function (value: number | string) {
            return keys.y === "length"
              ? `${secondsToHours(value as number)} hrs`
              : value;
          }, */
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
        /* formatter: function (value: number) {
          return keys.y === "length" ? secondsToHours(value) : value;
        }, */
      },
    },
  };

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
    <div className="relative" style={{ height: height, width: width }}>
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
