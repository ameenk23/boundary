import { useEffect, useState } from "react";
import { getProjects } from "../services/projectapi";
import type { Project } from "../types/project";

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProjects() {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (err) {
                setError("Failed to load projects");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadProjects();
    }, []);

    return {
        projects,
        loading,
        error,
    };
}