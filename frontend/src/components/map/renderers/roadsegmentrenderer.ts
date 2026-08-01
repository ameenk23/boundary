import { Polyline } from "leaflet";
import type { Map } from "leaflet";

import type { RoadSegment } from "../../../types/roadsegment";

let roadLines: Polyline[] = [];

export function renderRoadSegments(
    map: Map,
    roadSegments: RoadSegment[]
) {
    // Remove previously rendered roads
    roadLines.forEach(line => line.remove());
    roadLines = [];

    roadSegments.forEach(segment => {
        const geometry = JSON.parse(segment.geometry);

        if (geometry.type !== "LineString") {
            return;
        }

        const coordinates = geometry.coordinates.map(
            ([lng, lat]: [number, number]) => [lat, lng]
        );

        const line = new Polyline(coordinates, {
            color: "#1976d2",
            weight: 5,
        });

        line.addTo(map);

        roadLines.push(line);
    });
}