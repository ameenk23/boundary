export interface Zone {
    id: number;
    uuid: string;

    drivable_area_id: number;

    name: string;
    description: string | null;

    geometry: string;

    created_at: string;
    updated_at: string;
}