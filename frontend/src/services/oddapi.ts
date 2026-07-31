import api from "./api";
import type { ODD } from "../types/odd";

export async function getODDs(platformId: number) {
    const response = await api.get<ODD[]>(
        `/odds/platform/${platformId}`
    );

    return response.data;
}