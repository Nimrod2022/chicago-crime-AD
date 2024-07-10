"use client";
import React, { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import "ol/ol.css";
import { fetchData } from "../../utils";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import Overlay from "ol/Overlay";
import { BoundaryDataProps } from "../../types";

// constants

const BOUNDARIES_URL =
  "https://chicago-crime-24.s3.eu-north-1.amazonaws.com/boundaries.geojson";

// const CRIMES_URL =
//   "https://chicago-crime-24.s3.eu-north-1.amazonaws.com/crime_data.geojson";

function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const popupContainer = useRef<HTMLDivElement>(null);
  const [boundaries, setBoundaries] = useState(null);

  // fetch boundaries data
  useEffect(() => {
    const getBoundaries = async () => {
      try {
        const data = await fetchData(BOUNDARIES_URL);
        setBoundaries(data);
      } catch (error) {
        console.error("Error fetching boundaries:", error);
      }
    };
    getBoundaries();
  }, []);

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
      // Initialize map
      const map = new Map({
        target: mapContainer.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        view: new View({
          center: fromLonLat([-87.79585343500183, 41.851812904278674]),
          zoom: 11,
        }),
      });

      const overlay = new Overlay({
        element: popupContainer.current
          ? popupContainer.current
          : document.createElement("div"),
        autoPan: true,
      });
      map.addOverlay(overlay);
      // Show district name on mouse hover

      map.on("pointermove", function (evt) {
        if (map.hasFeatureAtPixel(evt.pixel)) {
          const feature = map.getFeaturesAtPixel(evt.pixel)[0];
          const districtName = feature.get("pri_neigh");
          if (popupContainer.current) {
            overlay.setPosition(evt.coordinate);
            popupContainer.current.innerHTML = districtName;
            overlay.setElement(popupContainer.current);
          }
        } else {
          overlay.setPosition(undefined);
        }
      });
      // Clean-up function
      return () => {
        map.setTarget(undefined);
      };
    }
  }, [boundaries]);

  return (
    <div>
      <div ref={mapContainer} className="map"></div>
      <div ref={popupContainer} className="ol-popup">
        <div className="ol-popup-content"></div>
      </div>
    </div>
  );
}

export default MapComponent;
