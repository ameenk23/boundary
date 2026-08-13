import {
    LatLng,
    Map,
    Polyline,
} from "leaflet";

export default class PreviewLine {

    private line: Polyline | null = null;

    constructor(
        private map: Map,
    ) {}

    show(
        start: LatLng,
        end: LatLng,
    ) {

        this.hide();

        this.line = new Polyline(
            [
                start,
                end,
            ],
            {
                color: "#ff9800",
                weight: 4,
                dashArray: "8 8",
            }
        );

        this.line.addTo(this.map);

    }

    update(
        start: LatLng,
        end: LatLng,
    ) {

        if (!this.line) {

            this.show(
                start,
                end,
            );

            return;

        }

        this.line.setLatLngs([
            start,
            end,
        ]);

    }

    hide() {

        if (!this.line) return;

        this.line.remove();

        this.line = null;

    }

}