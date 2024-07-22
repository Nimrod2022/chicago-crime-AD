"use client";

import { useCrimeContext } from "@/contexts/CrimeDataContext";
import { useEffect, useState } from "react";
import { TotalCrimesChartDataType } from "../../types";

import { chartConfig } from "../../constants";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

 chartConfig satisfies ChartConfig;

export function TotalCrimesChart() {
  const { currentYear, selectedDistrict, filteredData } = useCrimeContext();
  const [chartData, setChartData] = useState<TotalCrimesChartDataType[]>([]);

  //  Get crime category data
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

  console.log(filteredData)

  useEffect(() => {
    if (filteredData) {
      const assaultCount = getCrimeCount("assault");
      const theftCount = getCrimeCount("battery");
      const batteryCount = getCrimeCount("theft");
      const burglaryCount = getCrimeCount("burglary");
      const sexOffenseCount = getCrimeCount("sexOffense");

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
          type: "SexOffense",
          Count: sexOffenseCount,
          fill: chartConfig.SexOffense.color,
        },
      ]);
    }
  }, [filteredData]);

  // console.log("total crims,", chartData)

  return (
    <div>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-md ">{`Total Crimes Breakdown`}</CardTitle>
          <CardDescription className="text-center italic text-xs w-[90%]">
            {`A breakdown of total crimes committed in ${selectedDistrict} for ${currentYear}.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[190px] md:max-h-[230px]"
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

              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
