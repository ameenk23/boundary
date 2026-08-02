import { useCallback, useEffect, useState } from "react";

import type { RoadSegment } from "../types/roadsegment";

import { getRoadSegments } from "../services/roadsegment/roadsegmentapi";

import {
    subscribeEntity,
} from "../services/entity/entityevents";

export function useRoadSegments(
    oddId: number | null
) {

    const [roadSegments, setRoadSegments] =
        useState<RoadSegment[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const loadRoadSegments =
        useCallback(async () => {

            if (oddId == null) {

                setRoadSegments([]);

                return;

            }

            setLoading(true);

            try {

                const data =
                    await getRoadSegments(
                        oddId
                    );

                setRoadSegments(data);

                setError("");

            }

            catch {

                setError(
                    "Failed to load road segments"
                );

            }

            finally {

                setLoading(false);

            }

        }, [oddId]);

    useEffect(() => {

        loadRoadSegments();

    }, [loadRoadSegments]);

    useEffect(() => {

        const unsubscribe =
            subscribeEntity(
                "road_segments",
                loadRoadSegments
            );

        return unsubscribe;

    }, [loadRoadSegments]);

    return {

        roadSegments,

        loading,

        error,

        refresh: loadRoadSegments,

    };

}