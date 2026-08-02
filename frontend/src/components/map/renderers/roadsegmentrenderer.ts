import { Polyline } from "leaflet";
import type { Map } from "leaflet";

import type { RoadSegment } from "../../../types/roadsegment";

let roadLines: Polyline[] = [];

export function renderRoadSegments(
    map: Map,
    roadSegments: RoadSegment[],
    onRoadSegmentSelected: (id: number) => void,
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
            ([lng, lat]: [number, number]) =>
                [lat, lng] as [number, number]
        );

        const line = new Polyline(coordinates, {
            color: "#1976d2",
            weight: 5,
        });

        // Hover effect
        line.on("mouseover", () => {
            line.setStyle({
                weight: 7,
            });
        });

        line.on("mouseout", () => {
            line.setStyle({
                weight: 5,
            });
        });

        // Selection
        line.on("click", () => {
            onRoadSegmentSelected(segment.id);
        });

        line.addTo(map);

        roadLines.push(line);

    });

}