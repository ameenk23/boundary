import api from "../api";
import type { RoadSegment } from "../../types/roadsegment";

export interface CreateRoadSegmentRequest {

    odd_id: number;

    zone_id: number | null;

    name: string;

    description: string;

    geometry: string;

    road_type: string;

    surface_type: string;

    direction: string;

    speed_limit_kph: number | null;

}

export async function getRoadSegments(
    oddId: number
) {

    const response = await api.get<RoadSegment[]>(
        `/road-segments/odd/${oddId}`
    );

    return response.data;

}

export async function createRoadSegment(
    data: CreateRoadSegmentRequest
) {

    const response = await api.post<RoadSegment>(
        "/road-segments",
        data
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