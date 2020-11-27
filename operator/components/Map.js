import React from "react";
import {MapContainer, Marker, TileLayer} from "react-leaflet";

const defaultCenter = [52.04,19.67]
const defaultZoom = 6

const icon = L.icon({
  iconUrl: '/map-marker.svg',
  iconSize:     [32, 32],
  iconAnchor:   [16, 32]
})

const Map = ({requests, center, zoom}) => {
  const mapCenter = center || defaultCenter
  const mapZoom = zoom || defaultZoom

  return (
    <MapContainer center={mapCenter} zoom={mapZoom} className="map">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {
        requests?.map(r => {
          return (
            <Marker
              key={r.id}
              position={[r.location.latitude, r.location.longitude]}
              icon={icon}
            />
          )
        })
      }
    </MapContainer>
  )
}
export default Map;
