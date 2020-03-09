import React, { useState, useEffect, useContext, useRef } from 'react';
import './App.scss';
import Leaflet from 'leaflet'
import { Map as LeafletMap, TileLayer, ZoomControl, FeatureGroup } from 'react-leaflet'
import ModalMap from '../Modal/Modal'
import Header from '../Header/Header'
import SideBar from '../SideBar/Sidebar'
import firebases from '../../services/base'
import { AuthContext } from "../Auth/Auth"
import MobileSideBar from '../SideBar/MobileSideBar'
import  CustomMarker  from '../CustomMarker/CustomMarker'

  interface IComment {
  avatar: string;
  commentId:  string;
  commentImage: string;
  date:string;
  latLng:{
   lat: number,
   lng: number 
  }
  place:string;
  text:string;
  userId: string;
  username:string;
}


const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [markerInfo, setMarkerInfo] = useState<any>([])
  const [currentUserComments, setCurrentUserComments] = useState<any>([])
  const [openNote, setOpenNote] = useState<any>();
  const [storyFromMarker, setStoryFromMarker] = useState()
  const [zoomMap, setZoomMap] = useState(11)
  const corner1 = Leaflet.latLng(53.541547, 87.496044)
  const corner2 = Leaflet.latLng(53.957547, 86.911044)
  const [latLng, setLatLng] = useState<any>([])
  const [closeSideBar, setCloseSideBar] = useState(false)
  const [isMarkerOpen, setIsMarkerOpen] = useState(false)
  const bounds = Leaflet.latLngBounds(corner1, corner2)
  const { currentUser } = useContext(AuthContext);
  const mapRef: any = useRef(null)
  const groupRef: any = useRef(null)

  const mapPromise = (array: any) => {
    return new Promise((resolve) => {
      resolve(array)
    })

  }

  const mapGet = (e:any) => {
    let arr = {}
    arr = {
      lat: e.latlng.lat,
      lng: e.latlng.lng
    }
    setModalOpen(true)
    setLatLng(arr)

  }

  const modalClose = () => {
    setModalOpen(false)
  }

  const deleteComment = (element:IComment) => {
    firebases.database().ref(`placeNVKZ/${element.commentId}`).remove()
  }


  const changeList = (id: string) => {
    const group = groupRef.current.leafletElement
    const map = mapRef.current.leafletElement
    firebases.database().ref('placeNVKZ/').on('value', (snapshot) => {

      const listUsers = snapshot.val()
      const notes = Object.values(listUsers);
      const filteredNotes = id
        ? notes.filter((item: any) => item.userId === id)
        : notes;

      mapPromise(setMarkerInfo(filteredNotes)).then(() => {
        if (Object.keys(group.getBounds()).length === 0) {
          setMarkerInfo(notes);
        } else {
          map.fitBounds(group.getBounds());
        }
      })
    });
  }

  const goToMarker = (element: IComment) => {
              mapRef.current.leafletElement
              .panTo(new Leaflet.LatLng(element.latLng.lat, element.latLng.lng))
              setZoomMap(19);
  }

  useEffect(() => {
    
    firebases.database().ref('placeNVKZ/').on('value', (snapshot) => {
      const notes = snapshot.val()

      setMarkerInfo(Object.values(notes))
    })
  }, []);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserComments(markerInfo
        .filter((e: IComment) => e.userId === currentUser.uid)
        .map((e: IComment) => e.commentId)
      );
    }
  }, [markerInfo, currentUser]);



  return (
    <div className="App">
      <Header />
      <SideBar 
      goToMarker={goToMarker} 
      changeList={changeList} 
      listPlace={markerInfo} 
      setStoryFromMarker={setStoryFromMarker} 
      storyFromMarker={storyFromMarker}
      setCloseSideBar={setCloseSideBar}
      closeSideBar={closeSideBar}
      deleteComment={deleteComment}
      />
      <MobileSideBar goToMarker={goToMarker} changeList={changeList} listPlace={markerInfo}  />
      <LeafletMap
        ref={mapRef}
        onClick={mapGet}
        center={[53.757547, 87.136044]}
        zoom={zoomMap}
        minZoom={10}
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
        {window.innerWidth < 767 ? <ZoomControl position="topleft" /> : <ZoomControl position="bottomright" />}

        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <FeatureGroup ref={groupRef}>
          {markerInfo && markerInfo.map((el: any,i:number) => {
            return (
                <CustomMarker 
                element={el} 
                storyFromMarker={storyFromMarker} 
                setStoryFromMarker={setStoryFromMarker} 
                setCloseSideBar={setCloseSideBar}/>
            )

          })}
        </FeatureGroup>
      </LeafletMap>
      <ModalMap 
      modalOpen={modalOpen} 
      modalClose={modalClose} 
      latLng={latLng} />
    </div>
  );
}

export default App;
