import React, { useState,useEffect, useContext } from 'react'
import { AuthContext } from "../Auth/Auth"
import './HistorySideBar.scss'
import { Avatar, Icon } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CommentList from '../CommentList/CommentList'
import 'react-tabs/style/react-tabs.scss';
import firebases from '../../services/base'



export interface HistorySideBar {
    storyFromMarker: any,
    closeSideBar: any,
    setCloseSideBar: any,
    setStoryFromMarker: any,
    deleteComment: any
    listPlace: any
}


const HistorySideBar = (props: HistorySideBar) => {


    const { currentUser } = useContext(AuthContext);
    const [commentList, setCommentList] = useState<any>([])

    useEffect(() => {

        firebases.database().ref(`/placeNVKZ/${props.storyFromMarker.commentId}/answers/`).on('value', (snapshot) => {
          if (snapshot.val()) {
            const comments = snapshot.val()
            setCommentList(Object.values(comments))
          }
          else {
            setCommentList([])
    
          }
        })
        return () => {
          setCommentList([])
        };
      }, [props.storyFromMarker]);


    return (
        <>
            <div className={`history-sidebar
                    ${props.closeSideBar
                    ? 'history-sidebar__menu-true'
                    : 'history-sidebar__menu-false'}`}>
                {!props.closeSideBar && <div className='history-sidebar__close' onClick={() => { props.setStoryFromMarker('') }}>
                    <Icon type="close-circle" />
                </div>}

                <div onClick={() => props.setCloseSideBar(!props.closeSideBar)} className='history-sidebar__toggle'>
                    <Icon type="caret-right" className={`
          ${props.closeSideBar
                            ? 'history-sidebar__toggle--open'
                            : 'history-sidebar__toggle--close'}`} />
                </div>
                <div className='history-sidebar__top history-sidebar-top'>
                    <div className='history-sidebar-top__userblock history-sidebar-userblock'>
                        <Avatar shape="square"
                            size={100} icon="user"
                            src={props.storyFromMarker.avatar}
                            className='history-sidebar-userblock__avatar' />
                        <div className='history-sidebar-userblock__name'>
                            {props.storyFromMarker.username || 'Неизветсно'}
                        </div>
                    </div>

                </div>

                <Tabs className='history-sidebar__tabs'>
                    <TabList className='history-sidebar__tabList'>
                        <Tab>История</Tab>
                        <Tab>Комментарии ({  commentList.length  || 0}) </Tab>
                    </TabList>

                    <TabPanel >
                        <div className='history-sidebar__tabPanel'>
                            <Scrollbars style={{ maxHeight: 90 + "%" }}
                                thumbMinSize={30}
                                universal={true}>
                                <div className="history-sidebar-top__title">
                                    {props.storyFromMarker.place}
                                </div>
                                <div className='history-sidebar__image'>

                                    <img src={props.storyFromMarker.commentImage} />
                                </div>

                                <div className='history-sidebar__text'>
                                    {props.storyFromMarker && props.storyFromMarker.text}
                                </div>
                                <div className='history-sidebar__footer'>
                                    <div className='history-sidebar__date'><span>дата:</span>  {props.storyFromMarker.date}</div>
                                    {currentUser ?.uid === props.storyFromMarker.userId
                                        && <Icon type="delete" className='history-sidebar__delete'
                                            onClick={() => { props.deleteComment(props.storyFromMarker); props.setStoryFromMarker('') }} />}
                                </div>
                            </Scrollbars>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='history-sidebar__tabPanel'>
                             
                            <CommentList
                             commentList={commentList}
                             storyFromMarker={props.storyFromMarker} 
                             setStoryFromMarker={props.setStoryFromMarker} />
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </>
    );
}

export default HistorySideBar;