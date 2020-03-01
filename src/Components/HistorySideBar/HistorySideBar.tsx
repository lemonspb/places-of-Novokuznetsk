import React, { useState, useEffect } from 'react'
import firebases from '../../services/base'
import './HistorySideBar.scss'
import { List, Avatar, Icon } from 'antd';
import Swiper from 'react-id-swiper';
import { Scrollbars } from 'react-custom-scrollbars';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';

import 'react-tabs/style/react-tabs.css';
export interface HistorySideBar {
    storyFromMarker: any
}


const HistorySideBar = (props: HistorySideBar) => {

console.log(props.storyFromMarker)

  return (
    <>
      <div className='history-sidebar'>
        <div className='history-sidebar__top history-sidebar-top'>
            <div className='history-sidebar-top__userblock history-sidebar-userblock'>
        <Avatar  shape="square" size={100} icon="user" src={props.storyFromMarker.avatar} className='history-sidebar-userblock__avatar'/>
        <div className='history-sidebar-userblock__name'>{props.storyFromMarker.username || 'Неизветсно'}</div>
        </div>
 <div className="history-sidebar-top__title">
        {props.storyFromMarker.place}
    </div>
        </div>

      <Tabs className='history-sidebar__tabs'>
    <TabList className='history-sidebar__tabList'>
      <Tab>История</Tab>
      <Tab>Комментарии</Tab>
    </TabList>

    <TabPanel  className='history-sidebar__tabPanel'>
    <Scrollbars style={{ maxHeight: 90 + "%" }}
              thumbMinSize={30}
              universal={true}
            >
    <div className='history-sidebar__image'>    
   
    <img src={props.storyFromMarker.commentImage} />    
    </div>

    <div className='history-sidebar__text'>
    {props.storyFromMarker && props.storyFromMarker.text}
    </div>
      </Scrollbars>
    </TabPanel>
    <TabPanel>
    </TabPanel>
  </Tabs>

        </div>
        
    </>
  );
}

export default HistorySideBar;