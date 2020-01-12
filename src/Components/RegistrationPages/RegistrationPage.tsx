import React, { useCallback,useContext,useState } from "react";
import { withRouter,Redirect } from "react-router-dom";
import firebases from "../../services/base"
import { Button, Form,Input,Icon } from 'antd';
import { AuthContext } from "../Auth/Auth";
import './ RegistrationPage.scss'
const SignUp = (props:any) => {

  const { currentUser } = useContext(AuthContext);
  const [ registerError, setRegisterError ] = useState()

  const handleSignUp = useCallback( event => {
 
    event.preventDefault();
        props.form.validateFields((err:any, values:any) => {
        if (!err) {
          console.log('Received values of form: ', values);
          
       firebases
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password).catch(function(error) {
        
          setRegisterError('Этот email  уже используется другим аккаунтом!')
        
        });
        
          
       
    }
        
    })
   
  }, [ props.form]);

  if (currentUser) {

    return <Redirect to="/edit-account" />;
   
  }


  return (
      <div className='form-wrap'>
      <h3>Регистрация</h3>  
      <Form onSubmit={handleSignUp}  >
      <Form.Item>
      {props.form.getFieldDecorator('email', {
            rules: [{ required: true, message: 'Пожалуйста, введите свой email!' }],
          })(
            <Input  type="email"
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="email"  />,
            )}
      </Form.Item>
      <Form.Item>
      {props.form.getFieldDecorator('password', {
            rules: [{ required: true, message: 'Пожалуйста,  придумайте пароль!' }],
          })(
            <Input  type="password"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Password" />,
            )}
      </Form.Item>
      <Button type='primary'  htmlType="submit" >Регистрация</Button>
    </Form>
              <div className='form-wrap__error'>{registerError}</div>   
    </div>
  );
};

const WrappedRegistration = Form.create({ name: 'normal_login' })(withRouter(SignUp));
export default WrappedRegistration;