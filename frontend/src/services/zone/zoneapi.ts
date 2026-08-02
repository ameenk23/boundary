import api from "../api.ts";
import type { Zone } from "../../types/zone.ts";

export async function getZones(oddId: number) {

    const response = await api.get<Zone[]>(
        `/zones/odd/${oddId}`
    );

    return response.data;
}