import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

import "./Map.css";

export default function Map() {

    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        if (!mapContainerRef.current) return;

        const map = new maplibregl.Map({
            container: mapContainerRef.current,

            style: "https://demotiles.maplibre.org/style.json",

            center: [13.3041, 52.5074], // Charlottenburg

            zoom: 15,
        });

        map.addControl(new maplibregl.NavigationControl());

        return () => map.remove();

    }, []);

    return (
        <div
            ref={mapContainerRef}
            className="map-container"
        />
    );
}