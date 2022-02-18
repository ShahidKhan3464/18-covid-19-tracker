import React from "react";
import { MapContainer, TileLayer } from 'react-leaflet'
import "./Map.css";

function Map({ position, zoom }) {
    return (
        <div className="Map">
            <MapContainer center={position} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
        </div>
    );
}

export default Map;