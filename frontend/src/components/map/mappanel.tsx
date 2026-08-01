import { useEffect, useRef } from "react";
import type { Map } from "leaflet";

import { useAppContext } from "../../context/appcontext";
import { useRoadSegments } from "../../hooks/useroadsegments";

import MapView from "./mapview";

import { renderRoadSegments } from "./renderers/roadsegmentrenderer";
import { renderSelectedRoadSegment } from "./renderers/selectedroadsegmentrenderer";

import { focusRoadSegment } from "../../map/viewport/focusroadsegment";

export default function MapPanel() {

    const mapRef = useRef<Map | null>(null);

    const {
        selectedODDId,
        selectedRoadSegmentId,
    } = useAppContext();

    const {
        roadSegments,
    } = useRoadSegments(selectedODDId);

    // Draw all road segments
    useEffect(() => {

        if (!mapRef.current) return;

        renderRoadSegments(
            mapRef.current,
            roadSegments
        );

    }, [roadSegments]);

    // Handle selection
    useEffect(() => {

        if (!mapRef.current) return;
        if (selectedRoadSegmentId == null) return;

        const road = roadSegments.find(
            road => road.id === selectedRoadSegmentId
        );

        if (!road) return;

        focusRoadSegment(
            mapRef.current,
            road
        );

        renderSelectedRoadSegment(
            mapRef.current,
            road
        );

    }, [
        selectedRoadSegmentId,
        roadSegments,
    ]);

    return (
        <MapView
            onMapReady={(map) => {
                mapRef.current = map;
            }}
        />
    );
}