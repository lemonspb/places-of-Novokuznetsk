import React, { useState, useEffect } from 'react'
import firebases from '../../services/base'
import './Sidebar.scss'
import { List, Avatar, Icon } from 'antd';
import Swiper from 'react-id-swiper';
import { Scrollbars } from 'react-custom-scrollbars';

export interface SidebarProp {
  goToMarker: Function
  changeList: Function
  listPlace: any
}


const SideBar = (props: SidebarProp) => {
  const [place, setPlace] = useState<any>([])
  const [closesideBar, setCloseSideBar] = useState(false)
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

  const closeSideBar = () => {
    setCloseSideBar(!closesideBar)
  }

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
      ${closesideBar 
      ? 'active-menu-true' 
      : 'active-menu-false'}`}>
        <div onClick={closeSideBar} className='sidebar__toggle'>
          <Icon type="caret-right" className={`
          ${closesideBar 
          ? 'sidebar__toggle--open' 
          : 'sidebar__toggle--close'}`} />
          </div>
        <div className='sidebar__inner'>
          <div className='sidebar__list sidebar-list sidebar-list--history' >
            <div className='sidebar-list__title'>Истории</div>
            <div className='sidebar-list__swiper'>

              <Swiper {...params} >
                {place.filter((item: any) => itemCheck(item.userId)).map((el: any, i: number) => {
                  return (
                    <div className='sidebar-list__user' onClick={(() => props.changeList(el.userId))} key={i}>

                      {el.avatar ? <Avatar size="large" src={el.avatar} /> : <Avatar size="large" icon="user" />}

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
                    <div className='sidebar-list__item' onClick={() => props.goToMarker(el)} key={i}>
                      {i + 1}. {el.place}

                    </div>
                  )
                })} 
                
              </List>
            </Scrollbars>
          </div>

        </div>
      </div>
    </>
  );
}

export default SideBar
