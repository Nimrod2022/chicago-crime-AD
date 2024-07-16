"use client";

import CrimeFilterForm from "@/components/CrimeFilterForm";
import MapComponent from "@/components/MapComponent";
import { TotalCrimesChart } from "@/components/TotalCrimesCharts";
import Image from "next/image";
import { useCrimeContext } from "@/contexts/CrimeDataContext";
import { CrimeTrendChart } from "@/components/CrimeTrendChart";
import { ArrestsBarChart } from "@/components/ArrestsBarChart";
import { DomesticCrimesChart } from "@/components/DomesticCrimesChart";

export default function Home() {
  const { filteredData } = useCrimeContext();
  return (
    <main>
      <div className="h-screen">
        <div className="flex">
          <div className="flex-1">
            <MapComponent />
          </div>

          <div className="w-[50%] h-full">
            <div className="h-[30%]">
              <nav className="w-full h-[50%]">
                <div className="flex justify-between px-5 py-3 shadow-md h-full">
                  <h1 className="md:text-xl font-semibold flex text-[#3615FF] items-center gap-x-1.5">
                    <Image
                      src="/logo-block.png"
                      alt="logo"
                      width={20}
                      height={20}
                      className=""
                    />
                    CCW
                  </h1>
                  <ul className="flex text-lg text-[#898B8C] gap-5">
                    <li>About</li>
                    <li>Feedback</li>
                  </ul>
                </div>
              </nav>
              <div className="h-[50%]">
                <CrimeFilterForm />
              </div>
            </div>

            <div className="h-[70%]">
              {filteredData && (
                <div className="h-full">
                  <div className="flex w-full pt-5 h-1/2">
                    <div className="w-[50%] h-full">
                      <TotalCrimesChart />
                    </div>

                    <div className="w-[50%] h-full">
                      <ArrestsBarChart />
                    </div>
                  </div>
                  <div className="flex h-1/2">
                    <div className="w-[50%] h-full">
                      <CrimeTrendChart />
                    </div>
                    <div className="w-[50%] h-full">
                      <DomesticCrimesChart />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
