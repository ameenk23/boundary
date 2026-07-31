import { useAppContext } from "../../context/appcontext";
import { useRoadSegments } from "../../hooks/useroadsegments";
import MapView from "./mapview";

export default function MapPanel() {
    const { selectedODDId } = useAppContext();

    const { roadSegments } = useRoadSegments(selectedODDId);

    return (
        <MapView
            roadSegments={roadSegments}
        />
    );
}