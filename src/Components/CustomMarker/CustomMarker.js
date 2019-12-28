import React, { useState, useEffect, useContext, useRef } from 'react';
import Leaflet from 'leaflet'
import { Map as LeafletMap, TileLayer, Marker, Popup, ZoomControl, FeatureGroup } from 'react-leaflet'
import firebases from '../../services/base'
import { AuthContext } from "../Auth/Auth"
import { Avatar, Icon } from 'antd';


const CustomMarker =  ({element,deleteComment,currentUserCommentns}) =>{

const {currentUser} = useContext(AuthContext)
const   markerpRef = useRef();

    return (
        <Marker position={[element.latLng.lat, element.latLng.lng]} ref={markerpRef} >
          <Popup >
            <div className='popup'>
              <h1 className='popup__title'>{element.place}</h1>
              <div className='popup__user-name'> Автор:  <Avatar src={element.avatar || `https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`} /> {element.username}</div>
              <div className='popup__text'>
                {element.text}
              </div>
              <div className='popup__footer'>

                <div className='popup__date'> Когда: {element.date}</div>

                {currentUser && currentUserCommentns.includes(element.commentId) ? <div onClick={() => { deleteComment(element.commentId) }} className='popup__delete'><Icon type="delete" /></div> : null}

              </div>
            </div>
          </Popup>
        </Marker>
      )
}

export default CustomMarker;
