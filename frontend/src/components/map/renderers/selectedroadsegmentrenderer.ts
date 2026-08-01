import { Polyline } from "leaflet";
import type { Map } from "leaflet";

import type { RoadSegment } from "../../../types/roadsegment";

let selectedRoadLine: Polyline | null = null;

export function renderSelectedRoadSegment(
    map: Map,
    roadSegment: RoadSegment
) {
    // Remove previous highlight
    if (selectedRoadLine) {
        selectedRoadLine.remove();
    }

    const geometry = JSON.parse(roadSegment.geometry);

    if (geometry.type !== "LineString") {
        return;
    }

    const coordinates = geometry.coordinates.map(
        ([lng, lat]: [number, number]) => [lat, lng] as [number, number]
    );

    selectedRoadLine = new Polyline(coordinates, {
        color: "#ff9800",
        weight: 8,
    });

    selectedRoadLine.addTo(map);
}