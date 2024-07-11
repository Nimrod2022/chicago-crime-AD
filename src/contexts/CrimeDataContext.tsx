"use client"

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { fetchData } from "../../utils";
import { ApiResponseProps, CrimeContextProps } from "../../types";

// Context
const CrimeContext = createContext<CrimeContextProps | undefined>(undefined);

// Provider component
interface CrimeProviderProps {
  children: ReactNode;
}

export const CrimeProvider: React.FC<CrimeProviderProps> = ({ children }) => {
  const [crimeCategories, setCrimeCategories] =
    useState<ApiResponseProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCrimeData = async () => {
      try {
        const data: ApiResponseProps = await fetchData(
          "https://geoserver22s.zgis.at/geoserver/IPSDI_WT23/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IPSDI_WT23%3Achicago_crimes&maxFeatures=50&outputFormat=application%2Fjson"
        );
        setCrimeCategories(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message || "An unknown error occurred");
        setLoading(false);
      }
    };
    getCrimeData();
  }, []);

  return (
    <CrimeContext.Provider value={{ crimeCategories, loading, error }}>
      {children}
    </CrimeContext.Provider>
  );
};

// Create a custom hook for easy context consumption
export const useCrimeContext = (): CrimeContextProps => {
  const context = useContext(CrimeContext);
  if (context === undefined) {
    throw new Error("useCrimeContext must be used within a CrimeProvider");
  }
  return context;
};
