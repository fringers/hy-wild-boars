import React, {useRef, useState} from "react";
import {MapContainer, Marker, TileLayer, LayerGroup, useMapEvents} from "react-leaflet";
import "./L.Icon.Pulse.js"
import "@ansur/leaflet-pulse-icon/dist/L.Icon.Pulse.css"

const defaultCenter = [52.04, 19.67]
const defaultZoom = 6


const newIcon = L.icon.pulse({
    fillColor: 'red',
    color: 'red',
    animate: true
})

const acceptedIcon = L.icon.pulse({
    fillColor: 'orange',
    color: 'orange',
    animate: false
})

const doneIcon = L.icon.pulse({
    fillColor: 'green',
    color: 'green',
    animate: false
})

const rejectedIcon = L.icon.pulse({
    fillColor: 'black',
    color: 'black',
    animate: false
})



const MyComponent = ({setMarkersVisible}) => {
    const map = useMapEvents({
            'zoomend': () => {
                if (map.getZoom() > 7) {
                    setMarkersVisible(true)
                } else {
                    setMarkersVisible(true)
                }

            }
        }
    )

    return null
}


const Map = ({requests, center, zoom}) => {
    const mapCenter = center || defaultCenter
    const mapZoom = zoom || defaultZoom
    const [markersVisible, setMarkersVisible] = useState(true)

    const statusToIcon = (status) => {
        switch (status) {
          case 'NEW':
            return newIcon
          case 'ACCEPTED':
            return acceptedIcon
          case 'REJECTED':
            return rejectedIcon
          case 'RESOLVED':
            return doneIcon
          default:
            return doneIcon
        }
      }

    return (
        <MapContainer center={mapCenter} zoom={mapZoom} minZoom={6} className="map">
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MyComponent setMarkersVisible={setMarkersVisible}/>
            {markersVisible ?
                <LayerGroup>
                    {
                        requests?.map(r => {
                            return (
                                <Marker
                                    key={r.id}
                                    position={[r.location.latitude, r.location.longitude]}
                                    icon={statusToIcon(r.status)}
                                    eventHandlers={{
                                        click: (event) => {
                                            if(requests.length != 1)
                                                location.href = "/requests/"+r.id
                                            else
                                                event.target._map.flyTo(event.target._latlng, 15, {
                                                    animate: true,
                                                    duration: 1
                                                })
                                        },
                                    }}
                                />
                            )
                        })}
                </LayerGroup>
                : ""}
        </MapContainer>
    )
}
export default Map;
