import { useState } from "react";
import LineChart from "./Line";
import BarChart from "./Bar";
import PieChart from "./Pie";
import Button from "../Button";
import {
  faArrowDown19,
  faDivide,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  height?: number;
  width?: number;
  type: "line" | "bar" | "pie";
  data: any[];
  xKey: string;
  name: string;
};

export default function ChartContainer({
  height,
  width,
  type,
  data,
  xKey,
  name,
}: Props) {
  const [ykey, setYKey] = useState("count");

  return (
    <div className="px-7 pb-5 my-5 bg-gray-100 rounded-lg">
      {type === "line" && (
        <LineChart
          width={height ?? 500}
          height={width ?? 250}
          data={data}
          keys={{ x: xKey, y: ykey }}
        />
      )}
      {type === "bar" && (
        <BarChart
          width={height ?? 500}
          height={width ?? 250}
          data={data}
          keys={{ x: xKey, y: ykey }}
        />
      )}
      {type === "pie" && (
        <PieChart
          width={height ?? 500}
          height={width ?? 300}
          data={data}
          keys={{ x: xKey, y: ykey }}
        />
      )}
      <div className="flex justify-between items-center px-3 pt-3">
        <h1 className="text-2xl">{name}</h1>
        <div>
          <Button
            onClick={() => setYKey("count")}
            size="sm"
            icon={faArrowDown19}
            text="Count"
            active={ykey === "count"}
          />
          <Button
            onClick={() => setYKey("mean_score")}
            size="sm"
            icon={faDivide}
            text="Mean Score"
            active={ykey === "mean_score"}
          />
          <Button
            onClick={() => setYKey("time_watched")}
            size="sm"
            icon={faClock}
            text="Time Watched"
            active={ykey === "time_watched"}
          />
        </div>
      </div>
    </div>
  );
}
