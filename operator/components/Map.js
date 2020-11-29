import React, {useRef, useState, useEffect } from "react";
import {MapContainer, Marker, TileLayer, LayerGroup, Polygon, Polyline, useMapEvents, LayersControl} from "react-leaflet";
import "./L.Icon.Pulse.js"
import "@ansur/leaflet-pulse-icon/dist/L.Icon.Pulse.css"
import {protectionArea} from "./data/ProtectionArea"
import {restrictedArea} from "./data/RestrictedArea"
import {hazardArea} from "./data/HazardArea"
import {disabledArea} from "./data/DisabledArea"
import {ecologicalCorridors} from "./data/EcologicalCorridors"

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
  fillColor: 'gray',
  color: 'gray',
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

<LayersControl position="topright">
<LayersControl.Overlay name="Korytarze ekologiczne">
    <LayerGroup>
    {
        ecologicalCorridors?.map( (corridor, index) => {
            return (
                <Polygon 
                key = {index}
                positions={corridor} 
                pathOptions ={{ 
                    color: "#0099ff",
                    weight: "2",
                    opacity: "1",
                    fillColor: "#0099ff",
                    fillOpacity: "0.15"
                }} />
            )
        }
        )
    }
    </LayerGroup>
    </LayersControl.Overlay>
    <LayersControl.Overlay name="Obszar ochronny (Protection Area)">
    <LayerGroup>

    {
        protectionArea?.map( (area, index) => {
            let positions = area.path.split("|").map(p => p.split(","))
            if(area.path_inner)
                positions = positions.concat(area.path_inner?.split("|").map(p => p.split(",")))

            return (
                <Polygon 
                key = {index}
                positions={positions} 
                pathOptions ={{ 
                    color: "FFFFFF",
                    weight: "0",
                    opacity: "0.00",
                    fillColor: "#FFFF00",
                    fillOpacity: "0.36"
                }} />
            )
        }
        )
    }
    </LayerGroup>
    </LayersControl.Overlay>
    <LayersControl.Overlay name="Obszar objęty ograniczeniami (Restricted Area)">
    <LayerGroup>
    {
        restrictedArea?.map( (area, index) => {
            let positions = area.path.split("|").map(p => p.split(","))
            if(area.path_inner)
                positions = positions.concat(area.path_inner?.split("|").map(p => p.split(",")))
                
            return (    
                <Polygon 
                key = {index}
                positions={positions} 
                pathOptions ={{ 
                    color: "FFFFFF",
                    weight: "0",
                    opacity: "0.00",
                    fillColor: "#FF0000",
                    fillOpacity: "0.49"
                }} />
            )  
        }
        )
    }
    </LayerGroup>
    </LayersControl.Overlay>
    <LayersControl.Overlay name="Obszar zagrożenia (Hazard Area)">
    <LayerGroup>

    {
        hazardArea?.map( (area, index) => {
            let positions = area.path.split("|").map(p => p.split(","))
            if(area.path_inner)
                positions = positions.concat(area.path_inner?.split("|").map(p => p.split(",")))

            return (
                <Polygon 
                key = {index}
                positions={positions} 
                pathOptions ={{ 
                    color: "FFFFFF",
                    weight: "0",
                    opacity: "0.00",
                    fillColor: "#0000FF",
                    fillOpacity: "0.39"
                }} />
            )
        }
        )
    }
    </LayerGroup>
    </LayersControl.Overlay>
    <LayersControl.Overlay name="Obszar wyłączony">
    <LayerGroup>

    {
        disabledArea?.map( (area, index) => {
            let positions = area.path.split("|").map(p => p.split(","))
            if(area.path_inner)
                positions = positions.concat(area.path_inner?.split("|").map(p => p.split(",")))

            return (
                <Polygon 
                key = {index}
                positions={positions} 
                pathOptions ={{ 
                    color: "FFFFFF",
                    weight: "0",
                    opacity: "0.00",
                    fillColor: area.fillColor,
                    fillOpacity: area.fillOpacity,
                }} />
            )
        }
        )
    }
    </LayerGroup>
    </LayersControl.Overlay>
</LayersControl>
        </MapContainer>
    )
}
export default Map;
