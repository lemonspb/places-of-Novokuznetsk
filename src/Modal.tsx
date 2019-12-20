import React, { useState,useEffect } from 'react'
import { Modal } from 'antd';
import firebases from './services/base'
export interface ModalProp {
    modalOpen:boolean
    modalClose: Function
    getMarkerInfo:Function
    latLng:any
  }


 const  ModalMap = (props:ModalProp)=>{
console.log(firebases)
    const  [text, setText] = useState('')

    const handleCancel = () =>{
        props.modalClose(false)
    }

    const handleOk = () =>{
        props.modalClose(false)
        console.log(text)
       const markerObject ={
        lat:props.latLng.lat,
        lng:props.latLng.lng,
        text
       }
       props.getMarkerInfo(markerObject)
    }
    const  handleChange = (e:any) =>{
        setText(e.target.value)
        console.log(props.latLng.lat)
    }

    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={props.modalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
         >
             <input type="text"  onChange={handleChange}/>
        </Modal>
      </div>
    );
  }

  export default ModalMap