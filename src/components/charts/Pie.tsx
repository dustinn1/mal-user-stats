import { Chart, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
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

Chart.register(ArcElement);

export default function PieChart({ width, height, data, keys }: Props) {
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
        /* formatter: function (value: number) {
          return keys.y === "time_watched"
            ? `${secondsToHours(value)} hrs`
            : value;
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
