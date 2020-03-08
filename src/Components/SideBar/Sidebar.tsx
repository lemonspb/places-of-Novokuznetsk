import React, { useState, useEffect } from 'react'
import firebases from '../../services/base'
import './Sidebar.scss'
import { List, Avatar, Icon } from 'antd';
import Swiper from 'react-id-swiper';
import { Scrollbars } from 'react-custom-scrollbars';
import HistorySideBar from '../HistorySideBar/HistorySideBar';

export interface SidebarProp {
  goToMarker: Function
  changeList: Function
  listPlace: any
  setStoryFromMarker: any,
  storyFromMarker: any
  closeSideBar: any,
  setCloseSideBar: any,
  deleteComment: any
}


const SideBar = (props: SidebarProp) => {
  const [place, setPlace] = useState<any>([])
  let tmpArray: any = [];
  const params = {
    slidesPerView: 3,
    spaceBetween: 30,
    shouldSwiperUpdate: true,
    resistance: true,
    resistanceRatio: 0.30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    renderPrevButton: () => <div className="swiper-button-prev"><Icon type="left" /></div>,
    renderNextButton: () => <div className="swiper-button-next"><Icon type="right" /></div>,
  }

 console.log()

  useEffect(() => {

    firebases.database().ref('placeNVKZ/').on('value', (snapshot) => {
      const listUsers = snapshot.val()
      setPlace(Object.values(listUsers).map((el: any) => el))

    });

  }, []);

  function itemCheck(item: any) {

    if (tmpArray.indexOf(item) === -1) {
      tmpArray.push(item);
      return true
    }
    return false;
  }


  return (
    <>
      <div className={`sidebar 
      ${props.closeSideBar 
      ? 'active-menu-true' 
      : 'active-menu-false'}`}>
        <div onClick={() => props.setCloseSideBar(!props.closeSideBar)} className='sidebar__toggle'>
          <Icon type="caret-right" className={`
          ${props.closeSideBar 
          ? 'sidebar__toggle--open' 
          : 'sidebar__toggle--close'}`} />
          </div>
        <div className='sidebar__inner'>
          <div className='sidebar__list sidebar-list sidebar-list--history' >
            <div className='sidebar-list__title'>Истории</div>
            <div className='sidebar-list__swiper'>

              <Swiper {...params} >
                {place.filter((item: any) => itemCheck(item.userId)).map((el: any, i: number) => {
                  let abc = props.listPlace.every((info:any)=>info.userId==el.userId)
                  return (
                    <div className='sidebar-list__user' onClick={(() => props.changeList(el.userId))} key={i}>
                     <Avatar size="large"icon="user" src={el.avatar} className={`sidebar-list__avatar 
                     ${abc?'sidebar-list__avatar--active':''}`}/> 
                      <span className='sidebar-list__name'>{el.username ? el.username : 'неизвестно'}</span>
                    </div>
                  )
                })}
              </Swiper>
            </div>

          </div>
          <div className='sidebar__list sidebar-list sidebar-list--place' id='sidebar-scroll'>
            <div className='sidebar-list__title'>Места 
            {place.length > props.listPlace.length 
              ? <span className='sidebar-list__see-all' onClick={(() => props.changeList(''))}>Смотреть все</span> 
              : ''}</div>
            <Scrollbars style={{ maxHeight: 90 + "%" }}
              thumbMinSize={30}
              universal={true}
            >
              <List size="large">
                {props.listPlace.length !== 0 &&
                  props.listPlace.map((el: any, i: number) => {
                  return (
                    <div className='sidebar-list__item' onClick={() => {props.goToMarker(el);props.setStoryFromMarker(el)}} key={i}>
                      {i + 1}. {el.place}

                    </div>
                  )
                })} 
                
              </List>
            </Scrollbars>
          </div>

        </div>
      </div>
      {props.storyFromMarker && 
      <HistorySideBar 
      setStoryFromMarker={props.setStoryFromMarker} 
      storyFromMarker={props.storyFromMarker}  
      setCloseSideBar={props.setCloseSideBar} 
      closeSideBar={props.closeSideBar} 
      deleteComment={props.deleteComment}
      />}
      
   </>
  );
}

export default SideBar
