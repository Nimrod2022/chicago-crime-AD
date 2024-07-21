"use client";

import { Pie, PieChart, LabelList, Tooltip, Cell } from "recharts";
import { useState, useEffect } from "react";
import { useCrimeContext } from "@/contexts/CrimeDataContext";
import { DomesticDataType } from "../../types";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  
  
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,

  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

const chartConfig = {
  Domestic: {
    label: "Domestic",
    color: "hsl(var(--chart-4))",
  },
  NotDomestic: {
    label: "None-domestic",
    color: "hsl(var(--chart-7))",
  },
} satisfies ChartConfig;

export function DomesticCrimesChart() {
  const { currentYear, crimeData, selectedDistrict } = useCrimeContext();
  const [chartData, setChartData] = useState<
    { name: string; value: number; fill: string }[]
  >([]);

  const getCrimeTrend = (domestic: boolean, year: number) => {
    return (
      crimeData?.features?.filter(
        (feature) =>
          feature.properties.domestic === domestic &&
          feature.properties.year === year &&
          feature.properties.district_name.trim().toLowerCase() ===
            selectedDistrict.toLowerCase()
      ).length || 0
    );
  };

  useEffect(() => {
    if (crimeData) {
      const domesticCount = getCrimeTrend(true, currentYear);
      const nonDomesticCount = getCrimeTrend(false, currentYear);

      const data = [
        {
          name: chartConfig.Domestic.label,
          value: domesticCount,
          fill: chartConfig.Domestic.color,
        },
        {
          name: chartConfig.NotDomestic.label,
          value: nonDomesticCount,
          fill: chartConfig.NotDomestic.color,
        },
      ];

      setChartData(data);
    }
  }, [crimeData, currentYear, selectedDistrict]);

  // console.log(chartData);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-md">Domestic Vs. None domestic</CardTitle>
        <CardDescription className="text-sm italic text-center px-5">
          {`A breakdown of domestic and none domestic crimes in ${currentYear}.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[236px]"
        >
          <PieChart>
            <Tooltip content={<ChartTooltipContent nameKey="name" />} />
            <Pie data={chartData} dataKey="value" nameKey="name">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <LabelList
                dataKey="name"
                position="inside"
                fill="#000"
                stroke="none"
                fontSize={12}
                formatter={(value: string) => value}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
