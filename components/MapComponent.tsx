"use client";
import React, { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import {GeoJSON }from "ol/format";
import "ol/ol.css";
import { fetchBoundaries } from "../utils";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import { Overlay } from "ol";

const BOUNDARIES_URL = "https://nimrod2022.github.io/data/boundaries.geojson";

function MapComponent() {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const [boundaries, setBoundaries] = useState(null);

  // Usind the fetch data function

  useEffect(() => {
    const getBoundaries = async () => {
      try {
        const data = await fetchBoundaries(BOUNDARIES_URL);
        console.log(data);
        setBoundaries(data);
      } catch (error) {
        console.error("Error fetching boundaries:", error);
      }
    };
    getBoundaries();
  }, []);

  // Setting up the map
  useEffect(() => {
    if (mapContainer.current && boundaries) {
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(boundaries, {
          featureProjection: "EPSG:3857",
        }),
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: new Style({
          stroke: new Stroke({
            color: "blue",
            width: 2,
          }),
          fill: new Fill({
            color: "rgba(0, 0, 255, 0.1)",
          }),
        }),
      });

      const map = new Map({
        target: mapContainer.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        view: new View({
          center: fromLonLat([-87.79585343500183, 41.851812904278674]), // Longitude, Latitude
          zoom: 11,
        }),
      });

      // Popup

    



      // Clean up the map instance on component unmount
      return () => {
        map.setTarget(undefined);
      };
    }
  }, [boundaries]);

  return <div ref={mapContainer} className="map"></div>;
}

export default MapComponent;
