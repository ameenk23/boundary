import { useAppContext } from "../../context/appcontext";
import RoadSegmentGrid from "./roadsegments/roadsegmentgrid";
import ZoneGrid from "./zones/zonegrid";

export default function Grid() {
    const { selectedExplorerNode } = useAppContext();

    return (
        <div className="grid-container">
            {selectedExplorerNode === "road_segments" && <RoadSegmentGrid />}
            {selectedExplorerNode === "zones" && <ZoneGrid />}
        </div>
    );
}