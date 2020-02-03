import React, { useEffect, useContext, useRef } from 'react';
import { Marker, Popup, } from 'react-leaflet'
import { AuthContext } from "../Auth/Auth"
import { Avatar, Icon } from 'antd';

export interface CustomMarkerProp {
  element: any | null,
  currentUserComments: any,
  deleteComments: (element: any) => void,
  openNote: any,
  setOpenNote: any
}

const CustomMarker = (props: CustomMarkerProp) => {
  const { currentUser } = useContext(AuthContext)
  const markerRef: any = useRef(null);
  const imageRef: any = useRef(null)
  const popupRef: any = useRef(null)
  useEffect(() => {

    if (!markerRef.current || props.element !== props.openNote) return;

    markerRef.current.leafletElement.openPopup()


  }, [props.openNote, markerRef, props.element]
  )
  return (
    <Marker position={[props.element.latLng.lat, props.element.latLng.lng]} ref={markerRef} >
      <Popup onOpen={() => { props.setOpenNote(props.element) }} ref={popupRef}>
        <div className='popup'>
          <h1 className='popup__title'>{props.element.place}</h1>
          <div className='popup__user-name'> Автор:  {props.element.avatar 
            ? <Avatar size="large" src={props.element.avatar} /> 
            : <Avatar size="large" icon="user" />}  {props.element.username}</div>
          {props.element.commentImage 
            ? <img src={props.element.commentImage} alt="" className='popup__image' ref={imageRef} /> 
            : null}
          <div className='popup__text'>
            {props.element.text}
          </div>
          <div className='popup__footer'>

            <div className='popup__date'> Дата: {props.element.date}</div>

            {currentUser && props.currentUserComments.includes(props.element.commentId) 
              ? <div onClick={() => { props.deleteComments(props.element) }} className='popup__delete'><Icon type="delete" /></div> 
              : null}

          </div>
        </div>

      </Popup>
    </Marker>
  )
}

export default CustomMarker;
