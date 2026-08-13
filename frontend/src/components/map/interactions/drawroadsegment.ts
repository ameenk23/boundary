import {
    Map,
    LatLng,
    Polyline,
    CircleMarker,
    LeafletMouseEvent,
} from "leaflet";

import {
    createRoadSegment,
} from "../../../services/roadsegment/roadsegmentapi";

import {
    refreshEntity,
} from "../../../services/entity/entityevents";

interface DrawRoadSegmentOptions {

    oddId: number;

    pendingEntity: {

        name: string;

        description: string;

        road_type: string;

        surface_type: string;

        direction: string;

        speed_limit_kph: number | null;

    };

    setSelectedRoadSegmentId(
        id: number
    ): void;

    setEditorOpen(
        open: boolean
    ): void;

    setToolMode(
        mode: "select"
    ): void;

}

let startPoint: LatLng | null = null;
let previewLine: Polyline | null = null;
let startMarker: CircleMarker | null = null;

function toGeometryString(
    start: LatLng,
    end: LatLng,
) {

    return JSON.stringify({

        type: "LineString",

        coordinates: [

            [start.lng, start.lat],

            [end.lng, end.lat],

        ],

    });

}

export function enableRoadSegmentDrawing(

    map: Map,

    enabled: boolean,

    options: DrawRoadSegmentOptions,

) {

    function cleanup() {

        previewLine?.remove();
        previewLine = null;

        startMarker?.remove();
        startMarker = null;

        startPoint = null;

        map.getContainer().style.cursor = "";

        map.off(
            "click",
            handleClick
        );

        map.off(
            "mousemove",
            handleMouseMove
        );

    }

    function handleMouseMove(
        e: LeafletMouseEvent,
    ) {

        if (!startPoint) return;

        if (!previewLine) {

            previewLine = new Polyline(
                [
                    startPoint,
                    e.latlng,
                ],
                {
                    color: "#ff9800",
                    weight: 4,
                    dashArray: "8 8",
                }
            ).addTo(map);

            return;

        }

        previewLine.setLatLngs([
            startPoint,
            e.latlng,
        ]);

    }

    async function handleClick(
        e: LeafletMouseEvent,
    ) {

        if (!startPoint) {

            startPoint = e.latlng;

            startMarker?.remove();

            startMarker =
                new CircleMarker(
                    startPoint,
                    {
                        radius: 6,
                        color: "#2e7d32",
                        fillColor: "#4caf50",
                        fillOpacity: 1,
                        weight: 2,
                    }
                ).addTo(map);

            return;

        }

        const endPoint = e.latlng;

        const geometry =
            toGeometryString(
                startPoint,
                endPoint,
            );

                try {

            const road =
                await createRoadSegment({

                    odd_id: options.oddId,

                    zone_id: null,

                    name:
                        options.pendingEntity.name,

                    description:
                        options.pendingEntity.description,

                    geometry,

                    road_type:
                        options.pendingEntity.road_type,

                    surface_type:
                        options.pendingEntity.surface_type,

                    direction:
                        options.pendingEntity.direction,

                    speed_limit_kph:
                        options.pendingEntity.speed_limit_kph,

                });

            refreshEntity(
                "road_segments"
            );

            options.setSelectedRoadSegmentId(
                road.id
            );

            options.setEditorOpen(
                true
            );

            options.setToolMode(
                "select"
            );

            cleanup();

        } catch (err: any) {

            console.error(
                "Failed to create road segment"
            );

            console.error(
                err.response?.data ?? err
            );

            cleanup();

        }

    }

    if (!enabled) {

        cleanup();

        return;

    }

    map.getContainer().style.cursor =
        "crosshair";

    map.off(
        "click",
        handleClick
    );

    map.off(
        "mousemove",
        handleMouseMove
    );

    map.on(
        "click",
        handleClick
    );

    map.on(
        "mousemove",
        handleMouseMove
    );

}