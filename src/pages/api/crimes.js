// pages/api/crimes.js
import fetch from "node-fetch";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false, // Disable SSL verification (Development only)
});

export default async function handler(req, res) {
  const { year, district } = req.query;
  const geoserverUrl =
    "https://geoserver22s.zgis.at/geoserver/IPSDI_WT23/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IPSDI_WT23%3Achicago_crimes&maxFeatures=200000&outputFormat=application%2Fjson";

  try {
    const response = await fetch(geoserverUrl, { agent });
    if (!response.ok) {
      throw new Error("Failed to fetch data from GeoServer");
    }

    const data = await response.json();

    const totalCrimes = data.features.reduce((count, feature) => {
      if (
        feature.properties.year == year &&
        feature.properties.district_name === district
      ) {
        return count + 1;
      }
      return count;
    }, 0);

    res.status(200).json({ totalCrimes });
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
