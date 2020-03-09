import React, { useState, useEffect, useContext, useRef } from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';


const { TextArea } = Input; 


const Editor = ({ onChange, value, submitting,onSubmit }:any) => (
    <div>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Добавить комментарий
        </Button>
      </Form.Item>
    </div>
  );



  export default Editor; 