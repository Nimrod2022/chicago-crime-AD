import React, { useEffect, useState, useRef, useCallback } from "react";
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
    getMostCommonCrimeType,
    getCrimeTrend,
    currentYear,
    currentDistrict,
    getFilteredData,
    setDistrictFilterMap,
  } = useCrimeContext();

  type AnyFunction = (...args: any[]) => any;

  interface DebounceFunction<T extends AnyFunction> {
    (func: T, wait: number): (...args: Parameters<T>) => void;
  }

  let selectedFeature: Feature<Geometry> | null = null;

  const debounce: DebounceFunction<AnyFunction> = (func, wait) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<AnyFunction>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const getBoundaries = useCallback(async () => {
    try {
      const data = await fetchData(BOUNDARIES_URL);
      setBoundaries(data);
    } catch (error) {
      console.error("Error fetching boundaries:", error);
    }
  }, []);

  useEffect(() => {
    getBoundaries();
  }, [getBoundaries]);

  const handlePointerMove = useCallback(
    debounce((evt, map, overlay) => {
      if (!crimeData) return;
      if (map.hasFeatureAtPixel(evt.pixel)) {
        const feature = map.getFeaturesAtPixel(evt.pixel)[0];
        const districtName = feature.get("community");

        if (popupContainer.current) {
          const stats = getDistrictStatistics(districtName);
          const mostCommonCrimeType = getMostCommonCrimeType(districtName);
          const crimeTrend = getCrimeTrend(districtName);

          const content = `
                  <div class="bg-white shadow space-y-2 p-3 rounded-xl w-64">
                    <h1 class="text-center font-semibold text-md">${districtName}</h1>
                    <p class="text-sm">Crimes 2019-23: <span class="inline-block bg-yellow-200 text-black text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"> ${
                      stats ? stats.totalCrimes : "N/A"
                    }</span></p>
                    <div >
                      <p class="text-sm">Arrest Success: 
                        <span class="inline-block bg-green-200 text-black text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                          ${stats ? stats.arrestRate.toFixed(2) : "N/A"}%
                        </span>
                      </p>
                    </div>
                    <div class="text-sm">
                      Primary Crime: 
                      <span class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                        ${mostCommonCrimeType || "N/A"}
                      </span>
                    </div>
                    <div class="text-sm flex items-center space-x-2">
                      <p>Trend 2022-23:
                      <span class="inline-block bg-gray-200 text-black text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">

                      <span class="${
                        crimeTrend === "Increasing"
                          ? "text-red-500"
                          : crimeTrend === "Decreasing"
                          ? " text-green-500"
                          : "text-yellow-500"
                      }">
                        ${
                          crimeTrend === "Increasing"
                            ? "↑ Increasing"
                            : crimeTrend === "Decreasing"
                            ? "↓ Decreasing"
                            : "→ Stable"
                        }
                      
                      </span>
                      
                      </p>
                    </div>
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
          }, 7000);
          setPopupTimeout(timeout);
        }
      } else {
        overlay.setPosition(undefined);
      }
    }, 200),
    [
      crimeData,
      getDistrictStatistics,
      getMostCommonCrimeType,
      getCrimeTrend,
      popupTimeout,
    ]
  );

  const handleSingleClick = useCallback(
    debounce((evt, map) => {
      if (map.hasFeatureAtPixel(evt.pixel)) {
        const feature = map.getFeaturesAtPixel(
          evt.pixel
        )[0] as Feature<Geometry>;
        const districtName = feature.get("community");

        if (districtName && districtName !== currentDistrict) {
          setDistrictFilterMap(districtName);

          if (selectedFeature) {
            selectedFeature.setStyle(undefined);
          }
          selectedFeature = feature;
        }
      }
    }, 200),
    [currentDistrict, setDistrictFilterMap]
  );

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
        offset: [10, -30],
      });
      map.addOverlay(overlay);

      map.on("pointermove", (evt) => handlePointerMove(evt, map, overlay));
      map.on("singleclick", (evt) => handleSingleClick(evt, map));

      setMapInitialized(true);
    }
  }, [
    boundaries,
    crimeData,
    loading,
    mapInitialized,
    handlePointerMove,
    handleSingleClick,
  ]);

  useEffect(() => {
    if (currentDistrict && currentYear) {
      getFilteredData(currentYear, currentDistrict);
    }
  }, [getFilteredData]);

  return (
    <div>
      <div ref={mapContainer} className="map"></div>
      <div ref={popupContainer} className="">
        <div className="w-[250px]"></div>
      </div>
    </div>
  );
}

export default MapComponent;
