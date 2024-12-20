
// import { NextApiRequest, NextApiResponse } from "next";
// import { ApiResponseProps } from "../../../types";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const response = await fetch(
//       "https://geoserver22s.zgis.at/geoserver/IPSDI_WT23/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IPSDI_WT23%3Achicago_crimes&maxFeatures=500&outputFormat=application%2Fjson"
//     );

//     if (!response.ok) {
//       console.error(`Error fetching data: ${response.statusText}`);
//       res.status(response.status).json({ message: "Failed to fetch data" });
//       return;
//     }

//     const data: ApiResponseProps = await response.json();
//     res.status(200).json(data);
//   } catch (err) {
//     console.error("Fetch error:", (err as Error).message);
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: (err as Error).message });
//   }
// }
