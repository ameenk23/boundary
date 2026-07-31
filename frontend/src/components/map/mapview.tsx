import {
    MapContainer,
    TileLayer,
} from "react-leaflet";

import "./map.css";

export default function MapView() {
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
        </MapContainer>
    );
}