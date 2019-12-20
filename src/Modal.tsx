import React, { useState,useEffect } from 'react'
import { Modal,Form,Input } from 'antd';
import firebases from './services/base';
import  WrappedNormalLoginForm from './FormModal'
export interface ModalProp {
    modalOpen:boolean
    modalClose: Function
    latLng:{
        lat:number,
        lng: number
    }
  }


 const  ModalMap = (props:any)=>{
    const  [text, setText] = useState('')

    const handleCancel = () =>{
        props.modalClose(false)
    }

    const handleOk = () =>{
        props.modalClose(false)


    }
 

    return (
      <div>
        <Modal
          title="Расскажи о месте!"
          visible={props.modalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
         >
             
             <WrappedNormalLoginForm>
                {props.latLng}

             </WrappedNormalLoginForm>
        </Modal>
      </div>    
    );
  }

  export default ModalMap
  