import React, { useState, useEffect, useContext, useRef } from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';




const CommentList = () =>{

    const { TextArea } = Input; 


    const Editor = ({ onChange, onSubmit, submitting, value }:any) => (
        <div>
          <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
              Add Comment
            </Button>
          </Form.Item>
        </div>
      );



    return (
        <div>

        <Comment
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <Editor
            onChange={''}
            onSubmit={''}
            submitting={''}
            value={''}
          />
        }
      />
    </div>
)
}



export default CommentList;