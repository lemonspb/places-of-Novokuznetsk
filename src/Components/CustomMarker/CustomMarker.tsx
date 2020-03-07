import React, { useState, useEffect, useRef } from 'react';
import { Marker } from 'react-leaflet'
import L from 'leaflet'


export interface CustomMarkerProp {
  element: any | null,
  setStoryFromMarker: any,
  setCloseSideBar: any,
  storyFromMarker: any,
}

const CustomMarker = (props: CustomMarkerProp) => {

const [activeMarkers, setActiveMarkers ] = useState(false)

  useEffect(() => {
  if(props.storyFromMarker?.commentId === props.element.commentId){
    setActiveMarkers(true)
  }
  else{
    setActiveMarkers(false)
  }
  }, [props.storyFromMarker]);
  
  
const activeMarker = new L.Icon({
  iconUrl: require('../../Svg/activeMarker.svg'),
});
const defaultMarker = new L.Icon({
  iconUrl: require('../../Svg/defaultMarker.svg'),
});

  return (
    <Marker 
    icon={activeMarkers?activeMarker:defaultMarker} 
    position={[props.element.latLng.lat, props.element.latLng.lng]} 
    onClick={()=>{props.setStoryFromMarker(props.element); props.setCloseSideBar(false)}}>
    </Marker>
  )
}

export default CustomMarker;
