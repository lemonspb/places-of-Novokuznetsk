import React, { useCallback,useContext } from "react";
import { withRouter,Redirect } from "react-router-dom";
import firebases from "../../services/base"
import { Button, Form,Input } from 'antd';
import { AuthContext } from "../Auth/Auth";
import './ RegistrationPage.scss'
const SignUp = (props,{ history }) => {

  const { currentUser } = useContext(AuthContext);


  const handleSignUp = useCallback( event => {
    event.preventDefault();
        props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          try{
       firebases
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password);
      history.push("/");
        
          }
         catch{
         } 
    }
        
    })
   
  }, [history]);

  if (currentUser) {

    return <Redirect to="/edit-account" />;
   
  }


  return (
      <Form onSubmit={handleSignUp}  className='form-register'>
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
      <Button type='primary'  htmlType="submit" >Регистрация</Button>
    </Form>
  );
};

const WrappedRegistration = Form.create({ name: 'normal_login' })(withRouter(SignUp));
export default WrappedRegistration;