import "../index.css";
import icon from "../icons/placeholder.png"
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { Icon, divIcon, point } from "leaflet";
{/*

// create custom icon
const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: icon,
  iconSize: [38, 38] // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

// markers
const markers = [
  {
    geocode: [48.86, 2.3522],
    popUp: "Hello, I am pop up 1"
  },
  {
    geocode: [48.85, 2.3522],
    popUp: "Hello, I am pop up 2"
  },
  {
    geocode: [48.855, 2.34],
    popUp: "Hello, I am pop up 3"
  }
];

export default function App() {
  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={13}>
      {/* OPEN STREEN MAPS TILES */} {/*
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {/* Mapping through the markers */} {/*
        {markers.map((marker) => (
          <Marker key={marker.geocode} position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}


      </MarkerClusterGroup>
    </MapContainer>
  );
}

*/}

function App(){

  function handleMapClick(e) {
    console.log('here')
    console.log(e)
  }

  return(
    <MapContainer center={[51.505, -0.09]} zoom={13} className="w-full h-[40rem]" onClick={handleMapClick} >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  )
}

export default App