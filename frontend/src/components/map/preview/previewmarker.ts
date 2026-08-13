import {
    CircleMarker,
    LatLng,
    Map,
} from "leaflet";

export default class PreviewMarker {

    private marker: CircleMarker | null = null;

    constructor(
        private map: Map,
    ) {}

    show(latlng: LatLng) {

        this.hide();

        this.marker = new CircleMarker(
            latlng,
            {
                radius: 6,
                color: "#2e7d32",
                fillColor: "#4caf50",
                fillOpacity: 1,
                weight: 2,
            }
        );

        this.marker.addTo(this.map);

    }

    move(latlng: LatLng) {

        if (!this.marker) return;

        this.marker.setLatLng(latlng);

    }

    hide() {

        if (!this.marker) return;

        this.marker.remove();

        this.marker = null;

    }

}