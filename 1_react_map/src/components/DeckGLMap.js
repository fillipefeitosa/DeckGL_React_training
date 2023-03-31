import React, { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";
import StaticMap from "react-map-gl";

// Load the environment variables

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmlsbGlwZWZlaXRvc2EiLCJhIjoiY2xmYmU5ZWYxMDluZTN4cGc3eWdkaHVldyJ9.1Z41aUSR_H-f-SfMqlMZQQ";

// Maps settings

const initialViewState = {
  longitude: -8.031006,
  latitude: 39.12215,
  zoom: 6.6,
  minZoom: 5,
  maxZoom: 15,
  pitch: 40.5,
  bearing: -17,
};

// Function to generate dummy data
const { booleanPointInPolygon } = require("@turf/turf");

const generateDummyData = async (count) => {
  const data = [];

  // Fetch Portugal Polygon from an API
  const response = await fetch(
    "https://nominatim.openstreetmap.org/search.php?q=portugal&polygon_geojson=1&format=jsonv2"
  );
  const geojson = await response.json();
  const portugalPolygon = geojson[0].geojson;

  for (let i = 0; i < count; i++) {
    let longitude, latitude, isWithinPortugal;

    // Generate random points until a point within Portugal is found
    do {
      longitude = -9 + Math.random() * 2.2;
      latitude = 37.6 + Math.random() * 6.2;
      const point = { type: "Point", coordinates: [longitude, latitude] };
      isWithinPortugal = booleanPointInPolygon(point, portugalPolygon);
    } while (!isWithinPortugal);

    data.push({
      id: i,
      longitude,
      latitude,
    });
  }

  return data;
};

//  DeckGL component
const DeckGLMap = ({ mapStyle = MAP_STYLE }) => {
  const [viewState, setViewState] = useState(initialViewState);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(generateDummyData(1000));
  }, []);

  const layers = [
    new ScatterplotLayer({
      id: "scatter",
      data,
      getPosition: (d) => [d.longitude, d.latitude],
      getRadius: 1000,
      getFillColor: [255, 0, 0],
    }),
  ];

  return (
    <DeckGL
      layers={layers}
      initialViewState={initialViewState}
      controller={true}
      onViewStateChange={({ viewState }) => setViewState(viewState)}
    >
      <StaticMap
        reuseMaps
        mapStyle={mapStyle}
        preventStyleDiffing={true}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      />
    </DeckGL>
  );
};

export default DeckGLMap;
