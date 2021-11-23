import { ComponentType, useEffect, useState } from "react";
import type { ColumnConfig } from "@ant-design/charts";
import dynamic from "next/dynamic";
import { RawIncident } from "../incidents";

interface MonthData {
  month: string;
  incidents: number;
}

const Column: ComponentType<ColumnConfig> = dynamic(
  () => import("@ant-design/charts").then((mod) => mod.Column),
  { ssr: false, loading: () => <div>loading...</div> }
);

export const Statistics: React.FC<{}> = () => {
  const [incidents, setIncidents] = useState<MonthData[]>([]);

  useEffect(() => {
    async function effect() {
      const res = await import("../../assets/app.json");
      const json = res.default as RawIncident[];
      const monthCounts = new Array(12).fill(0);
      for (let i = 0; i < json.length; i++) {
        const item = json[i];
        const date = new Date(item.date);
        monthCounts[date.getMonth()] += 1;
      }

      const incidents = [
        {
          month: "Jan",
          incidents: monthCounts[0],
        },
        {
          month: "Feb",
          incidents: monthCounts[1],
        },
        {
          month: "Mar",
          incidents: monthCounts[2],
        },
        {
          month: "Apr",
          incidents: monthCounts[3],
        },
        {
          month: "May",
          incidents: monthCounts[4],
        },
        {
          month: "Jun",
          incidents: monthCounts[5],
        },
        {
          month: "Jul",
          incidents: monthCounts[6],
        },
        {
          month: "Aug",
          incidents: monthCounts[7],
        },
        {
          month: "Sep",
          incidents: monthCounts[8],
        },
        {
          month: "Oct",
          incidents: monthCounts[9],
        },
        {
          month: "Nov",
          incidents: monthCounts[10],
        },
        {
          month: "Dec",
          incidents: monthCounts[11],
        },
      ];

      setIncidents(incidents);
    }

    effect();
  }, []);

  return (
    <div>
      <h1>Incidents per Month</h1>
      <Column
        {...{
          data: incidents,
          xField: "month",
          yField: "incidents",
          label: {
            position: "middle",
            style: {
              fill: "#FFFFFF",
              opacity: 0.6,
            },
          },
          xAxis: {
            label: {
              autoHide: true,
              autoRotate: false,
            },
          },
        }}
      />
    </div>
  );
};
