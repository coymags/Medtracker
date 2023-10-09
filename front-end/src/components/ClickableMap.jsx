import { useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet library
import useStore from '../data/Store'


function ClickableMap() {

  const { setMapEventLocation } = useStore()

  function handleMapClick(event) {
    // Handle click event here
    console.log('Map clicked:', event.latlng)

    const newMarker = L.marker([event.latlng.lat, event.latlng.lng]).addTo(map)
    setMapEventLocation(newMarker._latlng)
  }

  const map = useMapEvents({
    click: handleMapClick, // Attach the click event handler
  });

  
  return null; // This component doesn't render anything visible
}

export default ClickableMap