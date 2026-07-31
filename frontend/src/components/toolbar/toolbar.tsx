import { useProjects } from "../../hooks/useprojects";
import { useVehiclePlatforms } from "../../hooks/usevehicleplatforms";
import BackendStatus from "./backendstatus";
import { useAppContext } from "../../context/appcontext";
import { useODDs } from "../../hooks/useodds";

export default function Toolbar() {

    const { projects, loading, error } = useProjects();

    const {
        selectedProjectId,
        setSelectedProjectId,
        selectedPlatformId,
        setSelectedPlatformId,
        selectedODDId,
        setSelectedODDId,
    } = useAppContext();

    const {
        platforms,
        loading: platformsLoading,
    } = useVehiclePlatforms(selectedProjectId);

    const {
        odds,
        loading: oddsLoading,
    } = useODDs(selectedPlatformId);

    return (
        <header className="toolbar">
            <div className="toolbar-left">
                <h2>ODD Tool</h2>
            </div>

            <div className="toolbar-center">
                <select
                    disabled={loading}
                    value={selectedProjectId ?? ""}
                    onChange={(e) => {
                        const projectId = e.target.value
                             ? Number(e.target.value)
                             : null;

                        setSelectedProjectId(projectId);
                        setSelectedPlatformId(null);
                        setSelectedODDId(null);
                    }}
                >
                    <option value="">Select Project</option>

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
                <select
                    disabled={!selectedProjectId || platformsLoading}
                    value={selectedPlatformId ?? ""}
                onChange={(e) => {
                    const platformId = e.target.value
                        ? Number(e.target.value)
                        : null;

                    setSelectedPlatformId(platformId);
                    setSelectedODDId(null);
                }}
                >
                    <option value="">
                        {platformsLoading ? "Loading..." : "Select Platform"}
                    </option>

                    {platforms.map((platform) => (
                        <option
                            key={platform.id}
                            value={platform.id}
                        >
                            {platform.name}
                        </option>
                    ))}
                </select>

                <select
                    disabled={!selectedPlatformId || oddsLoading}
                    value={selectedODDId ?? ""}
                    onChange={(e) =>
                        setSelectedODDId(
                            e.target.value ? Number(e.target.value) : null
                        )
                    }
                >
                    <option value="">
                        {oddsLoading ? "Loading..." : "Select ODD"}
                    </option>

                    {odds.map((odd) => (
                        <option
                            key={odd.id}
                            value={odd.id}
                        >
                            {odd.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="toolbar-right">
                <BackendStatus/>
            </div>
        </header>
    );
}