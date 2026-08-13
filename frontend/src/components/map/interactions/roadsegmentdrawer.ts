import {
    Map,
    LatLng,
    Polyline,
    CircleMarker,
    LeafletMouseEvent,
} from "leaflet";

export class RoadSegmentDrawer {

    private map: Map;

    private startPoint: LatLng | null = null;

    private previewLine: Polyline | null = null;

    private previewMarker: CircleMarker | null = null;

    constructor(map: Map) {

        this.map = map;

    }

}