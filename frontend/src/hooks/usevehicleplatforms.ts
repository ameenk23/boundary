import { useEffect, useState } from "react";
import type { VehiclePlatform } from "../types/vehicleplatform";
import { getVehiclePlatforms } from "../services/vehicleplatformapi";

export function useVehiclePlatforms(projectId: number | null) {
    const [platforms, setPlatforms] = useState<VehiclePlatform[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (projectId === null) {
            setPlatforms([]);
            return;
        }

        setLoading(true);

        getVehiclePlatforms(projectId)
            .then(setPlatforms)
            .catch(() => setError("Failed to load platforms"))
            .finally(() => setLoading(false));

    }, [projectId]);

    return {
        platforms,
        loading,
        error,
    };
}