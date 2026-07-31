export interface RoadSegment {
    id: number;
    uuid: string;
    odd_id: number;
    zone_id: number;

    name: string;
    description: string | null;

    geometry: string;

    road_type: string;
    surface_type: string;
    direction: string;

    speed_limit_kph: number;

    created_at: string;
    updated_at: string;
}