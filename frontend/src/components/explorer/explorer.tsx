import { useAppContext } from "../../context/appcontext";

export default function Explorer() {

    const {
        selectedODDId,
        selectedExplorerNode,
        setSelectedExplorerNode,
    } = useAppContext();

    if (!selectedODDId) {
        return (
            <div className="explorer">
                Select an ODD
            </div>
        );
    }

    return (
        <div className="explorer">

            <button
                className={selectedExplorerNode === "road_segments" ? "active" : ""}
                onClick={() => setSelectedExplorerNode("road_segments")}
            >
                🛣 Road Segments
            </button>

            <button
                className={selectedExplorerNode === "zones" ? "active" : ""}
                onClick={() => setSelectedExplorerNode("zones")}
            >
                📍 Zones
            </button>

            <button
                className={selectedExplorerNode === "drivable_areas" ? "active" : ""}
                onClick={() => setSelectedExplorerNode("drivable_areas")}
            >
                🚧 Drivable Areas
            </button>

            <button
                className={selectedExplorerNode === "functional_scenarios" ? "active" : ""}
                onClick={() => setSelectedExplorerNode("functional_scenarios")}
            >
                🎬 Functional Scenarios
            </button>

            <button
                className={selectedExplorerNode === "actors" ? "active" : ""}
                onClick={() => setSelectedExplorerNode("actors")}
            >
                🚗 Actors
            </button>

        </div>
    );
}