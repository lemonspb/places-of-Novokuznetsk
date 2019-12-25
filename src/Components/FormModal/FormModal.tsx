
import React,{useContext,useState} from 'react'
import { Form, Icon, Input, Button,Popover } from 'antd';
import firebases from '../../services/base';
import ru from 'date-fns/locale/ru';
import { format } from 'date-fns';
import './FormModal.scss'
import { AuthContext } from "../Auth/Auth";
import { Link } from 'react-router-dom';


export interface FormProp {


  latLng:{
      lat:number,
      lng: number
  }
  form:any
}



const FormModal = (props:any) => {

  const { currentUser } = useContext(AuthContext);
  const [visiblePopup, setVisiblePopup] = useState(false)

  function dateFormat(date:string){ 
    return 
    }


const handleVisibleChange = (visible:boolean) =>{
  setVisiblePopup(visible)
}

 const handleSubmit = (e:any) => {
  console.log('1')
  console.log(props.children[0].lat,props.children[0].lng,currentUser.displayName, currentUser.photoURL,currentUser.uid)

  e.preventDefault();
  console.log('2')
  console.log(props.children[0].lat,props.children[0].lng,currentUser.displayName, currentUser.photoURL,currentUser.uid,dateFormat(new Date().toLocaleString()))

    props.form.validateFields((err:any, values:any) => {
      console.log('3')
      console.log(props.children[0].lat,props.children[0].lng,currentUser.displayName, currentUser.photoURL,currentUser.uid)
      if (!err) {
        console.log('4')
        console.log(props.children[0].lat,props.children[0].lng,currentUser.displayName, currentUser.photoURL,currentUser.uid)
        console.log('Received values of form: ', values);
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
     date:format(new Date(),'d MMMM yyyy',{locale: ru})
        }).then(()=>{
      props.children[1](true)
      console.log('ох ох')
    props.form.setFieldsValue({
      text: '',
      place: ''
    });
    })

  
    
      
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
            <Input.TextArea rows={8} placeholder='Расскажите о месте' />,
          )}
        
       
        </Form.Item>
        <Form.Item className='story-form__wrap-button'>
        {!currentUser?<Popover
        content={
          <div> 
          <div>чтобы оставить записку о месте нужно зарегистрироваться</div>
        <Link to='/signup'>Регистрация</Link>
        <Link to='/login'>Войти</Link>
        </div>
        }
        title="Так нельзя"
        trigger="click"
        visible={visiblePopup}
        onVisibleChange={handleVisibleChange}
      >
          <Button type="primary" htmlType="submit" className="story-form__button">
            Готово!
          </Button>
          </Popover>:<Button type="primary" htmlType="submit" className="story-form__button">
            Готово!
          </Button>}
        </Form.Item>
      </Form>
  )
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(FormModal);

export default WrappedNormalLoginForm