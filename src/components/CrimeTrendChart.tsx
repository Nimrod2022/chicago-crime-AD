"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useCrimeContext } from "@/contexts/CrimeDataContext";
import { chartConfig } from "../../constants";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { YearDataType } from "../../types";

chartConfig satisfies ChartConfig;

export function CrimeTrendChart() {
  const { currentYear, crimeData, selectedDistrict } = useCrimeContext();
  const [chartData, setChartData] = useState<YearDataType[]>([]);

  const getCrimeTrend = (crimeType: string, year: number) => {
    return (
      crimeData?.features?.filter(
        (feature) =>
          feature.properties.type.toLowerCase() === crimeType.toLowerCase() &&
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
      const crimeTypes = [
        "Assault",
        "Battery",
        "Theft",
        "Burglary",
        "Sex Offense",
      ];

      const data: YearDataType[] = years.map((year) => {
        const yearData: YearDataType = {
          year,
          Assault: 0,
          Battery: 0,
          Theft: 0,
          Burglary: 0,
          SexOffense: 0,
        };
        crimeTypes.forEach((type) => {
          yearData[type.replace(" ", "") as keyof YearDataType] = getCrimeTrend(
            type,
            year
          );
        });

        return yearData;
      });

      setChartData(data);
    }
  }, [crimeData, currentYear, selectedDistrict]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-md items-center text-center flex gap-x-1 justify-center">
            {`Crime Trend`} <TrendingUp className="h-4 w-4 text-[#7879f0]" />
          </CardTitle>
          <CardDescription className="text-xs  italic text-center px-10">{`Trend of each crime over time from 2019 - ${currentYear}.`}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="max-h-[230px] xl:max-h-[270px]"
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Assault"
                  stroke={chartConfig.Assault.color}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Battery"
                  stroke={chartConfig.Battery.color}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Theft"
                  stroke={chartConfig.Theft.color}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Burglary"
                  stroke={chartConfig.Burglary.color}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Sex Offense"
                  stroke={chartConfig.SexOffense.color}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
