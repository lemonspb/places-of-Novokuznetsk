import React, { useEffect, useContext, useRef } from 'react';
import { Marker, Popup, } from 'react-leaflet'
import { AuthContext } from "../Auth/Auth"
import { Avatar, Icon } from 'antd';

export interface CustomMarkerProp {
  element: any | null,
  setStoryFromMarker: any,
  setCloseSideBar: any
}

const CustomMarker = (props: CustomMarkerProp) => {
  return (
    <Marker  iconToRender={<Icon type="crown" />}position={[props.element.latLng.lat, props.element.latLng.lng]} onClick={()=>{props.setStoryFromMarker(props.element); props.setCloseSideBar(false)}}>

    </Marker>
  )
}

export default CustomMarker;
