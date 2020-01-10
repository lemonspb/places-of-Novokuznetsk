
import React, { useContext, useState } from 'react'
import { Form, Icon, Input, Button, Popover} from 'antd';
import firebases from '../../services/base';
import ru from 'date-fns/locale/ru';
import { format } from 'date-fns';
import './FormModal.scss'
import { AuthContext } from "../Auth/Auth";
import { Link } from 'react-router-dom';
import  UploadComponent from '../UploadComponent/UploadComponent'

export interface FormProp {


  latLng: {
    lat: number,
    lng: number
  }
  form: any
}

const FormModal = (props: any) => {

  const { currentUser } = useContext(AuthContext);
  const [visiblePopup, setVisiblePopup] = useState(false)
  const [imageFile, setImageFile] = useState<any>('')



  const handleVisibleChange = (visible: boolean) => {
    setVisiblePopup(visible)
  }

  const getImage = (fileImg:any)=>{
    setImageFile(fileImg)
  }

  const handleSubmit = (e: any) => {

    e.preventDefault();

    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        
        firebases
          .database()
          .ref(`/placeNVKZ/`)
          .push({
            userId: currentUser.uid,
            latLng: props.children[0],
            text: values.text,
            username: currentUser.displayName,
            place: values.place,
            avatar: currentUser.photoURL,
            date: format(new Date(), 'd MMMM yyyy', { locale: ru }),
          }).then((snap: any) => {
            firebases.database().ref(`placeNVKZ/${snap.key}`).update({
              commentId: snap.key
            })
            return snap
            }).then((snap: any)=>{
              if(imageFile){
               const imgStgRef = firebases.storage().ref("CommentImage/" + snap.key + `/${imageFile.file.name}`).put(imageFile.file.originFileObj);
               imgStgRef.then((snapshot) => {
                snapshot.ref.getDownloadURL().then((url) => {
                  firebases.database().ref(`placeNVKZ/${snap.key}`).update({
                    commentImage: url                 
                   })
                   setImageFile('')
                  })        
            })
          }
         })

            props.children[1](true)
            props.form.setFieldsValue({
              text: '',
              place: ''
            });
        




      }
    });
  };

  return (
    <>
      <UploadComponent  getImage = {getImage}/>
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
          {!currentUser ? <Popover
            content={
              <div>
                <div>чтобы оставить записку о месте нужно <Link to='/signup'>Зарегистрироваться</Link> или</div>
                <Link to='/login'>Войти</Link>
              </div>
            }

            trigger="click"
            visible={visiblePopup}
            onVisibleChange={handleVisibleChange}
          >
            <Button type="primary" htmlType="submit" className="story-form__button">
              Готово!
          </Button>
          </Popover> : <Button type="primary" htmlType="submit" className="story-form__button">
              Готово!
          </Button>}
        </Form.Item>
      </Form>

    </>
  )
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(FormModal);

export default WrappedNormalLoginForm