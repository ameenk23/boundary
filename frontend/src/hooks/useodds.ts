import { useEffect, useState } from "react";
import type { ODD } from "../types/odd";
import { getODDs } from "../services/oddapi";

export function useODDs(platformId: number | null) {

    const [odds, setODDs] = useState<ODD[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        if (platformId === null) {
            setODDs([]);
            return;
        }

        setLoading(true);

        getODDs(platformId)
            .then(setODDs)
            .catch(() => setError("Failed to load ODDs"))
            .finally(() => setLoading(false));

    }, [platformId]);

    return {
        odds,
        loading,
        error,
    };
}