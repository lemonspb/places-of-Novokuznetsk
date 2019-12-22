import React from "react";
import { withRouter,Redirect } from "react-router";
import firebases from "../../services/base"
import { Button, Form,Input } from 'antd';
const EditAccountPage = (props,{ history }) => {


    const handleEditProfile = (event) =>{
        event.preventDefault();
        props.form.validateFields((err, values) => {
                    firebases.auth().onAuthStateChanged((user) => {
                        if (user) { 
                          user.updateProfile({
                            displayName: values.name
                          })
                        }
                      }); 
        })
      
    }

 
  return (
      <Form onSubmit={handleEditProfile} >
   
      <Form.Item>
      {props.form.getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input  type="text"
            placeholder="name" />,
            )}
      </Form.Item>
      <Button type='primary'  htmlType="submit" >сохранить</Button>
    </Form>
  );
};

const WrappedEditAccountPage = Form.create({ name: 'normal_login' })(withRouter(EditAccountPage));
export default WrappedEditAccountPage;