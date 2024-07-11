"use client";

import { useCrimeContext } from "@/contexts/CrimeDataContext";

const TotalCrimes = () => {
  
  const { crimeCategories } = useCrimeContext();

  if (!crimeCategories) return null;

  const totalCrimes = crimeCategories.totalFeatures;

  return (
    <div>
      <p>Total Crimes: {totalCrimes}</p>
    </div>
  );
};

export default TotalCrimes;
