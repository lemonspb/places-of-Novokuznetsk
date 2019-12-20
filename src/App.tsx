import React,{useState,useEffect} from 'react';
import './App.scss';
import Leaflet from 'leaflet'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'
import ModalMap from './Modal'
import firebases from './services/base'




const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [markerInfo, setMarkerInfo]= useState<any>([])
  const corner1 = Leaflet.latLng(53.541547, 87.496044)
  const corner2 = Leaflet.latLng(53.957547, 86.911044)
  const [latLng, setLatLng] = useState<any>([])
  const bounds = Leaflet.latLngBounds(corner1, corner2)

  const mapGet = (e:any) =>{
    let arr= {}
    arr = {
      lat:e.latlng.lat,
      lng:e.latlng.lng
    }
    setModalOpen(true)
    setLatLng(arr)
  }

  const modalClose = () =>{
    setModalOpen(false)
  }
  
  useEffect(() => {
   
 

    firebases.database().ref('placeNVKZ/').on('value', (snapshot) => {
        const listUsers = snapshot.val()
        setMarkerInfo(Object.values(listUsers).map((el:any)=>el))
        
        });
    }, []);

  
  return (
    <div className="App" >
     <LeafletMap
       onClick={mapGet}
        center={[53.757547, 87.136044]}
        zoom={11}
        minZoom={12}
        maxZoom={18}
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

      {markerInfo?markerInfo.map((el:any)=>{
        
        return(
        <Marker position={[el.lat, el.lng]} >
          <Popup>
          {el.text}
          </Popup>
        </Marker>
        )

      }):null}
       
      </LeafletMap>
      <ModalMap modalOpen={modalOpen} modalClose={modalClose}  latLng={latLng} />
    </div>
  );
}

export default App;
