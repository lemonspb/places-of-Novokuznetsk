import React, { useState,useEffect } from 'react'
import { Modal } from 'antd';

export interface ModalProp {
    modalOpen:boolean
    modalClose: Function
  }


 const  ModalMap = (props:ModalProp)=>{

    const handleCancel = () =>{
        props.modalClose(false)
    }

    const handleOk = () =>{
        props.modalClose(false)
    }

    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={props.modalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
         >
             
        </Modal>
      </div>
    );
  }

  export default ModalMap