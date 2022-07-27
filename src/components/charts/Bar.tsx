import { useContext, useMemo } from "react";
import { StatCardsContext } from "../../contexts/cards/StatCardsContext";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import type { StatArray } from "../../interfaces/stats";
import prettyMs from "pretty-ms";

type Props = {
  width?: number | string;
  height?: number | string;
};

Chart.register(CategoryScale, LinearScale, BarElement);

export default function BarChart({ width = "100%", height = 300 }: Props) {
  const { statsData, sort } = useContext(StatCardsContext);

  const options = useMemo(() => {
    return {
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
              weight: "700",
            },
          },
        },
        yAxes: {
          display: false,
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
            return sort === "length"
              ? prettyMs(value * 1000, {
                  unitCount: 2,
                })
              : value;
          },
        },
      },
    };
  }, [sort]);

  const chartData = useMemo(() => {
    const data = statsData.length > 20 ? statsData.slice(0, 20) : statsData;
    return {
      labels: data.map((d) => d.name),
      datasets: [
        {
          label: "name",
          data: data.map((d) => d[sort as keyof StatArray]),
          backgroundColor: "rgb(55, 65, 81)",
          borderRadius: 5,
        },
      ],
    };
  }, [sort, statsData]);

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
