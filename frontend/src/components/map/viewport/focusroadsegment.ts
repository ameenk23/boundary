import type { Map } from "leaflet";
import type { RoadSegment } from "../../types/roadsegment";

export function focusRoadSegment(
    map: Map,
    roadSegment: RoadSegment
) {
    const geometry = JSON.parse(roadSegment.geometry);

    if (geometry.type !== "LineString") {
        return;
    }

    const coordinates = geometry.coordinates.map(
        ([lng, lat]: [number, number]) => [lat, lng]
    );

    map.fitBounds(coordinates, {
        padding: [40, 40],
        maxZoom: 18,
        animate: true,
    });
}