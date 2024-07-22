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
import About from "@/components/About";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";

export default function Home() {
  const [showContact, setShowContact] = useState(false);
  const [showAbout, setShowAbout] = useState(true); 

  const handleFeedbackClick = () => {
    setShowContact(true);
    setShowAbout(false);
  };

  const handleCWWClick = () => {
    setShowContact(false);
    setShowAbout(false);
  };

  const handleAboutClick = () => {
    setShowAbout(true);
    setShowContact(false);
  };

  const { filteredData, loading } = useCrimeContext();

  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      setShowAbout(false);
    }
  }, [filteredData]);

  return (
    <main>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex overflow-hidden">
          <div className="flex-1">
            <MapComponent />
          </div>

          <div className="w-full sm:w-[50%] h-full flex flex-col">
            <div className="flex-shrink-0">
              <nav className="w-full bg-white">
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
                    <li onClick={handleAboutClick} className="cursor-pointer">
                      About
                    </li>
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
              ) : showAbout ? (
                <div className="h-full">
                  <About />
                </div>
              ) : (
                filteredData && (
                  <div className="h-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 h-full">
                      <div className="border-r-0 md:border-r-[1.5px] border-t-[1.5px] border-b-[1.5px] md:border-b-0">
                        <TotalCrimesChart />
                      </div>
                      <div className="border-t-[1.5px] border-b-[1.5px] md:border-b-0">
                        <DomesticCrimesChart />
                      </div>

                      <div className="border-r-0 md:border-r-[1.5px] border-b-[1.5px] border-t-0 md:border-t-[1.5px]">
                        <CrimeTrendChart />
                      </div>
                      <div className="border-b-[1.5px] border-t-0 md:border-t-[1.5px]">
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
