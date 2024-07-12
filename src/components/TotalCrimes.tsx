"use client";

import { useCrimeContext } from "@/contexts/CrimeDataContext";

const TotalCrimes = () => {
  const { filteredData } = useCrimeContext();
 

  return (
    <div>
      {filteredData && (
        <p>Total Crimes: {filteredData ? filteredData.length : 0}</p>
      )}
    </div>
  );
};

export default TotalCrimes;
