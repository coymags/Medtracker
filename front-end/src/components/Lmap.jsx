import { useEffect } from "react";
import "../index.css";
import icon from "../icons/placeholder.png"
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from 'leaflet'

import { Icon, divIcon, point } from "leaflet";

import ClickableMap from "./ClickableMap";
import useStore from "../data/Store";


function Lmap(){

  const { mapEventLocation } = useStore()
  // console.log(mapEventLocation)
  return(
    <MapContainer center={[11.910725492857164, 121.53433844447139]} zoom={5} className="w-full h-[40rem] z-50" >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ClickableMap/> 
    </MapContainer>
  )
  
 
}

export default Lmap


