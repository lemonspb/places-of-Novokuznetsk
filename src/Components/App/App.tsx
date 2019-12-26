import React, { useState, useEffect, useContext, useRef } from 'react';
import './App.scss';
import { Avatar, Button } from 'antd';
import Leaflet from 'leaflet'
import { Map as LeafletMap, TileLayer, Marker, Popup, ZoomControl, FeatureGroup } from 'react-leaflet'
import ModalMap from '../Modal/Modal'
import Header from '../Header/Header'
import SideBar from '../../Sidebar'
import firebases from '../../services/base'
import { AuthContext } from "../Auth/Auth";




const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [markerInfo, setMarkerInfo] = useState<any>([])
  const [abc, setAbc] = useState<any>([])
  const [centerMap, setCenterMap] = useState<any>([53.757547, 87.136044])
  const [zoomMap, setZoomMap] = useState<number>(11)
  const corner1 = Leaflet.latLng(53.541547, 87.496044)
  const corner2 = Leaflet.latLng(53.957547, 86.911044)
  const [latLng, setLatLng] = useState<any>([])
  const bounds = Leaflet.latLngBounds(corner1, corner2)
  const { currentUser } = useContext(AuthContext);
  const mapRef: any = useRef()
  const groupRef: any = useRef()
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

    firebases.database().ref('placeNVKZ/').once('value', (snapshot) => {
      const listUsers = snapshot.val()
      console.log(snapshot)


      let abc = new Promise((resolve, reject) => {

        resolve(Object.keys(listUsers).filter(k => listUsers[k].dateId === dateIdComment));
      })

      abc
        .then(
          result => firebases.database().ref(`placeNVKZ/${result}`).remove(),
        );

    })
  }

  const changeList = (id: string) => {
    const map = mapRef.current.leafletElement
    const group = groupRef.current.leafletElement

    firebases.database().ref('placeNVKZ/').on('value', (snapshot) => {
      const listUsers = snapshot.val()
      let mapBounds = new Promise((resolve, reject) => {
        resolve(setMarkerInfo(Object.values(listUsers).filter((item: any) => item.id === id)))

      })
      if (id === '') {

        setMarkerInfo(Object.values(listUsers))
        mapBounds.then(() => {
          map.fitBounds(group.getBounds())
        })

      }
      else {

        mapBounds.then(() => {
          map.fitBounds(group.getBounds())
        })


      }
    });

  }


  const goToMarker = (element: any) => {
    setCenterMap(element.latLng)
    setZoomMap(19)
  }

  useEffect(() => {

    firebases.database().ref('placeNVKZ/').on('value', (snapshot) => {
      const listUsers = snapshot.val()

      setMarkerInfo(Object.values(listUsers))
    })
  }, []);
  useEffect(() => {

    const arr: any = []
    markerInfo.filter((elem: any) => {
      if (elem.id === currentUser.uid) {
        arr.push(elem.dateId)
        setAbc([...arr])
      }
    })

  }, []);




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
          {markerInfo ? markerInfo.map((el: any, i: number) => {
            return (
              <Marker position={[el.latLng.lat, el.latLng.lng]} key={i}>
                <Popup onOpen={()=>true}>
                  <div className='popup'>
                    <h1 className='popup__title'>{el.place}</h1>
                    <div className='popup__user-name'> Автор:  <Avatar src={el.avatar || `https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`} /> {el.username}</div>
                    <div className='popup__text'>
                      {el.text}
                    </div>
                    <div className='popup__footer'>

                      <div className='popup__date'> Когда: {el.date}</div>
                      {abc.includes(el.dateId) ? <Button onClick={() => { deleteComment(el.dateId) }}>удалить</Button> : 'gbljh'}

                    </div>
                  </div>
                </Popup>
              </Marker>
            )

          }) : null}
        </FeatureGroup>
      </LeafletMap>
      <ModalMap modalOpen={modalOpen} modalClose={modalClose} latLng={latLng} />
    </div>
  );
}

export default App;
