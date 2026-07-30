import { useProjects } from "../../hooks/useprojects";
import BackendStatus from "./backendstatus";

export default function Toolbar() {

    const { projects, loading, error } = useProjects();

    return (
        <header className="toolbar">
            <div className="toolbar-left">
                <h2>ODD Tool</h2>
            </div>

            <div className="toolbar-center">
                <select>
                    {loading ? (
                        <option>Loading...</option>
                    ) : error ? (
                        <option>Error loading projects</option>
                    ) : (
                        projects.map((project) => (
                            <option
                                key={project.id}
                                value={project.id}
                            >
                                {project.name}
                            </option>
                        ))
                    )}
                </select>

                <select>
                    <option>Platform</option>
                </select>

                <select>
                    <option>ODD</option>
                </select>
            </div>

            <div className="toolbar-right">
                <BackendStatus />
            </div>
        </header>
    );
}