"use client";

import CrimeFilterForm from "@/components/CrimeFilterForm";
import MapComponent from "@/components/MapComponent";
import { TotalCrimesChart } from "@/components/TotalCrimesCharts";
import Image from "next/image";
import { useCrimeContext } from "@/contexts/CrimeDataContext";
import { CrimeTrendChart } from "@/components/CrimeTrendChart";
import { ArrestsBarChart } from "@/components/ArrestsBarChart";
import { DomesticCrimesChart } from "@/components/DomesticCrimesChart";
import Contact from "@/components/Contact";
import { useState } from "react";
import Spinner from "@/components/Spinner";

export default function Home() {
  const [showContact, setShowContact] = useState(false);

  const handleFeedbackClick = () => {
    setShowContact(true);
  };

  const handleCWWClick = () => {
    setShowContact(false);
  };

  const { filteredData, loading } = useCrimeContext();
  return (
    <main>
      {loading ? (
        <Spinner />
      ) : (
        <div className=" flex overflow-hidden">
          <div className="flex-1">
            <MapComponent />
          </div>

          <div className="w-full sm:w-[50%] h-full flex flex-col">
            <div className="flex-shrink-0">
              <nav className="w-full">
                <div className="flex justify-between px-5 py-2 shadow-md ">
                  <h1
                    onClick={handleCWWClick}
                    className="md:text-xl font-semibold flex text-[#3615FF] cursor-pointer items-center gap-x-1.5"
                  >
                    <Image
                      src="/logo-block.png"
                      alt="logo"
                      width={20}
                      height={20}
                    />
                    CCW
                  </h1>
                  <ul className="flex text-lg text-[#3615FF] gap-5">
                    <li
                      onClick={handleFeedbackClick}
                      className="cursor-pointer"
                    >
                      Feedback
                    </li>
                  </ul>
                </div>
              </nav>
              {!showContact && (
                <div className="h-full">
                  <CrimeFilterForm />
                </div>
              )}
            </div>

            <div className="flex-grow overflow-hidden">
              {showContact ? (
                <div className="h-full">
                  <Contact />
                </div>
              ) : (
                filteredData && (
                  <div className="h-full ">
                    <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 h-full">
                      <div className="border-r-0 md:border-r-2 border-t-2 border-b-2 md:border-b-0">
                        <TotalCrimesChart />
                      </div>
                      <div className="border-t-2 border-b-2 md:border-b-0">
                        <DomesticCrimesChart />
                      </div>

                      <div className="border-r-0 md:border-r-2 border-b-2 border-t-0 md:border-t-2">
                        <CrimeTrendChart />
                      </div>
                      <div className="border-b-2 border-t-0 md:border-t-2">
                        <ArrestsBarChart />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
