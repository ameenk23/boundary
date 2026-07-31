import api from "./api";
import type { VehiclePlatform } from "../types/vehicleplatform";

export async function getVehiclePlatforms(projectId: number) {
    const response = await api.get<VehiclePlatform[]>(
        `/vehicle-platforms/project/${projectId}`
    );

    return response.data;
}