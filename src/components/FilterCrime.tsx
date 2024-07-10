"use client";
import React, { useEffect, useState } from "react";
import CrimeFilterForm from "./CrimeFilterForm";
import CrimeCount from "./CrimeCount";
import { CountFeatureProps } from "../../types";

function FilterCrime() {
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [availableOffenseTypes, setAvailableOffenseTypes] = useState<string[]>(
    []
  );
  const [data, setData] = useState<{ totalCrimes: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const geoserverUrl = `https://geoserver22s.zgis.at/geoserver/IPSDI_WT23/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IPSDI_WT23%3Achicago_crimes&maxFeatures=200000&outputFormat=application%2Fjson`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(geoserverUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const years = new Set<number>();
        const districts = new Set<string>();
        const offenseTypes = new Set<string>();

        data.features.forEach((feature: CountFeatureProps) => {
          years.add(feature.properties.year);
          districts.add(feature.properties.district_name);
          offenseTypes.add(feature.properties.type);
        });

        setAvailableYears(Array.from(years).sort());
        setAvailableDistricts(Array.from(districts).sort());
        setAvailableOffenseTypes(Array.from(offenseTypes).sort());
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const fetchCrimeData = async (
    year: number,
    district: string,
    offenseType: string
  ) => {
    try {
      setLoading(true);
      const response = await fetch(geoserverUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const totalCrimes = data.features.reduce((count, feature) => {
        if (
          feature.properties.year == year &&
          feature.properties.district_name === district &&
          feature.properties.type === offenseType
        ) {
          return count + 1;
        }
        return count;
      }, 0);

      setData({ totalCrimes });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <CrimeFilterForm
        availableDistricts={availableDistricts}
        availableOffenseTypes={availableOffenseTypes}
        availableYears={availableYears}
        onFilter={fetchCrimeData}
      />
      <CrimeCount data={data} loading={loading} error={error} />
    </div>
  );
}

export default FilterCrime;
