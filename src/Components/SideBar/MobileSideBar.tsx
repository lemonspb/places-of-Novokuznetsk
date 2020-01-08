import React, { useState, useEffect } from 'react'
import firebases from '../../services/base'
import './Sidebar.scss'
import { List,Avatar,Icon } from 'antd';
import Swiper from 'react-id-swiper';

export interface SidebarProp {
  goToMarker: Function
  changeList: Function
  listPlace: any
}


const MobileSideBar = (props: SidebarProp) => {
  const [place, setPlace] = useState<any>([])
  const [closesideBar, setCloseSideBar] = useState(false)
  let tmpArray:any = [];
  const params = {
    slidesPerView: 4,
    spaceBetween: 40,
    shouldSwiperUpdate: true,
    resistance:true,
    resistanceRatio: 0.30,
    navigation: {
        nextEl: '.swiper-button-next-mobile-top',
        prevEl: '.swiper-button-prev-mobile-top',
      },
      renderPrevButton: () => <div className="swiper-button-prev-mobile-top"><Icon type="left" /></div>,
      renderNextButton: () => <div className="swiper-button-next-mobile-top"><Icon type="right" /></div>,
    }

  
  const params2 = {
    slidesPerView: 1,
    spaceBetween: 50,
    shouldSwiperUpdate: true,
    resistance:true,
    resistanceRatio: 0.30,
    navigation: {
        nextEl: '.swiper-button-next-mobile-bottom',
        prevEl: '.swiper-button-prev-mobile-bootom',
      },
      renderPrevButton: () => <div className="swiper-button-prev-mobile-bottom"><Icon type="left" /></div>,
      renderNextButton: () => <div className="swiper-button-next-mobile-bottom"><Icon type="right" /></div>,
    }
  


  const closeSideBar = () =>{
    setCloseSideBar(!closesideBar)
  }

  useEffect(() => {

    firebases.database().ref('placeNVKZ/').on('value', (snapshot) => {
      const listUsers = snapshot.val()
      setPlace(Object.values(listUsers).map((el: any) => el))

    });
    
  }, []);

function itemCheck(item:any) {
  
    if (tmpArray.indexOf(item) === -1) {
        tmpArray.push(item);
        return true
    }
    return false;
}




  return (
    <>
    <div className={`mobile-sidebar ${closesideBar?'mobile-sidebar__close':'mobile-sidebar__open'}`}>
    <div onClick={closeSideBar} className='mobile-sidebar__toggle'><Icon type="caret-up" className={`${closesideBar?'mobile-sidebar__toggle--open':'mobile-sidebar__toggle--close'}`} /></div>

        <div className='mobile-sidebar__history mobile-sidebar-history'>
          <div className='mobile-sidebar-history__title'>Истории</div>
          <div className='mobile-sidebar-history__swiper'>
            
            <Swiper {...params} >
            {place.filter((item:any) => itemCheck(item.userId)).map((el: any,i:number) => {
              return (
               <div className='mobile-sidebar-history__user' onClick={(()=>props.changeList(el.userId))} key={i}>

                 {el.avatar?<Avatar size="large" src={el.avatar} />:<Avatar size="large" icon="user" />} 
                  
              <span className='mobile-sidebar-history__name'>{el.username}</span> 
               </div>  
              )
            })}
            </Swiper>
          </div>
    </div>
    <div className='mobile-sidebar__place mobile-sidebar-place'>
          <div className='mobile-sidebar-place__title'>Места <span className='mobile-sidebar-place__see-all' onClick={(()=>props.changeList(''))}>Смотреть все</span></div>
          <Swiper {...params2}>
          {props.listPlace.map((el:any,i:number) => {
              return (
                <div className='mobile-sidebar-place__item' onClick={() => props.goToMarker(el)} key={i}>
                 {i+1}. {el.place}
                  
                </div>
              )
            })}
           </Swiper>
        </div>
   </div>
    
    </>
  );
}

export default MobileSideBar
