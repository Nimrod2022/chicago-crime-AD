import { ChangeEvent, FormEvent, useState } from "react";
import { availableYears, chicagoDistricts, crimeTypes } from "../../constants";
import { useCrimeContext } from "@/contexts/CrimeDataContext";

function CrimeFilterForm() {

  const {getFilteredData} = useCrimeContext()

  
  const [currentYear, setCurrentYear] = useState<number>(availableYears[0]);
  const [currentDistrict, setCurrentDistrict] = useState<string>(chicagoDistricts[0]);
  // const [currentCrimeType, setCurrentCrimeType] = useState<string>(
  //   crimeTypes[0]
  // );

  //   Handle form submission
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    getFilteredData(currentYear, currentDistrict)
    
  }

  return (
    <div className="pt-5">
      <form onSubmit={handleSubmit} className="flex gap-x-2">
        <div>
          {/* <label className="font-semibold text-xl" htmlFor="year-select">
            Year:
          </label> */}
          <select
            id="year-select"
            name="year"
            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
            value={currentYear}
          >
            {availableYears.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          {/* <label htmlFor="district-select">District</label> */}
          <select
            name="district"
            id="district-select"
            onChange={(e) => setCurrentDistrict(e.target.value)}
            value={currentDistrict}
          >
            {chicagoDistricts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* <div>
          <label htmlFor="district-select">District</label>
          <select
            name="crime-type"
            id="crime-type-select"
            onChange={(e) => setCurrentCrimeType(e.target.value)}
            value={currentCrimeType}
          >
            {crimeTypes.map((crime, index) => (
              <option key={index} value={crime}>
                {crime}
              </option>
            ))}
          </select>
        </div> */}

        <button type="submit">Filter</button>
      </form>
    </div>
  );
}

export default CrimeFilterForm;
