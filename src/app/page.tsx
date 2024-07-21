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
        <div className="h-screen">
          <div className="flex">
            <div className="flex-1">
              <MapComponent />
            </div>

            <div className="w-[50%] h-full">
              <div className="h-[25%]">
                <nav className="w-full h-[50%]">
                  <div className="flex justify-between px-5 py-3 shadow-md h-full">
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
                    <ul className="flex text-lg text-[#898B8C] gap-5">
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
                  <div className="h-[50%]">
                    <CrimeFilterForm />
                  </div>
                )}
              </div>

              <div className="h-[70%]">
                {showContact ? (
                  <div>
                    <Contact />
                  </div>
                ) : (
                  filteredData && (
                    // <div className="h-full pt-5">
                    //   <div className="h-1/2 ">
                    //     <div className="flex w-full ">
                    //       <div className="w-[50%] h-full border-r-2 border-t-2 ">
                    //         <TotalCrimesChart />
                    //       </div>

                    //       <div className="w-[50%] border-t-2 h-full">
                    //         <ArrestsBarChart />
                    //       </div>
                    //     </div>
                    //   </div>

                    //   <hr className=""/>

                    //   <div className=" h-1/2 ">
                    //     <div className="flex">
                    //       <div className="w-[50%] border-r-2 border-b-2  h-full">
                    //         <CrimeTrendChart />
                    //       </div>
                    //       <div className="w-[50%] border-b-2  h-full">
                    //         <DomesticCrimesChart />
                    //       </div>
                    //     </div>
                    //   </div>
                    // </div>
                    <div className="h-full pt-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-4 sm:grid-rows-2 h-full">
                        <div className="border-r-0 sm:border-r-2 border-t-2 border-b-2 sm:border-b-0">
                          <TotalCrimesChart />
                        </div>
                        <div className="border-t-2 border-b-2 sm:border-b-0">
                          <ArrestsBarChart />
                        </div>
                        <div className="border-r-0 sm:border-r-2 border-b-2 border-t-0 sm:border-t-2">
                          <CrimeTrendChart />
                        </div>
                        <div className="border-b-2 border-t-0 sm:border-t-2">
                          <DomesticCrimesChart />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
