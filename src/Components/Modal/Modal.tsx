import React, {  } from 'react'
import { Modal } from 'antd';
import './Modal.scss'
import  WrappedNormalLoginForm from '../FormModal/FormModal'
export interface ModalProp {
    modalOpen:boolean
    modalClose: Function
    latLng:{
        lat:number,
        lng: number
    }
  }


 const  ModalMap = (props:ModalProp)=>{

    const handleCancel = () =>{
        props.modalClose(false)
    }

    return (
      <div>
        <Modal
          title="Расскажи о месте!"
          visible={props.modalOpen}
          onCancel={handleCancel}
          className='modal-story'
         >
             
             <WrappedNormalLoginForm>
                {props.latLng}
                {props.modalClose}
             </WrappedNormalLoginForm>
        </Modal>
      </div>    
    );
  }

  export default ModalMap
  