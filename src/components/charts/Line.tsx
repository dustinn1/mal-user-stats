import { useContext, useMemo } from "react";
import { StatCardsContext } from "../../contexts/cards/StatCardsContext";
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
import type { StatArray } from "../../interfaces/stats";
import prettyMs from "pretty-ms";

type Props = {
  width?: number | string;
  height?: number | string;
};

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

export default function LineChart({ width = "100%", height = 300 }: Props) {
  const { statsData, sort } = useContext(StatCardsContext);

  const options = useMemo(() => {
    return {
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
    const data = statsData.slice(0, 20);
    return {
      labels: data.map((d) => d.name),
      datasets: [
        {
          label: "name",
          data: data.map((d) => d[sort as keyof StatArray]),
          backgroundColor: "rgba(229, 231, 235, 0.65)",
          pointBackgroundColor: "rgb(55, 65, 81)",
          borderColor: "rgb(55, 65, 81)",
          fill: true,
          tension: 0.25,
          pointRadius: 5,
        },
      ],
    };
  }, [sort, statsData]);

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
