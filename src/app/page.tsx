"use client";

import CrimeFilterForm from "@/components/CrimeFilterForm";
import { MapComponent } from "../components";
import CrimeCategories from "@/components/TotalCrimes";
import TotalCrimes from "@/components/TotalCrimes";

export default function Home() {
  // async function fetchCrimeCategories() {
  //   const response = await fetch("/api/crimeCategoriesAPI", {
  //     next: { revalidate: 60 },
  //   });

  //   if (!response.ok) {
  //     throw new Error("Failed to fetch data");
  //   }

  //   const data = await response.json();
  //   return data;
  // }

  // const data = fetchCrimeCategories()

  return (
    <main>
      <div className="flex">
        <div className="flex-1">
          <MapComponent />
        </div>

        <div className="w-[30%]">
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
