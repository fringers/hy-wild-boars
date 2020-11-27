import React from "react";
import {MapContainer, TileLayer} from "react-leaflet";

const defaultCenter = [52.04,19.67]
const defaultZoom = 6

const Map = ({center, zoom}) => {
  const mapCenter = center || defaultCenter
  const mapZoom = zoom || defaultZoom

  return (
    <MapContainer center={mapCenter} zoom={mapZoom} className="map">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}
export default Map;
