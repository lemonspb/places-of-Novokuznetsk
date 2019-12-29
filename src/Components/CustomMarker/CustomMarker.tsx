import React, { useState, useEffect, useContext, useRef } from 'react';
import Leaflet from 'leaflet'
import {  Marker, Popup,  } from 'react-leaflet'
import { AuthContext } from "../Auth/Auth"
import { Avatar, Icon } from 'antd';

export interface CustomMarkerProp {
  element: any,
  currentUserComments: any,
  deleteComments: Function

}



const CustomMarker =  (props:CustomMarkerProp) =>{

  
const {currentUser} = useContext(AuthContext)
const   markerRef:any = useRef();

    return (
        <Marker position={[props.element.latLng.lat, props.element.latLng.lng]} ref={markerRef} >
          <Popup   >
            <div className='popup'>
              <h1 className='popup__title'>{props.element.place}</h1>
              <div className='popup__user-name'> Автор:  <Avatar src={props.element.avatar || `https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`} /> {props.element.username}</div>
              <div className='popup__text'>
                {props.element.text}
              </div>
              <div className='popup__footer'>

                <div className='popup__date'> Когда: {props.element.date}</div>

                {currentUser && props.currentUserComments.includes(props.element.commentId) ? <div onClick={() => { props.deleteComments(props.element.commentId) }} className='popup__delete'><Icon type="delete" /></div> : null}

              </div>
            </div>
          </Popup>
        </Marker>
      )
}

export default CustomMarker;
