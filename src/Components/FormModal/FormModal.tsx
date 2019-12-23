
import React,{useContext} from 'react'
import { Form, Icon, Input, Button } from 'antd';
import firebases from '../../services/base';
import ru from 'date-fns/locale/ru';
import { format } from 'date-fns';
import './FormModal.scss'
import { AuthContext } from "../Auth/Auth";


export interface FormProp {


  latLng:{
      lat:number,
      lng: number
  }
  form:any
}



const FormModal = (props:any) => {

  const { currentUser } = useContext(AuthContext);


  function dateFormat(date:string){ 
    return format(new Date(date),'d MMMM yyyy',{locale: ru})
    }

 const handleSubmit = (e:any) => {
  e.preventDefault();
  props.children[1](true)

   
    props.form.validateFields((err:any, values:any) => {
      if (!err) {
        console.log('Received values of form: ', values.username);
         firebases
    .database()
    .ref(`/placeNVKZ/`)
    .push({
      id:currentUser.uid,
     lat:props.children[0].lat,
     lng:props.children[0].lng,
     text: values.text,
     username: currentUser.displayName,
     place:values.place,
     avatar: currentUser.photoURL,
     date: dateFormat(new Date().toLocaleString())
    });
      }
    });
  };

  return  (
  
  
      <Form onSubmit={handleSubmit} className="story-form" layout='horizontal'>
    
        <Form.Item>
        
        {props.form.getFieldDecorator('place', {
            rules: [{ required: true, message: 'Пожалуйста, напишите название места' }],
          })(
            <Input
              prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Название места"
            />,
          )}
        </Form.Item>
        <Form.Item>
        {props.form.getFieldDecorator('text', {
            rules: [{ required: true, message: 'Пожалуйста расскажите о месте' }],
          })(
            <Input.TextArea rows={8} placeholder='Расскажите о месте'/>,
          )}
        
       
        </Form.Item>
        <Form.Item className='story-form__wrap-button'>
          <Button type="primary" htmlType="submit" className="story-form__button">
            Готово!
          </Button>
        </Form.Item>
      </Form>
  )
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(FormModal);

export default WrappedNormalLoginForm