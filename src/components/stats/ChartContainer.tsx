import { useState } from "react";
import LineChart from "../charts/Line";
import BarChart from "../charts/Bar";
import PieChart from "../charts/Pie";
import Button from "../Button";
import {
  faArrowDown19,
  faDivide,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Table from "../Table";

type Props = {
  width?: number | string;
  height?: number | string;
  type: "line" | "bar" | "pie";
  data: any[];
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
    <div className="px-7 pb-5 my-5 bg-gray-100 rounded-lg">
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
      <div className="flex justify-between items-center px-3 pt-5">
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
      <div className="mt-5">
        <Table data={data} dataIndex={xKey} />
      </div>
    </div>
  );
}
