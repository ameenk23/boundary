import { useAppContext } from "../../context/appcontext";

import {
    entityRegistry,
    type EntityType,
} from "../../services/entity/entityregistry";

import { useRoadSegments } from "../../hooks/useroadsegments";

export default function Explorer() {

    const {
        selectedODDId,
        selectedExplorerNode,
        setSelectedExplorerNode,
    } = useAppContext();

    const {
        roadSegments,
    } = useRoadSegments(selectedODDId);

    if (!selectedODDId) {

        return (
            <div className="explorer">
                Select an ODD
            </div>
        );

    }

    return (

        <div className="explorer">

            {Object.values(entityRegistry).map(entity => {

                let count: number | undefined;

                switch (entity.type) {

                    case "road_segments":
                        count = roadSegments.length;
                        break;

                    default:
                        count = undefined;

                }

                return (

                    <details
                        key={entity.type}
                        open={selectedExplorerNode === entity.type}
                    >

                        <summary
                            onClick={() =>
                                setSelectedExplorerNode(
                                    entity.type as EntityType
                                )
                            }
                        >
                            {entity.icon} {entity.label}

                            {count !== undefined &&
                                ` (${count})`}
                        </summary>

                    </details>

                );

            })}

        </div>

    );

}