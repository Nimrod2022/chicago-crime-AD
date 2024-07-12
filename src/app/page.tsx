"use client";

import CrimeFilterForm from "@/components/CrimeFilterForm";
import { MapComponent } from "../components";
import TotalCrimes from "@/components/TotalCrimes";

export default function Home() {


  return (
    <main>
      <div className="flex">
        <div className="flex-1">
          <MapComponent />
        </div>

        <div className="w-[40%]">
          <nav className="w-full bg-blue-200">
            <div className="flex justify-between px-5 py-3 shadow-md">
              <h1 className="md:text-xl font-semibold">CCC</h1>

              <ul className="flex gap-5">
                <li>Home</li>
                <li>About</li>
                <li>Feedback</li>
              </ul>
            </div>
          </nav>

          <div>
            <CrimeFilterForm />
            <TotalCrimes/>
          </div>
        </div>
      </div>
    </main>
  );
}
