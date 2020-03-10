import React, { useState, useEffect, useContext, } from 'react';
import { Comment, Avatar, List,  } from 'antd';
import firebases from '../../services/base'
import { AuthContext } from "../Auth/Auth"
import ru from 'date-fns/locale/ru';
import { format } from 'date-fns';
import Editor from './Editor'
import { Scrollbars } from 'react-custom-scrollbars';
import './CommentList.scss'

const CommentList = ({ storyFromMarker,commentList }: any) => {

  const [value, setValue] = useState('')
  const { currentUser } = useContext(AuthContext);


  const handleChange = (e: any) => {
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
        text: value,
        username: currentUser.displayName,
        avatar: currentUser.photoURL,
        date: format(new Date(), 'd MMMM yyyy', { locale: ru }),
        userId: currentUser.uid,
      }).then((snap: any) => {
        firebases.database().ref(`placeNVKZ/${storyFromMarker.commentId}/answers/${snap.key}`).update({
          answersId: snap.key
        })
      })
    setValue('')
  }



  const deleteAnswer = (id: string) => {
    firebases.database().ref(`/placeNVKZ/${storyFromMarker.commentId}/answers/${id}`).remove()
  }


  return (
    <div>

      <Scrollbars style={{ height: 385 + "px" }}
        thumbMinSize={30}
        universal={true}>
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={commentList}
          renderItem={(item: any) => {
            return (
              <li>
                <Comment
                  actions={[currentUser && currentUser.uid === item.userId &&
                    <span key="comment-nested-reply-to"
                      onClick={() => deleteAnswer(item.answersId)}>удалить</span>]}
                  author={item.username}
                  avatar={item.avatar}
                  content={item.text}
                  datetime={item.date}
                />
              </li>
            )
          }}
        />
      </Scrollbars>
      <Comment
        avatar={
          <Avatar
            icon="user"
            src={currentUser ?.photoURL}
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