export interface Project {
    id: number;
    uuid: string;
    name: string;
    description: string | null;

    created_at: string;
    updated_at: string;
}