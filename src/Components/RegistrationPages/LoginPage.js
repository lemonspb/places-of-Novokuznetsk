import React, { useCallback,useContext } from "react";
import { withRouter,Redirect } from "react-router";
import firebases from "../../services/base"
import { Button, Form,Input } from 'antd';
import { AuthContext } from "../Auth/Auth";
import './ RegistrationPage.scss'

const LogIn = (props,{ history }) => {

    const { currentUser } = useContext(AuthContext);

  const handleSignUp = useCallback( event => {
    event.preventDefault();
        props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          try{
       firebases
        .auth()
        .signInWithEmailAndPassword(values.email, values.password);
      history.push("/");
          }
         catch{
             console.log('ты мне че гонишь')
         } 
    }
        
    })
   
  }, [history]);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
      <Form onSubmit={handleSignUp} className='form-register'>
      <Form.Item>
      {props.form.getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input  type="email"
            placeholder="email" />,
            )}
      </Form.Item>
      <Form.Item>
      {props.form.getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input  type="password"
            placeholder="Password" />,
            )}
      </Form.Item>
      <Button type='primary'  htmlType="submit" >Войти</Button>
    </Form>
  );
};

const WrappedLogIn = Form.create({ name: 'normal_login' })(withRouter(LogIn));
export default WrappedLogIn;