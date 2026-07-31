import { useEffect, useState } from "react";
import type { RoadSegment } from "../types/roadsegment";
import { getRoadSegments } from "../services/roadsegmentapi";

export function useRoadSegments(oddId: number | null) {

    const [roadSegments, setRoadSegments] = useState<RoadSegment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        if (oddId === null) {
            setRoadSegments([]);
            return;
        }

        setLoading(true);

        getRoadSegments(oddId)
            .then(setRoadSegments)
            .catch(() => setError("Failed to load road segments"))
            .finally(() => setLoading(false));

    }, [oddId]);

    return {
        roadSegments,
        loading,
        error,
    };
}