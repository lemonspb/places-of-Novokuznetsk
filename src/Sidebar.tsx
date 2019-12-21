import React, { useState,useEffect } from 'react'
import firebases from './services/base'
import './Sidebar.scss'
import { List } from 'antd';

export interface SidebarProp {
    goToMarker: Function
  }


 const  SideBar = (props:SidebarProp)=>{
    const  [text, setText] = useState<any>([])

    useEffect(() => {
  
    firebases.database().ref('placeNVKZ/').on('value', (snapshot) => {
        const listUsers = snapshot.val()
        setText(Object.values(listUsers).map((el:any)=>el))
        
        });
    }, []);

    return (
      <div className='sidebar'>
        <div className='sidebar__inner'>
            <div className='sidebar__list sidebar-list' id='sidebar-scroll'>
            <div className='sidebar-list__title'>Места</div>     
    <List size="large">   
            {text.map((el:any)=>{
                 return(
                <List.Item className='sidebar-list__item' onClick={()=>props.goToMarker(el)}>
                {el.place}
            </List.Item>
              )  
            })}
            </List>
            </div>

        </div>
            </div>  
    );
  }

  export default SideBar
  