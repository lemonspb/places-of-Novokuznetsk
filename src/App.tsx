import React from 'react';
import './App.scss';
import Leaflet from 'leaflet'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'
const App: React.FC = () => {

  const corner1 = Leaflet.latLng(53.541547, 87.496044)
  const corner2 = Leaflet.latLng(53.957547, 86.911044)
 
  const bounds = Leaflet.latLngBounds(corner1, corner2)


  return (
    <div className="App">
     <LeafletMap
        center={[53.757547, 87.136044]}
        zoom={11}
        minZoom={12}
        maxZoom={16}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
        maxBoundsViscosity={1.0}
        maxBounds={bounds}
      >
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
       <Marker position={[53.757547, 87.136044]}>
          <Popup>
            Popup for any custom information.
          </Popup>
        </Marker>
      </LeafletMap>
    </div>
  );
}

export default App;
