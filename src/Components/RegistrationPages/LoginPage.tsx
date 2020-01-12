import React, { useCallback,useContext,useState } from "react";
import { withRouter,Redirect } from "react-router";
import firebases from "../../services/base"
import { Button, Form,Input,Icon } from 'antd';
import { AuthContext } from "../Auth/Auth";
import './ RegistrationPage.scss'

const LogIn = (props:any) => {

    const { currentUser } = useContext(AuthContext);
    const [ registerError, setRegisterError ] = useState('')

  const handleSignUp = useCallback( event => {
    event.preventDefault();
        props.form.validateFields((err:any, values:any) => {
        if (!err) {
          console.log('Received values of form: ', values);
       firebases
        .auth()
        .signInWithEmailAndPassword(values.email, values.password).catch(function(error) {
 
          setRegisterError('Нет записи пользователя, соответствующей этому идентификатору. Пользователь, возможно, был удален.')
        });
          }      
    })
   
  }, [props.form]);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className='form-wrap'>
      <h3>Авторизация</h3>  
      <Form onSubmit={handleSignUp} className='form-register'>
      <Form.Item>
      {props.form.getFieldDecorator('email', {
            rules: [{ required: true, message: 'Пожалуйста,  введите email!' }],
          })(
            
            <Input 
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="email"
            placeholder="email" />,
            )}
      </Form.Item>
      <Form.Item>
      {props.form.getFieldDecorator('password', {
             rules: [{ required: true, message: 'Пожалуйста,  введите пароль!' }],
          })(
            <Input 
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            type="password"
            placeholder="Password" />,
            )}
      </Form.Item>
      <Button type='primary'  htmlType="submit" >Войти</Button>
    </Form>
    <div className='form-wrap__error'>{registerError}</div>   
    </div>
  );
};

const WrappedLogIn = Form.create({ name: 'normal_login' })(withRouter(LogIn));
export default WrappedLogIn;