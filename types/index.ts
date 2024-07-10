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

export interface CrimeDataProps {
  type: string;
  features: Array<{
    properties: {
      Year: number;
      "Primary Type": string;
      "District Name": string;
    };
  }>;
}

export interface CountFeatureProps {
  properties: {
    year: number;
    district_name: string;
    type: string;
  };
}