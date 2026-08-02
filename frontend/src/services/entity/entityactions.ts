import type { EntityType } from "./entityregistry";

import {
    createRoadSegment,
    updateRoadSegment,
    deleteRoadSegment,
} from "../roadsegment/roadsegmentapi";

import {
    createZone,
    updateZone,
    deleteZone,
} from "../zone/zoneapi";

export async function createEntity(
    entity: EntityType,
    oddId: number
) {

    switch (entity) {

        case "road_segments":
            return createRoadSegment(oddId);

        case "zones":
            return createZone(oddId);

        case "drivable_areas":
            throw new Error("Drivable Areas not implemented.");

        case "functional_scenarios":
            throw new Error("Functional Scenarios not implemented.");

        case "actors":
            throw new Error("Actors not implemented.");

    }

}

export async function updateEntity(
    entity: EntityType,
    id: number,
    data: unknown
) {

    switch (entity) {

        case "road_segments":
            return updateRoadSegment(id, data);

        case "zones":
            return updateZone(id, data);

        case "drivable_areas":
            throw new Error("Drivable Areas not implemented.");

        case "functional_scenarios":
            throw new Error("Functional Scenarios not implemented.");

        case "actors":
            throw new Error("Actors not implemented.");

    }

}

export async function deleteEntity(
    entity: EntityType,
    id: number
) {

    switch (entity) {

        case "road_segments":
            return deleteRoadSegment(id);

        case "zones":
            return deleteZone(id);

        case "drivable_areas":
            throw new Error("Drivable Areas not implemented.");

        case "functional_scenarios":
            throw new Error("Functional Scenarios not implemented.");

        case "actors":
            throw new Error("Actors not implemented.");

    }

}