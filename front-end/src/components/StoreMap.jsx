import React from 'react'
import { useNavigate } from 'react-router';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import useStore from '../data/Store';



function StoreMap() {
    const navigate = useNavigate()
    const { userLocation } = useStore()
    const { locationData } = useStore()
    console.log(userLocation)
  

  return (
    <>
        <button className="p-2 font-bold text-white bg-slate-900" onClick={() => navigate('/')}>Back</button>
        <MapContainer center={[11.910725492857164, 121.53433844447139]} zoom={4} className="w-full h-[40rem] z-50" >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            /> 
            <Marker position={[locationData.latitude, locationData.longitude]}>
                <Popup>{locationData.pharmacy_name}</Popup>
            </Marker>
            <Marker position={[userLocation.latitude, userLocation.longitude]}>
                <Popup>This is you</Popup>
            </Marker>
        </MapContainer>

    </>
  )
}

export default StoreMap