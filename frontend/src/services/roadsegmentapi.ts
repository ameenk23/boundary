import api from "./api";
import type { RoadSegment } from "../types/roadsegment";

export async function getRoadSegments(oddId: number) {

    const response = await api.get<RoadSegment[]>(
        `/road-segments/odd/${oddId}`
    );

    return response.data;
}