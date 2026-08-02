import api from "../api.ts";
import type { ODD } from "../../types/odd.ts";

export async function getODDs(platformId: number) {
    const response = await api.get<ODD[]>(
        `/odds/platform/${platformId}`
    );

    return response.data;
}