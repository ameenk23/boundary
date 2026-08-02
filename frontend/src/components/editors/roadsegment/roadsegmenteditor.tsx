import { useEffect, useState } from "react";

import { useAppContext } from "../../../context/appcontext";
import { useRoadSegments } from "../../../hooks/useroadsegments";

import { updateRoadSegment } from "../../../services/roadsegment/roadsegmentapi";
import { refreshEntity } from "../../../services/entity/entityevents";

import PropertyRow from "../../properties/shared/propertyrow";
import EnumSelect from "../../properties/shared/enumselect";

import {
    ROAD_TYPES,
    SURFACE_TYPES,
    DIRECTIONS,
} from "../../../types/enums";

export default function RoadSegmentEditor() {

    const {
        selectedODDId,
        selectedRoadSegmentId,
        setEditorOpen
    } = useAppContext();

    const {
        roadSegments,
    } = useRoadSegments(selectedODDId);

    const road = roadSegments.find(
        r => r.id === selectedRoadSegmentId
    );

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [roadType, setRoadType] =
        useState<(typeof ROAD_TYPES)[number]>(ROAD_TYPES[0]);

    const [surfaceType, setSurfaceType] =
        useState<(typeof SURFACE_TYPES)[number]>(SURFACE_TYPES[0]);

    const [direction, setDirection] =
        useState<(typeof DIRECTIONS)[number]>(DIRECTIONS[0]);

    const [speedLimit, setSpeedLimit] = useState("");



    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
const [
    showDiscardDialog,
    setShowDiscardDialog,
] = useState(false);



    useEffect(() => {

        if (!road) return;

        setName(road.name);
        setDescription(road.description ?? "");

        setRoadType(
            road.road_type as (typeof ROAD_TYPES)[number]
        );

        setSurfaceType(
            road.surface_type as (typeof SURFACE_TYPES)[number]
        );

        setDirection(
            road.direction as (typeof DIRECTIONS)[number]
        );

        setSpeedLimit(
            road.speed_limit_kph?.toString() ?? ""
        );

        setSaved(false);

    }, [road]);

    if (!road) {

        return (
            <>Select a Road Segment</>
        );

    }

    const dirty =
        name !== road.name ||
        description !== (road.description ?? "") ||
        roadType !== road.road_type ||
        surfaceType !== road.surface_type ||
        direction !== road.direction ||
        speedLimit !== (road.speed_limit_kph?.toString() ?? "");

    return (

        <>

            <h3
                style={{
                    marginBottom: 24,
                }}
            >
                Road Segment
            </h3>

            {saved && (

                <div
                    style={{
                        color: "#2e7d32",
                        fontWeight: 600,
                        marginBottom: 16,
                    }}
                >
                    ✓ Saved
                </div>

            )}

            <PropertyRow label="Name">

                <input
                    value={name}
                    onChange={e => {

                        setSaved(false);
                        setName(e.target.value);

                    }}
                    style={{
                        width: "100%",
                        padding: 8,
                    }}
                />

            </PropertyRow>

            <PropertyRow label="Description">

                <textarea
                    rows={3}
                    value={description}
                    onChange={e => {

                        setSaved(false);
                        setDescription(e.target.value);

                    }}
                    style={{
                        width: "100%",
                        padding: 8,
                        resize: "vertical",
                    }}
                />

            </PropertyRow>

            <PropertyRow label="Road Type">

                <EnumSelect
                    value={roadType}
                    options={ROAD_TYPES}
                    onChange={value => {

                        setSaved(false);

                        setRoadType(
                            value as (typeof ROAD_TYPES)[number]
                        );

                    }}
                />

            </PropertyRow>

            <PropertyRow label="Surface">

                <EnumSelect
                    value={surfaceType}
                    options={SURFACE_TYPES}
                    onChange={value => {

                        setSaved(false);

                        setSurfaceType(
                            value as (typeof SURFACE_TYPES)[number]
                        );

                    }}
                />

            </PropertyRow>

            <PropertyRow label="Direction">

                <EnumSelect
                    value={direction}
                    options={DIRECTIONS}
                    onChange={value => {

                        setSaved(false);

                        setDirection(
                            value as (typeof DIRECTIONS)[number]
                        );

                    }}
                />

            </PropertyRow>

            <PropertyRow label="Speed Limit">

                <input
                    type="number"
                    value={speedLimit}
                    onChange={e => {

                        setSaved(false);
                        setSpeedLimit(e.target.value);

                    }}
                    style={{
                        width: "100%",
                        padding: 8,
                    }}
                />

            </PropertyRow>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 12,
                    marginTop: 30,
                }}
            >

                <button
                    disabled={saving || !dirty}
                    onClick={async () => {

                        setSaving(true);

                        try {

                            await updateRoadSegment(
                                road.id,
                                {
                                    name,
                                    description,
                                    road_type: roadType,
                                    surface_type: surfaceType,
                                    direction,
                                    speed_limit_kph:
                                        speedLimit === ""
                                            ? null
                                            : Number(speedLimit),
                                }
                            );

                            refreshEntity("road_segments");

                            setEditorOpen(false);

                            setSaved(true);

                            setTimeout(() => {

                                setSaved(false);

                            }, 2000);

                        } catch (error) {

                            console.error(error);

                        } finally {

                            setSaving(false);

                        }

                    }}
                >

                    {saving ? "Saving..." : "Save"}

                </button>


                <button
                    disabled={saving}
                    onClick={() => {

                        setEditorOpen(false);

                    }}
                >

                    Cancel

                </button>
            </div>

        </>

    );

}