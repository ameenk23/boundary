import api from "./api";
import type { Project } from "../types/project";

export async function getProjects(): Promise<Project[]> {
    const response = await api.get("/projects");
    return response.data;
}