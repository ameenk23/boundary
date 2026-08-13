import { useEffect } from "react";

import {
    MapContainer,
    TileLayer,
    useMapEvents,
} from "react-leaflet";

import type { Map } from "leaflet";

import "./map.css";

interface Props {
    onMapReady(map: Map): void;
}

function MapReady({ onMapReady }: Props) {

    const map = useMapEvents({});

    useEffect(() => {

        onMapReady(map);

        requestAnimationFrame(() => {

            map.invalidateSize();

        });

    }, [map, onMapReady]);

    return null;

}

export default function MapView({
    onMapReady,
}: Props) {

    return (

        <MapContainer
            center={[52.5130, 13.3041]}
            zoom={15}
            className="map-container"
        >

            <TileLayer
                attribution="© OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapReady
                onMapReady={onMapReady}
            />

        </MapContainer>

    );

}