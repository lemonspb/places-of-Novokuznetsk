import React, { useState,useEffect } from 'react'
import firebases from './services/base'
import './Sidebar.scss'

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
            <div className='sidebar__list sidebar-list'>
            <div className='sidebar-list__title'> Список Мест</div>
            {text.map((el:any)=>{
   
                 return(
                <div className='sidebar-list__item' onClick={()=>props.goToMarker(el)}>
                {el.text}
            </div>
              )  
            })}
            
            </div>

        </div>
            </div>  
    );
  }

  export default SideBar
  