import { useEffect } from "react";
import { useMap } from "react-leaflet";

import type { RoadSegment } from "../../types/roadsegment";

import { renderRoadSegments } from "./renderers/roadSegmentRenderer";

interface Props {
    roadSegments: RoadSegment[];
}

export default function RoadSegmentLayer({
    roadSegments,
}: Props) {

    const map = useMap();

    useEffect(() => {
        renderRoadSegments(map, roadSegments);
    }, [map, roadSegments]);

    return null;
}