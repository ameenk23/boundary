import { useAppContext } from "../../context/appcontext";

import RoadSegmentProperties from "./roadsegment/roadsegmentproperties";

export default function PropertiesPanel() {

    const {
        selectedExplorerNode,
    } = useAppContext();

    return (

        <div className="properties-panel">

            {selectedExplorerNode === "road_segments" && (
                <RoadSegmentProperties />
            )}

            {selectedExplorerNode === "zones" && (
                <>Zone Properties</>
            )}

            {selectedExplorerNode === "actors" && (
                <>Actor Properties</>
            )}

            {selectedExplorerNode === "drivable_areas" && (
                <>Drivable Area Properties</>
            )}

            {selectedExplorerNode === "functional_scenarios" && (
                <>Functional Scenario Properties</>
            )}

        </div>

    );

}