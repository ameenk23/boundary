export type EntityType =
    | "road_segments"
    | "zones"
    | "drivable_areas"
    | "functional_scenarios"
    | "actors";

export interface EntityDefinition {

    type: EntityType;

    label: string;

    icon: string;

    endpoint: string;

    hasGeometry: boolean;

}

export const entityRegistry: Record<EntityType, EntityDefinition> = {

    road_segments: {
        type: "road_segments",
        label: "Road Segments",
        icon: "🛣",
        endpoint: "/road-segments",
        hasGeometry: true,
    },

    zones: {
        type: "zones",
        label: "Zones",
        icon: "📍",
        endpoint: "/zones",
        hasGeometry: true,
    },

    drivable_areas: {
        type: "drivable_areas",
        label: "Drivable Areas",
        icon: "🚧",
        endpoint: "/drivable-areas",
        hasGeometry: true,
    },

    functional_scenarios: {
        type: "functional_scenarios",
        label: "Functional Scenarios",
        icon: "🎬",
        endpoint: "/functional-scenarios",
        hasGeometry: false,
    },

    actors: {
        type: "actors",
        label: "Actors",
        icon: "🚗",
        endpoint: "/actors",
        hasGeometry: false,
    },

};