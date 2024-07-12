"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { fetchData } from "../../utils";
import {
  ApiResponseProps,
  CrimeContextProps,
  CrimeFeatureProps,
} from "../../types";

// Context
const CrimeContext = createContext<CrimeContextProps | undefined>(undefined);

// Provider component
interface CrimeProviderProps {
  children: ReactNode;
}

export const CrimeProvider: React.FC<CrimeProviderProps> = ({ children }) => {
  const [crimeData, setCrimeData] = useState<ApiResponseProps | null>(null);
  const [filteredData, setFilteredData] = useState<CrimeFeatureProps[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
    const [currentYear, setCurrentYear] = useState<number>(2019);


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

  // Filter data

  function getFilteredData(year: number, district: string) {
    if (crimeData) {
      const filteredData = crimeData.features.filter(
        (crime) =>
          crime.properties.year === year &&
          crime.properties.district_name.trim().toLowerCase ===
            district.trim().toLowerCase
      );
      console.log("Filtered data", filteredData);
      setFilteredData(filteredData);
    }
  }

  const setDistrictFilterMap = (district: string) => {
    setSelectedDistrict(district);
    getFilteredData(currentYear, district);
  };

  // console.log("Crime Data", crimeData)

  return (
    <CrimeContext.Provider
      value={{ crimeData, loading, error, getFilteredData, filteredData, currentYear, setCurrentYear, setDistrictFilterMap, selectedDistrict }}
    >
      {children}
    </CrimeContext.Provider>
  );
};

// Hook for easy context consumption
export const useCrimeContext = (): CrimeContextProps => {
  const context = useContext(CrimeContext);
  if (context === undefined) {
    throw new Error("useCrimeContext must be used within a CrimeProvider");
  }
  return context;
};
