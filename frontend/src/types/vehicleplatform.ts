export interface VehiclePlatform {
    id: number;
    uuid: string;
    project_id: number;
    name: string;
    description: string | null;
    automation_level: string | null;
    created_at: string;
    updated_at: string;
}