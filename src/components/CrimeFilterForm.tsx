import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useEffect } from "react";

import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { CiLocationOn } from "react-icons/ci";
import { FormEvent } from "react";
import { availableYears, chicagoDistricts, crimeTypes } from "../../constants";
import { useCrimeContext } from "@/contexts/CrimeDataContext";

function CrimeFilterForm() {
  const {
    getFilteredData,
    currentYear,
    setCurrentYear,
    currentDistrict,
    setCurrentDistrict,
    selectedDistrict,
  } = useCrimeContext();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCurrentYear(currentYear);
    setCurrentDistrict(currentDistrict);
    getFilteredData(currentYear, currentDistrict);
  }

  useEffect(() => {
    if (selectedDistrict) {
      setCurrentDistrict(selectedDistrict);
      getFilteredData(currentYear, selectedDistrict);
    }
  }, [selectedDistrict]);

  return (
    <div className="py-3 px-5 justify-center items-center flex">
      <form onSubmit={handleSubmit} className="flex gap-x-10">
        <div className="">
          <Listbox value={currentYear} onChange={setCurrentYear}>
            <ListboxButton className="year__button">
              {currentYear}
              <ChevronDownIcon
                className="  size-7 fill-[#7879F1]"
                aria-hidden="true"
              />
            </ListboxButton>

            <ListboxOptions
              anchor="bottom"
              transition
              className="bg-white w-[115px] rounded-b-xl border-1 shadow-lg"
            >
              {availableYears.map((year, index) => (
                <ListboxOption
                  value={year}
                  key={year}
                  className={`filter__options group  ${
                    (index + 1) % 2 === 0
                      ? "border-b border-gray-200 border-opacity-60 "
                      : ""
                  }`}
                >
                  <CheckIcon className="check__icon" />

                  {year}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>

        <Listbox value={currentDistrict} onChange={setCurrentDistrict}>
          <ListboxButton className="district__button">
            <CiLocationOn className="text-[#7879F1] size-5" />

            {currentDistrict}
            <ChevronDownIcon
              className="  size-7 fill-[#7879F1]"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            className="bg-white w-[250px] rounded-b-xl border-1 shadow-lg"
          >
            {chicagoDistricts.map((district, index) => (
              <ListboxOption
                key={index}
                value={district}
                className={`filter__options group  ${
                  (index + 1) % 4 === 0
                    ? "border-b border-gray-200 border-opacity-60 "
                    : ""
                }`}
              >
                {district}
                <CheckIcon className="check__icon" />
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>

        {/* <button
          className="text-white w-[115px] h-[45px] px-5 py-2 bg-[#7879F1] rounded-xl"
          type="submit"
        >
          Filter
        </button> */}
      </form>
    </div>
  );
}

export default CrimeFilterForm;
