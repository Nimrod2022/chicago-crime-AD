import React, { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import Overlay from "ol/Overlay";
import Feature from "ol/Feature";
import { useCrimeContext } from "@/contexts/CrimeDataContext";
import { Geometry } from "ol/geom";
import { fetchData } from "../../utils";

const BOUNDARIES_URL =
  "https://chicago-crime-24.s3.eu-north-1.amazonaws.com/chicago.geojson";

function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const popupContainer = useRef<HTMLDivElement>(null);
  const [boundaries, setBoundaries] = useState(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [popupTimeout, setPopupTimeout] = useState<NodeJS.Timeout | null>(null);

  const {
    crimeData,
    loading,
    getDistrictStatistics,
    currentYear,
    currentDistrict,
    filteredData,
    getFilteredData,
    setCurrentDistrict,
    setDistrictFilterMap,
  } = useCrimeContext();

  let selectedFeature: Feature<Geometry> | null = null;

  // Fetch boundaries data
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

  // Initialize map
  useEffect(() => {
    if (
      mapContainer.current &&
      boundaries &&
      crimeData &&
      !loading &&
      !mapInitialized
    ) {
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
          center: fromLonLat([-87.71284816007186, 41.952044724238746]),
          zoom: 11.5,
        }),
      });

      const overlay = new Overlay({
        element: popupContainer.current
          ? popupContainer.current
          : document.createElement("div"),
        autoPan: true,
      });
      map.addOverlay(overlay);

      // Show popup mouse hover
      map.on("pointermove", function (evt) {
        if (!crimeData) return;
        if (map.hasFeatureAtPixel(evt.pixel)) {
          const feature = map.getFeaturesAtPixel(evt.pixel)[0];
          const districtName = feature.get("community");

          if (popupContainer.current) {
            const stats = getDistrictStatistics(districtName);
            const content = `
              <div style="text-align: center;">
                <strong style="font-size: 1rem;">${districtName}</strong><br/>
                Total Crimes: ${stats ? stats.totalCrimes : "N/A"}<br/>
                Arrest Rate: ${stats ? stats.arrestRate.toFixed(2) : "N/A"}%
              </div>
            `;
            overlay.setPosition(evt.coordinate);
            popupContainer.current.innerHTML = content;
            overlay.setElement(popupContainer.current);

            if (popupTimeout) {
              clearTimeout(popupTimeout);
            }
            const timeout = setTimeout(() => {
              overlay.setPosition(undefined);
            }, 10000); 
            setPopupTimeout(timeout);
          }
        } else {
          overlay.setPosition(undefined);
        }
      });

      // Select feature onclick
       map.on("singleclick", function (evt) {
         if (map.hasFeatureAtPixel(evt.pixel)) {
           const feature = map.getFeaturesAtPixel(
             evt.pixel
           )[0] as Feature<Geometry>;
           const districtName = feature.get("community");

           if (districtName && districtName !== currentDistrict) {
             setDistrictFilterMap(districtName);
            //  setCurrentDistrict(districtName)

             if (selectedFeature) {
               selectedFeature.setStyle(undefined);
             }
            //  feature.setStyle(selectedStyle);
             selectedFeature = feature;
           }
         }
       });

      setMapInitialized(true);
    }
  }, [boundaries]);

  // useEffect(() => {
  //   if (currentDistrict && currentYear) {
  //     getFilteredData(currentYear, currentDistrict);
  //   }
  // }, []);

  return (
    <div>
      <div ref={mapContainer} className="map"></div>
      <div ref={popupContainer} className="bg-white p-2 rounded-xl">
        <div className="w-[250px]"></div>
      </div>
    </div>
  );
}

export default MapComponent;
