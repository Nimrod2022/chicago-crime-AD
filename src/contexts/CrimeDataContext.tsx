"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { fetchData } from "../../utils";
import {
  ApiResponseProps,
  CrimeContextProps,
  CrimeFeatureProps,
  DistrictStatistics,
} from "../../types";

// Creating context
const CrimeContext = createContext<CrimeContextProps | undefined>(undefined);

// Provider's props
interface CrimeProviderProps {
  children: ReactNode;
}

// Interface for crime properties
interface CrimeProperties {
  type: string;
  district_name: string;
  [key: string]: any;
}

// Interface for a crime feature
interface CrimeFeature {
  properties: CrimeProperties;
}

// Type for counting occurrences of crime types
type CrimeTypeCounts = Record<string, number>;

// Crime provider component
export const CrimeProvider: React.FC<CrimeProviderProps> = ({ children }) => {
  const [crimeData, setCrimeData] = useState<ApiResponseProps | null>(null); 
  const [filteredData, setFilteredData] = useState<CrimeFeatureProps[] | null>(
    null
  ); // State to store filtered crime data
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 
  const [selectedDistrict, setSelectedDistrict] = useState<string>(""); 
  const [currentYear, setCurrentYear] = useState<number>(2023); 
  const [currentDistrict, setCurrentDistrict] =
    useState<string>("Select District"); 

  // Fetch crime data on component mount
  useEffect(() => {
    const getCrimeData = async () => {
      try {
        const data: ApiResponseProps = await fetchData(
          "https://geoserver22s.zgis.at/geoserver/IPSDI_WT23/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IPSDI_WT23%3Achicago_crimes&maxFeatures=100000&outputFormat=application%2Fjson"
        );
        setCrimeData(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message || "An unknown error occurred");
        setLoading(false);
      }
    };
    getCrimeData();
  }, []);

  // Function to filter data by year and district
  const getFilteredData = useCallback(
    (year: number, district: string) => {
      setCurrentYear(year);
      setSelectedDistrict(district);

      if (crimeData && district) {
        const newData = crimeData.features.filter(
          (crime) =>
            crime.properties.year === year &&
            crime.properties.district_name.trim().toLowerCase() ===
              district.trim().toLowerCase()
        );
        setFilteredData(newData);
      }
    },
    [crimeData]
  );

  // Function to convert a string to title case
  const toTitleCase = useCallback((str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, []);

  // Function to set the current district filter based on a map selection
  const setDistrictFilterMap = useCallback(
    (district: string) => {
      const formattedName = toTitleCase(district);

      if (formattedName !== currentDistrict) {
        setCurrentDistrict(formattedName);
        setSelectedDistrict(formattedName);
      }
    },
    [currentDistrict, toTitleCase]
  );

  // Function to get statistics for a district
  const getDistrictStatistics = useCallback(
    (district: string): DistrictStatistics | null => {
      if (!crimeData) {
        return null;
      }

      const formattedDistrict = district.trim().toLowerCase();
      const districtCrimes = crimeData.features.filter((crime) => {
        return (
          crime.properties.district_name.trim().toLowerCase() ===
          formattedDistrict
        );
      });

      const totalCrimes = districtCrimes.length;
      const arrests = districtCrimes.filter(
        (crime) => crime.properties.arrest === true
      ).length;
      const arrestRate = totalCrimes > 0 ? (arrests / totalCrimes) * 100 : 0;

      return { totalCrimes, arrestRate };
    },
    [crimeData]
  );

  // Get the most common crime type in a district
  const getMostCommonCrimeType = useCallback(
    (district: string): string | null => {
      if (!crimeData) return null;

      const districtCrimes = crimeData.features.filter(
        (crime) =>
          crime.properties.district_name.trim().toLowerCase() ===
          district.trim().toLowerCase()
      );

      const crimeTypeCounts: CrimeTypeCounts = districtCrimes.reduce(
        (acc: CrimeTypeCounts, crime: CrimeFeature) => {
          const crimeType: string = crime.properties.type;
          acc[crimeType] = (acc[crimeType] || 0) + 1;
          return acc;
        },
        {}
      );

      const mostCommonCrimeType = Object.keys(crimeTypeCounts).reduce(
        (a, b) => (crimeTypeCounts[a] > crimeTypeCounts[b] ? a : b),
        ""
      );

      return mostCommonCrimeType;
    },
    [crimeData]
  );

  // Get tcrime trend in a district
  const getCrimeTrend = useCallback(
    (district: string) => {
      if (!crimeData) return null;

      const currentYearCrimes = crimeData.features.filter(
        (crime) =>
          crime.properties.year === currentYear &&
          crime.properties.district_name.trim().toLowerCase() ===
            district.trim().toLowerCase()
      ).length;

      const previousYearCrimes = crimeData.features.filter(
        (crime) =>
          crime.properties.year === currentYear - 1 &&
          crime.properties.district_name.trim().toLowerCase() ===
            district.trim().toLowerCase()
      ).length;

      if (currentYearCrimes > previousYearCrimes) {
        return "Increasing";
      } else if (currentYearCrimes < previousYearCrimes) {
        return "Decreasing";
      } else {
        return "Stable";
      }
    },
    [crimeData, currentYear]
  );

  // Memoizing to optimize performance
  const contextValue = useMemo(
    () => ({
      crimeData,
      loading,
      error,
      getFilteredData,
      filteredData,
      currentYear,
      setCurrentYear,
      selectedDistrict,
      currentDistrict,
      setCurrentDistrict,
      toTitleCase,
      setDistrictFilterMap,
      getDistrictStatistics,
      getMostCommonCrimeType,
      getCrimeTrend,
    }),
    [
      crimeData,
      loading,
      error,
      getFilteredData,
      filteredData,
      currentYear,
      selectedDistrict,
      currentDistrict,
      toTitleCase,
      setDistrictFilterMap,
      getDistrictStatistics,
      getMostCommonCrimeType,
      getCrimeTrend,
    ]
  );

  return (
    <CrimeContext.Provider value={contextValue}>
      {children}
    </CrimeContext.Provider>
  );
};

// Hook to use the CrimeContext
export const useCrimeContext = (): CrimeContextProps => {
  const context = useContext(CrimeContext);
  if (context === undefined) {
    throw new Error("useCrimeContext must be used within a CrimeProvider");
  }
  return context;
};
