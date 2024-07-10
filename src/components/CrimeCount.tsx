"use client";
import React from "react";

// Define types for the fetched data
interface CrimeCountData {
  totalCrimes: number;
}

interface CrimeCountProps {
  data: CrimeCountData | null;
  loading: boolean;
  error: string | null;
}

const CrimeCount: React.FC<CrimeCountProps> = ({ data, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div>
      <h2>Results</h2>
      <p>Total Crimes: {data ? data.totalCrimes : "No data available"}</p>
    </div>
  );
};

export default CrimeCount;
