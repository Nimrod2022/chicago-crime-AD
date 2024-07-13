"use client";

import { useCrimeContext } from "@/contexts/CrimeDataContext";
import { useEffect, useState } from "react";
import { ChartDataType } from "../../types";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function TotalCrimesChart() {
  const { currentYear, selectedDistrict, filteredData } = useCrimeContext();
  const [chartData, setChartData] = useState<ChartDataType[]>([]);

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
        { type: "Assault", Count: assaultCount },
        { type: "Battery", Count: batteryCount },
        { type: "Theft", Count: theftCount },
        { type: "Burglary", Count: burglaryCount },
        { type: "Sex", Count: sexOffenseCount },
      ]);
    }
  }, [filteredData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md">
          Total Crimes Breakdown {currentYear}
        </CardTitle>
        {/* <CardDescription>{currentYear}</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}

           
            
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="type"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis dataKey="Count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="Count"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
              barSize={40}
              
              
            >
              {/* <LabelList
                dataKey="Count"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              /> */}
              <LabelList
                dataKey="type"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
