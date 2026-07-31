import api from "./api";
import type { Zone } from "../types/zone";

export async function getZones(oddId: number) {

    const response = await api.get<Zone[]>(
        `/zones/odd/${oddId}`
    );

    return response.data;
}