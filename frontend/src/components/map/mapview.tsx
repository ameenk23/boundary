import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";

import type { RoadSegment } from "../../types/roadsegment";

import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";

interface MapViewProps {
    roadSegments: RoadSegment[];
}

export default function MapView({
    roadSegments,
}: MapViewProps) {

    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);

    useEffect(() => {

        if (!containerRef.current) return;
        if (mapRef.current) return;

        mapRef.current = new maplibregl.Map({
            container: containerRef.current,
            style: "https://demotiles.maplibre.org/style.json",
            center: [13.3041, 52.5074],
            zoom: 15,
        });

        mapRef.current.addControl(
            new maplibregl.NavigationControl(),
            "top-right"
        );

        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        };

    }, []);

    useEffect(() => {

        if (!mapRef.current) return;

        const map = mapRef.current;

        const featureCollection = {
            type: "FeatureCollection",
            features: roadSegments.map(segment => ({
                type: "Feature",
                geometry: JSON.parse(segment.geometry),
                properties: {
                    id: segment.id,
                    name: segment.name,
                },
            })),
        };

        if (!map.isStyleLoaded()) {
            map.once("load", () => updateRoadSegments(map, featureCollection));
            return;
        }

        updateRoadSegments(map, featureCollection);

    }, [roadSegments]);

    return (
        <div
            ref={containerRef}
            className="map-container"
        />
    );
}

function updateRoadSegments(
    map: maplibregl.Map,
    featureCollection: GeoJSON.FeatureCollection
) {

    const source = map.getSource("road-segments") as maplibregl.GeoJSONSource;

    if (!source) {

        map.addSource("road-segments", {
            type: "geojson",
            data: featureCollection,
        });

        map.addLayer({
            id: "road-segments",
            type: "line",
            source: "road-segments",
            paint: {
                "line-color": "#1976d2",
                "line-width": 4,
            },
        });

        return;
    }

    source.setData(featureCollection);
}