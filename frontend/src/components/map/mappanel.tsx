import { useEffect, useRef } from "react";
import type { Map } from "leaflet";

import { useAppContext } from "../../context/appcontext";
import { useRoadSegments } from "../../hooks/useroadsegments";

import MapView from "./mapview";

import { renderRoadSegments } from "./renderers/roadsegmentrenderer";
import { renderSelectedRoadSegment } from "./renderers/selectedroadsegmentrenderer";
import { focusRoadSegment } from "./viewport/focusroadsegment";

import { enableRoadSegmentDrawing } from "./interactions/drawroadsegment";

export default function MapPanel() {

    const mapRef = useRef<Map | null>(null);

    const {

        selectedODDId,

        selectedRoadSegmentId,

        setSelectedRoadSegmentId,

        toolMode,

        pendingEntity,

        setEditorOpen,

        setToolMode,

    } = useAppContext();

    const {

        roadSegments,

    } = useRoadSegments(
        selectedODDId
    );

    // =========================
    // Render all Road Segments
    // =========================

    useEffect(() => {

        if (!mapRef.current) return;

        renderRoadSegments(

            mapRef.current,

            roadSegments,

            setSelectedRoadSegmentId,

        );

    }, [

        roadSegments,

        setSelectedRoadSegmentId,

    ]);

    // =========================
    // Selected Road Segment
    // =========================

    useEffect(() => {

        if (!mapRef.current) return;

        if (selectedRoadSegmentId == null) return;

        const road = roadSegments.find(

            road =>
                road.id === selectedRoadSegmentId

        );

        if (!road) return;

        focusRoadSegment(

            mapRef.current,

            road,

        );

        renderSelectedRoadSegment(

            mapRef.current,

            road,

        );

    }, [

        selectedRoadSegmentId,

        roadSegments,

    ]);

    // =========================
    // Drawing
    // =========================

    useEffect(() => {

        if (!mapRef.current) return;

        if (!selectedODDId) return;

        if (!pendingEntity) return;

        enableRoadSegmentDrawing(

            mapRef.current,

            toolMode === "draw_road_segment",

            {

                oddId: selectedODDId,

                pendingEntity: pendingEntity as {

                    name: string;

                    description: string;

                    road_type: string;

                    surface_type: string;

                    direction: string;

                    speed_limit_kph: number | null;

                },

                setSelectedRoadSegmentId,

                setEditorOpen,

                setToolMode,

            }

        );

    }, [

        toolMode,

        selectedODDId,

        pendingEntity,

        setSelectedRoadSegmentId,

        setEditorOpen,

        setToolMode,

    ]);

    return (

        <MapView

            onMapReady={(map) => {

                mapRef.current = map;

            }}

        />

    );

}