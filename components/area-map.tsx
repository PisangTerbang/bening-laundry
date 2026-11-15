"use client";

import { IllustratedMap } from "@/components/illustrated-map";
import { map } from "@/lib/data";

export function AreaMap() {
  return (
    <IllustratedMap
      home={map.home}
      places={map.places}
      roads={map.roads}
      water={map.water}
      parks={map.parks}
      ring={{ r: 150, label: "Antar-jemput 3 km" }}
      travel="naik motor kurir"
      caption="Peta ilustrasi area antar-jemput Bening Laundry"
      theme={{
        land: "#f4f8fd",
        block: "#e6eef9",
        road: "#ffffff",
        roadEdge: "#cddbef",
        water: "#9cc3f5",
        park: "#d6ecdf",
        route: "#1543c8",
        pin: "#e8507f",
        pinInk: "#ffffff",
        place: "#1543c8",
        label: "#0f1c3f",
      }}
      className="rounded-[22px]"
      listClassName="p-1 sm:p-2"
      buttonClassName="rounded-2xl border-2 border-line bg-white px-3.5 py-2.5 font-bold transition-colors hover:border-cobalt/50"
      activeButtonClassName="!border-cobalt !bg-cobalt text-white"
    />
  );
}
