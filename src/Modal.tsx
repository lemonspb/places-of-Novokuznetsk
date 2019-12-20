import React, { useState,useEffect } from 'react'
import { Modal,Form,Input } from 'antd';
import firebases from './services/base'
export interface ModalProp {
    modalOpen:boolean
    modalClose: Function
    latLng:{
        lat:number,
        lng: number
    }
  }


 const  ModalMap = (props:ModalProp)=>{
    const  [text, setText] = useState('')

    const handleCancel = () =>{
        props.modalClose(false)
    }

    const handleOk = () =>{
        props.modalClose(false)

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
          title="Расскажи о месте!"
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
  