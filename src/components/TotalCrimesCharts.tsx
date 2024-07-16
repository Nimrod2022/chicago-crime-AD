"use client";

import { useCrimeContext } from "@/contexts/CrimeDataContext";
import { useEffect, useState } from "react";
import { TotalCrimesChartDataType } from "../../types";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";

const chartConfig = {
  Assault: {
    label: "Assault",
    color: "hsl(var(--chart-1))",
  },
  Battery: {
    label: "Battery",
    color: "hsl(var(--chart-2))",
  },
  Sex: {
    label: "Sex Offense",
    color: "hsl(var(--chart-3))",
  },
  Theft: {
    label: "Theft",
    color: "hsl(var(--chart-4))",
  },
  Burglary: {
    label: "Burglary",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function TotalCrimesChart() {
  const { currentYear, selectedDistrict, filteredData } = useCrimeContext();
  const [chartData, setChartData] = useState<TotalCrimesChartDataType[]>([]);

  //  Fetch crime category data
  const getCrimeCount = (crimeType: string) => {
    return (
      filteredData?.filter(
        (feature) =>
          feature.properties.type.toLowerCase() === crimeType.toLowerCase() &&
          feature.properties.year === currentYear &&
          feature.properties.district_name.trim().toLowerCase() ===
            selectedDistrict.toLowerCase()
      ).length || 0
    );
  };

  useEffect(() => {
    if (filteredData) {
      const assaultCount = getCrimeCount("assault");
      const theftCount = getCrimeCount("battery");
      const batteryCount = getCrimeCount("theft");
      const burglaryCount = getCrimeCount("burglary");
      const sexOffenseCount = getCrimeCount("sex offense");

      // Update the chart data state
      setChartData([
        {
          type: "Assault",
          Count: assaultCount,
          fill: chartConfig.Assault.color,
        },
        {
          type: "Battery",
          Count: batteryCount,
          fill: chartConfig.Battery.color,
        },
        { type: "Theft", Count: theftCount, fill: chartConfig.Theft.color },
        {
          type: "Burglary",
          Count: burglaryCount,
          fill: chartConfig.Burglary.color,
        },
        {
          type: "Sex Offense",
          Count: sexOffenseCount,
          fill: chartConfig.Sex.color,
        },
      ]);
    }
  }, [filteredData]);

  return (
    <div className="w-[35%]">
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-md">{`${selectedDistrict} - ${currentYear}`}</CardTitle>
          {/* <CardDescription>January - June 2024</CardDescription> */}
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="Count"
                nameKey="type"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {filteredData?.length.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Crimes
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              {/* <ChartLegend
                content={<ChartLegendContent nameKey="type" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              /> */}
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
