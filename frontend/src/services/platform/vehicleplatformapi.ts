import api from "../api.ts";
import type { VehiclePlatform } from "../../types/vehicleplatform.ts";

export async function getVehiclePlatforms(projectId: number) {
    const response = await api.get<VehiclePlatform[]>(
        `/vehicle-platforms/project/${projectId}`
    );

    return response.data;
}