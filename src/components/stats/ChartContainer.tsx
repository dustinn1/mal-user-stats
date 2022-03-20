import { useState } from "react";
import LineChart from "../charts/Line";
import BarChart from "../charts/Bar";
import PieChart from "../charts/Pie";
import Button from "../Button";
import {
  faArrowDown19,
  faDivide,
  faClock,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import Table from "../Table";
import { Disclosure, Transition } from "@headlessui/react";

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
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
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
                height={width ?? 250}
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
                <div className="pl-1">
                  <Disclosure.Button>
                    <Button
                      size="sm"
                      icon={open ? faAngleUp : faAngleDown}
                      text={open ? "Hide Table" : "Show Table"}
                    />
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Transition
              enter="transition-all ease-in duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-all ease-out duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Disclosure.Panel>
                <Table data={data} dataIndex={xKey} />
              </Disclosure.Panel>
            </Transition>
          </div>
        </>
      )}
    </Disclosure>
  );
}
