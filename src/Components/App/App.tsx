import React,{useState,useEffect,useContext} from 'react';
import './App.scss';
import { Avatar } from 'antd';
import Leaflet from 'leaflet'
import { AuthContext } from "../Auth/Auth";
import { Map as LeafletMap, TileLayer, Marker, Popup,ZoomControl } from 'react-leaflet'
import ModalMap from '../Modal/Modal'
import Header from '../Header/Header'
import SideBar from '../../Sidebar'
import firebases from '../../services/base'




const App: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [markerInfo, setMarkerInfo]= useState<any>([])
  const [centerMap, setCenterMap] = useState<any>([53.757547, 87.136044])
  const [zoomMap, setZoomMap] = useState<number>(11)
  const corner1 = Leaflet.latLng(53.541547, 87.496044)
  const corner2 = Leaflet.latLng(53.957547, 86.911044)
  const [latLng, setLatLng] = useState<any>([])
  const bounds = Leaflet.latLngBounds(corner1, corner2)
  
  const mapGet = (e:any) =>{
    console.log('dfd')
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
  
  const  changeList =(id:string) =>{
    firebases.database().ref('placeNVKZ/').on('value', (snapshot) => {
      const listUsers = snapshot.val()
      if(id ===''){
        setMarkerInfo(Object.values(listUsers).map((el:any)=>el))

      }
      else{
      setMarkerInfo(Object.values(listUsers).map((el:any)=>el).filter((item:any)=>item.id === id))
      }
      });
    
  }

  const goToMarker = (element:any) =>{
    setCenterMap([element.lat, element.lng])
    setZoomMap(19)
  }
  
  useEffect(() => {
  
    firebases.database().ref('placeNVKZ/').on('value', (snapshot) => {
        const listUsers = snapshot.val()
      
        setMarkerInfo(Object.values(listUsers).map((el:any)=>el))
        
        });
    }, []);

  
  return (
    <div className="App" >
      <Header />
      <SideBar goToMarker={goToMarker} changeList={changeList} listPlace={markerInfo} />
     <LeafletMap
         onClick={mapGet}
        center={centerMap}
        zoom={zoomMap}
        minZoom={12}
        maxZoom={19}
        attributionControl={true}
        zoomControl={false}
        doubleClickZoom={false}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
        duration={1}
        maxBoundsViscosity={1.0}
        maxBounds={bounds}
      >
        <ZoomControl position="bottomright">
        </ZoomControl>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />

      {markerInfo?markerInfo.map((el:any)=>{
        
        return(
        <Marker position={[el.lat, el.lng]} >
          <Popup>
            <div className='popup'>
            <h1 className='popup__title'>{el.place}</h1>
            <div className='popup__user-name'> Автор:  <Avatar src={el.avatar || `https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`} /> {el.username}</div>
            <div className='popup__text'>
            {el.text}
            </div>
             <div className='popup__footer'>
        
            <div className='popup__date'> Когда: {el.date}</div>
            </div>
            </div>
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
