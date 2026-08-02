import api from "../api";
import type { RoadSegment } from "../../types/roadsegment";

export async function getRoadSegments(
    oddId: number
) {

    const response = await api.get<RoadSegment[]>(
        `/road-segments/odd/${oddId}`
    );

    return response.data;

}

export async function updateRoadSegment(
    id: number,
    data: Partial<RoadSegment>
) {

    const response = await api.patch<RoadSegment>(
        `/road-segments/${id}`,
        data
    );

    return response.data;

}

export async function deleteRoadSegment(
    id: number
) {

    await api.delete(
        `/road-segments/${id}`
    );

}