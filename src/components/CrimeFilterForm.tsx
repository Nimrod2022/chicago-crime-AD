"use client";
import React, { useEffect, useState } from "react";
import { CrimeFilterFormProps } from "../../types";

const CrimeFilterForm: React.FC<CrimeFilterFormProps> = ({
  availableYears,
  availableDistricts,
  availableOffenseTypes,
  onFilter,
}) => {
  const [year, setYear] = useState<number>(2019);
  const [district, setDistrict] = useState<string>("AUSTIN");
  const [offenseType, setOffenseType] = useState<string>("ARSON");

  useEffect(() => {
    // Set the default values if they are present in the available options
    if (availableYears.length > 0) setYear(availableYears[0]);
    if (availableDistricts.length > 0) setDistrict(availableDistricts[0]);
    if (availableOffenseTypes.length > 0)
      setOffenseType(availableOffenseTypes[0]);
  }, [availableYears, availableDistricts, availableOffenseTypes]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFilter(year, district, offenseType);
  };

  return (
    <form onSubmit={handleSubmit} className="crime-filter-form">
      <div className="form-group">
        <label>
          Year:
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="form-group">
        <label>
          District:
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            {availableDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="form-group">
        <label>
          Offense Type:
          <select
            value={offenseType}
            onChange={(e) => setOffenseType(e.target.value)}
          >
            {availableOffenseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit" className="filter-button">
        Filter
      </button>
    </form>
  );
};

export default CrimeFilterForm;
