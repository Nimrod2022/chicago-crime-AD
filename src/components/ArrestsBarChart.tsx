"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useCrimeContext } from "@/contexts/CrimeDataContext";
import { useState, useEffect } from "react";
import { ArrestsDataType } from "../../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  Arrested: {
    label: "Arrested",
    color: "hsl(var(--chart-2))",
  },
  NoArrest: {
    label: "No Arrest",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ArrestsBarChart() {
  const { currentYear, crimeData, selectedDistrict } = useCrimeContext();
  const [chartData, setChartData] = useState<ArrestsDataType[]>([]);

  const getCrimeTrend = (arrest: boolean, year: number) => {
    return (
      crimeData?.features?.filter(
        (feature) =>
          feature.properties.arrest === arrest &&
          feature.properties.year === year &&
          feature.properties.district_name.trim().toLowerCase() ===
            selectedDistrict.toLowerCase()
      ).length || 0
    );
  };

  useEffect(() => {
    if (crimeData) {
      // Data year list
      const years = Array.from(
        { length: currentYear - 2018 },
        (_, i) => 2019 + i
      );

      const data: ArrestsDataType[] = years.map((year) => {
        return {
          year,
          Arrested: getCrimeTrend(true, year),
          NoArrest: getCrimeTrend(false, year),
        };
      });

      setChartData(data);
    }
  }, [crimeData, currentYear, selectedDistrict]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md">Crime Arrests Bar Chart</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent hideLabel />} />
              <Legend content={<ChartLegendContent />} />
              <Bar
                dataKey="Arrested"
                stackId="a"
                fill={chartConfig.Arrested.color}
              />
              <Bar
                dataKey="NoArrest"
                stackId="a"
                fill={chartConfig.NoArrest.color}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
