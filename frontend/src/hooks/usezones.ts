import { useEffect, useState } from "react";
import { getZones } from "../services/zoneapi";
import type { Zone } from "../types/zone";

export function useZones(oddId: number | null) {
    const [zones, setZones] = useState<Zone[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!oddId) return;

        setLoading(true);

        getZones(oddId)
            .then(setZones)
            .finally(() => setLoading(false));
    }, [oddId]);

    return { zones, loading };
}