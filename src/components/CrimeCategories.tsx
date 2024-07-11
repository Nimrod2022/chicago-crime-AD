// components/CrimeCategories.tsx

"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "../../utils";

const CRIMES_URL =
  "https://geoserver22s.zgis.at/geoserver/IPSDI_WT23/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IPSDI_WT23%3Achicago_crimes&maxFeatures=50&outputFormat=application%2Fjson";

const CrimeCategories = () => {

  const [crimeCategories, setCrimeCategories] = useState()
  // fetch boundaries data
  useEffect(() => {
    const getCrimedata = async () => {
      try {
        const data = await fetchData(CRIMES_URL);
        setCrimeCategories(data);
      } catch (error) {
        console.error("Error fetching boundaries:", error);
      }
    };
    getCrimedata();
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(crimeCategories, null, 2)}</pre>
    </div>
  );
};

export default CrimeCategories;
