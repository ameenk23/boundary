import api from "../api.ts";
import type { Project } from "../../types/project.ts";

export async function getProjects(): Promise<Project[]> {
    const response = await api.get("/projects");
    return response.data;
}