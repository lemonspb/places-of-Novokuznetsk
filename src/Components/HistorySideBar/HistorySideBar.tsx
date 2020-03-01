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
        <Avatar size={64} icon="user" src={props.storyFromMarker.avatar} />
        <div className='history-sidebar-top__name'>{props.storyFromMarker.username || 'Неизветсно'}</div>
 <div className="history-sidebar-top__title">
        
    </div>
        </div>

      <Tabs>
    <TabList>
      <Tab>История</Tab>
      <Tab>Комментарии</Tab>
    </TabList>

    <TabPanel>
      {props.storyFromMarker && props.storyFromMarker.text}
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>

        </div>
        
    </>
  );
}

export default HistorySideBar;