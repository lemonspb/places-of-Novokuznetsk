import React, { useState, useEffect, useContext,  } from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import firebases from '../../services/base'
import { AuthContext } from "../Auth/Auth"
import ru from 'date-fns/locale/ru';
import { format } from 'date-fns';
import Editor from './Editor'
import { Scrollbars } from 'react-custom-scrollbars';
import './CommentList.scss'

const CommentList = ({storyFromMarker}:any) =>{

    const [value, setValue] = useState('')
    const { currentUser } = useContext(AuthContext);
    const [commentList, setCommentList] = useState<any>([])
    console.log(storyFromMarker)


   const handleChange = (e:any) => {
      setValue(e.target.value)
    };
    const handleSubmit = () => {
      if (!value) {
        return;
 
      }
    
      firebases
       .database()
       .ref(`/placeNVKZ/${storyFromMarker.commentId}/answers/`)
       .push({
        text:value,
        username: currentUser.displayName,
        avatar: currentUser.photoURL,
        

        date: format(new Date(), 'd MMMM yyyy', { locale: ru }),
        userId: currentUser.uid,
         })
      }
        useEffect(() => {
    
          firebases.database().ref(`/placeNVKZ/${storyFromMarker.commentId}/answers/`).on('value', (snapshot) => {
            if(snapshot.val()){
            const comments = snapshot.val()
            
            setCommentList(Object.values(comments))
            }
          })
        },[storyFromMarker]);
        
    return (
      <div>
        {commentList && commentList.length > 0 &&
          <Scrollbars style={{ height: 385 + "px" }}
          thumbMinSize={30}
          universal={true}>
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={commentList}
          renderItem={(item:any) => {
            console.log(item)
           return  (
            <li>
              <Comment
                author={item.username}
                avatar={item.avatar}
                content={item.text}
                datetime={item.date}
              />
            </li>
          )}}
        />
        </Scrollbars>
          }
        <Comment
        avatar={
          <Avatar
            icon="user"
            src={currentUser?.photoURL} 
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={false}
            value={value}
          />
        }
      />
    </div>
)
}



export default CommentList;