export interface BoundaryDataProps {
  type: string;
  features: Array<{
    type: string;
    properties: {
      pri_neigh: string;
    };
    geometry: {
      type: string;
      coordinates: number[][][];
    };
  }>;
}


export interface CrimeFilterFormProps {
  availableYears: number[];
  availableDistricts: string[];
  availableOffenseTypes: string[];
  onFilter: (year: number, district: string, offenseType: string) => void;
}

// Define the shape of the properties object
interface CrimePropertiesProps {
  block: string;
  type: string;
  arrest: boolean;
  domestic: boolean;
  district_id: number;
  xcoordinate: number;
  ycoordinate: number;
  year: number;
  latitude: number;
  longitude: number;
  district_name: string;
}

// Define the shape of each crime feature
export interface CrimeFeatureProps {
  type: string;
  id: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  geometry_name: string;
  properties: CrimePropertiesProps;
}

// // Define the shape of the API response
// interface ApiResponse {
//   type: string;
//   features: CrimeFeatureProps[];
// }

// Define the shape of the API response
export interface ApiResponseProps {
  type: string;
  features: CrimeFeatureProps[];
  totalFeatures: number;
  numberMatched: number;
  numberReturned: number;
  timeStamp: string;
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
}


// Define the context type
export interface CrimeContextProps {
  crimeData: ApiResponseProps | null;
  filteredData: CrimeFeatureProps[] | null;
  loading: boolean;
  error: string | null;
  getFilteredData: (year: number, district: string) => void;
  currentYear: number;
  setCurrentYear: (year: number) => void;
  setDistrictFilterMap: (district: string) => void;
  selectedDistrict: string;
  currentDistrict: string;
  setCurrentDistrict: (district: string) => void;
  toTitleCase: (district: string) => void;
  getDistrictStatistics: (district: string) => DistrictStatistics | null;
  getCrimeTrend: (district: string) => string | null;
  getMostCommonCrimeType: (district: string) => string | null;
}

export interface TotalCrimesChartDataType {
  type: string;
  Count: number;
  fill: string
}

export interface YearDataType {
  year: number;
  Assault: number;
  Battery: number;
  Theft: number;
  Burglary: number;
  SexOffense: number;
}

// Arrest data type
export interface ArrestsDataType {
  year: number;
  Arrested: number;
  NoArrest: number;
}

// Domestic chart data types
export interface DomesticDataType {
  year: number;
  Domestic: number;
  NotDomestic: number;
}

export interface DistrictStatistics{
  totalCrimes: number
  arrestRate: number
}















