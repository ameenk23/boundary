import {
    LatLng,
    LeafletMouseEvent,
    Map,
} from "leaflet";

import PreviewMarker from "../preview/previewmarker";
import PreviewLine from "../preview/previewline";

interface DrawLineStringOptions {

    onFinish(
        geometry: LatLng[]
    ): void;

}

export default class GeometryDrawer {

    private marker: PreviewMarker;

    private line: PreviewLine;

    private startPoint: LatLng | null = null;

    private enabled = false;

    constructor(
        private map: Map,
    ) {

        this.marker =
            new PreviewMarker(map);

        this.line =
            new PreviewLine(map);

    }

    drawLineString(
        options: DrawLineStringOptions,
    ) {

        this.enable();

        const clickHandler =
            (e: LeafletMouseEvent) => {

                if (!this.startPoint) {

                    this.startPoint =
                        e.latlng;

                    this.marker.show(
                        e.latlng
                    );

                    return;

                }

                const end =
                    e.latlng;

                this.disable();

                options.onFinish([
                    this.startPoint,
                    end,
                ]);

            };

        const moveHandler =
            (e: LeafletMouseEvent) => {

                if (!this.startPoint)
                    return;

                this.line.update(
                    this.startPoint,
                    e.latlng
                );

            };

        this.map.on(
            "click",
            clickHandler
        );

        this.map.on(
            "mousemove",
            moveHandler
        );

        const disable = () => {

            this.map.off(
                "click",
                clickHandler
            );

            this.map.off(
                "mousemove",
                moveHandler
            );

            this.marker.hide();

            this.line.hide();

            this.startPoint = null;

        };

        this.disable =
            disable;

    }

    enable() {

        if (this.enabled)
            return;

        this.enabled = true;

        this.map.getContainer().style.cursor =
            "crosshair";

    }

    disable() {

        this.enabled = false;

        this.map.getContainer().style.cursor =
            "";

    }

}