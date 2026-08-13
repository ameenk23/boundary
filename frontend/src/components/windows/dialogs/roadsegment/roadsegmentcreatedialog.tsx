import { useState } from "react";

import EntityDialog from "../entitydialog/EntityDialog";

import EnumSelect from "../../../properties/shared/enumselect";

import {
    ROAD_TYPES,
    SURFACE_TYPES,
    DIRECTIONS,
} from "../../../../types/enums";

import { useAppContext } from "../../../../context/appcontext";

export default function RoadSegmentCreateDialog() {

const {

    dialog,

    setDialog,

    setToolMode,

    setPendingEntity,

} = useAppContext();

    const [name, setName] = useState("");

    const [description, setDescription] =
        useState("");

    const [roadType, setRoadType] =
        useState(ROAD_TYPES[0]);

    const [surfaceType, setSurfaceType] =
        useState(SURFACE_TYPES[0]);

    const [direction, setDirection] =
        useState(DIRECTIONS[0]);

    const [speedLimit, setSpeedLimit] =
        useState("50");

    return (

        <EntityDialog

            open={dialog === "road_segment"}

            title="New Road Segment"

            onCancel={() =>
                setDialog(null)
            }

           onCreate={() => {

    setPendingEntity({

        name,

        description,

        road_type: roadType,

        surface_type: surfaceType,

        direction,

        speed_limit_kph:
            Number(speedLimit),

    });

    setDialog(null);

    setToolMode("draw_road_segment");

}}

        >

            <input

                placeholder="Name"

                value={name}

                onChange={(e) =>
                    setName(e.target.value)
                }

            />

            <textarea

                placeholder="Description"

                value={description}

                onChange={(e) =>
                    setDescription(e.target.value)
                }

            />

            <EnumSelect

                value={roadType}

                options={ROAD_TYPES}

                onChange={setRoadType}

            />

            <EnumSelect

                value={surfaceType}

                options={SURFACE_TYPES}

                onChange={setSurfaceType}

            />

            <EnumSelect

                value={direction}

                options={DIRECTIONS}

                onChange={setDirection}

            />

            <input

                type="number"

                value={speedLimit}

                onChange={(e) =>
                    setSpeedLimit(e.target.value)
                }

            />

        </EntityDialog>

    );

}