import React, { useState, useEffect } from 'react'
import firebases from './services/base'
import './Sidebar.scss'
import { List,Avatar  } from 'antd';
import Swiper from 'react-id-swiper';
export interface SidebarProp {
  goToMarker: Function
  changeList: Function
  listPlace: any
}


const SideBar = (props: SidebarProp) => {
  const [place, setPlace] = useState<any>([])
  let tmpArray:any = [];
  const params = {
    slidesPerView: 3,
    spaceBetween: 30,
    shouldSwiperUpdate: true
  }

  useEffect(() => {

    firebases.database().ref('placeNVKZ/').on('value', (snapshot) => {
      const listUsers = snapshot.val()
      setPlace(Object.values(listUsers).map((el: any) => el))

    });
    
  }, [firebases.database()]);

function itemCheck(item:any) {
  
    if (tmpArray.indexOf(item) === -1) {
        tmpArray.push(item);
        return true
    }
    return false;
}




  return (
    <div className='sidebar'>
      <div className='sidebar__inner'>
        <div className='sidebar__list sidebar-list sidebar-list--history' >
          <div className='sidebar-list__title'>Истории</div>
          <div className='sidebar-list__swiper'>
            <Swiper {...params} >
            {place.filter((item:any) => itemCheck(item.id)).map((el: any) => {
              return (
               <div className='sidebar-list__user' onClick={(()=>props.changeList(el.id))}>

                 {el.avatar?<Avatar size="large" src={el.avatar} />:<Avatar size="large" icon="user" />} 
                  
              <span className='sidebar-list__name'>{el.username}</span> 
               </div>  
              )
            })}
            </Swiper>
          </div>

        </div>
        <div className='sidebar__list sidebar-list sidebar-list--place' id='sidebar-scroll'>
          <div className='sidebar-list__title'>Места <span className='sidebar-list__see-all' onClick={(()=>props.changeList(''))}>Смотреть все</span></div>
          <List size="large">
            {props.listPlace.map((el:any,i:number) => {
              return (
                <List.Item className='sidebar-list__item' onClick={() => props.goToMarker(el)} key={i}>
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
