import React, { useState,useEffect } from 'react'
import { Modal } from 'antd';
import firebases from './services/base'
export interface ModalProp {
    modalOpen:boolean
    modalClose: Function
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
    
       const rootRef = firebases.database().ref();
       const storesRef = rootRef.child("placeNVKZ/" + new Date().toLocaleString());
       firebases
       .database()
       .ref(`/placeNVKZ/`)
       .push({
        lat:props.latLng.lat,
        lng:props.latLng.lng,
        text,
        date: new Date().toLocaleString()
       });

    }
    const  handleChange = (e:any) =>{
        setText(e.target.value)
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