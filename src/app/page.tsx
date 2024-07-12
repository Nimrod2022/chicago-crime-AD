"use client";

import CrimeFilterForm from "@/components/CrimeFilterForm";
import { MapComponent } from "../components";
import TotalCrimes from "@/components/TotalCrimes";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="flex">
        <div className="flex-1">
          <MapComponent />
        </div>

        <div className="w-[40%]">
          <nav className="w-full ">
            <div className="flex justify-between px-5 py-3 shadow-md">
              <h1 className="md:text-xl font-semibold flex text-[#3615FF] items-center gap-x-1.5">
                <Image
                  src="/logo-block.png"
                  alt="logo"
                  width={20}
                  height={20}
                  className=""
                />{" "}
                CCW
              </h1>

              <ul className="flex text-lg text-[#898B8C] gap-5">
                <li>About</li>
                <li>Feedback</li>
              </ul>
            </div>
          </nav>

          <div>
            <CrimeFilterForm />
            <TotalCrimes />
          </div>
        </div>
      </div>
    </main>
  );
}
