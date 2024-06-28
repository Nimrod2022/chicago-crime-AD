"use client"



import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";

function MapComponent() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
 

  useEffect(() => {
    if (mapContainer.current) {
      const map = new Map({
        target: mapContainer.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([-87.6298, 41.8781]), // Longitude, Latitude
          zoom: 5,
        }),
      });

      // Clean up the map instance on component unmount
      return () => {
        map.setTarget(undefined);
      };
    }
  }, []);

  return <div ref={mapContainer} className="map"></div>;
}

export default MapComponent;
