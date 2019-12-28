import React, { useState, useEffect, useContext, useRef } from 'react';
import './App.scss';
import Leaflet from 'leaflet'
import { Map as LeafletMap, TileLayer, ZoomControl, FeatureGroup } from 'react-leaflet'
import ModalMap from '../Modal/Modal'
import Header from '../Header/Header'
import SideBar from '../SideBar/Sidebar'
import firebases from '../../services/base'
import { AuthContext } from "../Auth/Auth"
import CustomMarker from '../CustomMarker/CustomMarker'


const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [markerInfo, setMarkerInfo] = useState<any>([])
  const [currentUserComments, setCurrentUserComments] = useState<any>([])
  const [centerMap, setCenterMap] = useState<any>([53.757547, 87.136044])
  const [openNote, setOpenNote] = useState<any>();
  const [zoomMap, setZoomMap] = useState<number>(11)
  const corner1 = Leaflet.latLng(53.541547, 87.496044)
  const corner2 = Leaflet.latLng(53.957547, 86.911044)
  const [latLng, setLatLng] = useState<any>([])
  const bounds = Leaflet.latLngBounds(corner1, corner2)
  const { currentUser } = useContext(AuthContext);
  const mapRef: any = useRef()
  const groupRef: any = useRef()


  const mapPromise = (array: any) => {
    return new Promise((resolve) => {
      resolve(array)
    })

  }

  const mapGet = (e: any) => {
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

  const deleteComment = (dateIdComment: string) => {
    firebases.database().ref(`placeNVKZ/${dateIdComment}`).remove()
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


  const goToMarker = (element: any) => {
    setCenterMap(element.latLng)
   
    mapPromise( setZoomMap(19)).then(()=>{
      setOpenNote(element)
    })
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
        .filter((e: any) => e.userId === currentUser.uid)
        .map((e: any) => e.commentId)
      );
    }
  }, [markerInfo, currentUser]);



  return (
    <div className="App">
      <Header />
      <SideBar goToMarker={goToMarker} changeList={changeList} listPlace={markerInfo} />
      <LeafletMap
        ref={mapRef}
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
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <FeatureGroup ref={groupRef}>
          {markerInfo && markerInfo.map((el: any) => {
            return(
              <CustomMarker  element={el}  currentUserComments={currentUserComments}  deleteComments={deleteComment} openNote={openNote} setOpenNote={setOpenNote}/>
            )

          

          })}
        </FeatureGroup>
      </LeafletMap>
      <ModalMap modalOpen={modalOpen} modalClose={modalClose} latLng={latLng} />
    </div>
  );
}

export default App;
