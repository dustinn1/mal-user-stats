import { useState } from "react";
import LineChart from "../charts/Line";
import BarChart from "../charts/Bar";
import PieChart from "../charts/Pie";
import Button from "../Button";
import {
  faArrowDown91,
  faDivide,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { StatArray } from "../../interfaces/stats";

type Props = {
  width?: number | string;
  height?: number | string;
  type: "line" | "bar" | "pie";
  data: StatArray[];
  xKey: string;
  name: string;
};

export default function ChartContainer({
  width,
  height,
  type,
  data,
  xKey,
  name,
}: Props) {
  const [ykey, setYKey] = useState("count");

  return (
    <div className="my-5 rounded-lg bg-gray-100 px-7">
      {type === "line" && (
        <LineChart
          width={width ?? "100%"}
          height={height ?? 300}
          data={data}
          keys={{ x: xKey, y: ykey }}
        />
      )}
      {type === "bar" && (
        <BarChart
          width={height ?? "100%"}
          height={width ?? 300}
          data={data}
          keys={{ x: xKey, y: ykey }}
        />
      )}
      {type === "pie" && (
        <PieChart
          width={height ?? "100%"}
          height={width ?? 300}
          data={data}
          keys={{ x: xKey, y: ykey }}
        />
      )}
      <div className="flex items-center justify-between px-3 py-5">
        <h1 className="text-2xl font-bold">{name}</h1>
        <div className="flex divide-x divide-gray-500">
          <div className="pr-1">
            <Button
              onClick={() => setYKey("count")}
              size="sm"
              icon={faArrowDown91}
              text="Count"
              active={ykey === "count"}
            />
            <Button
              onClick={() => setYKey("time_watched")}
              size="sm"
              icon={faClock}
              text="Time Watched"
              active={ykey === "time_watched"}
            />
            <Button
              onClick={() => setYKey("mean_score")}
              size="sm"
              icon={faDivide}
              text="Mean Score"
              active={ykey === "mean_score"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
