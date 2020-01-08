import React, { useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import firebases from "../../services/base"
import { Button, Form, Input, Icon } from 'antd';
import { AuthContext } from "../Auth/Auth";
import  UploadComponent  from '../UploadComponent/UploadComponent'
import './ RegistrationPage.scss'


const EditAccountPage = (props, { history }) => {

  const { currentUser } = useContext(AuthContext);
  const [newName, setNewName] = useState([]);
  const [imageFile, setImageFile] = useState()
  const getImage = (fileImg)=>{
    setImageFile(fileImg)
  }



  const handleEditProfile = (event) => {
    event.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if(imageFile){
        const avatarStgRef = firebases.storage().ref("Usuarios/" + currentUser.uid + `/${imageFile.file.name}`).put(imageFile.file.originFileObj);
        avatarStgRef.then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            currentUser.updateProfile({
              photoURL: url
            }).then(() => {
              firebases.database().ref('placeNVKZ/').on('value', (snapshot) => {
                const listUsers = snapshot.val()
                for (let variable in listUsers) {
                  if (listUsers[variable].userId === currentUser.uid) {
                    newName.push(variable)
                    setNewName(newName)
                  }
                }
              });
              newName.forEach((el) => {
                firebases.database().ref(`placeNVKZ/${el}`).update({
                  avatar: currentUser.photoURL
                }
                )
              })
            })
          });
        });
      }

        if (values.name.length !== 0) {
          const user = firebases.auth().currentUser;
          user.updateProfile({
            displayName: values.name
          }).then(() => {
            firebases.database().ref('placeNVKZ/').on('value', (snapshot) => {
              const listUsers = snapshot.val()
              for (let variable in listUsers) {
                if (listUsers[variable].userId === currentUser.uid) {
                  newName.push(variable)
                  setNewName(newName)
                }
              }
            });
            newName.forEach((el) => {
              firebases.database().ref(`placeNVKZ/${el}`).update({
                username: currentUser.displayName,
              }
              )
            })
          })
        }
      }
    })

  }




  return (
    <div className='form-wrap'>
      <UploadComponent getImage={getImage} className='form__upload'/>
      <Form onSubmit={handleEditProfile} className='form-register' >
     
       
        <Form.Item>
          {props.form.getFieldDecorator('name', {
            rules: [{ required: false }],
          })(

            <Input type="text"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder=" Введите имя" />,
          )}
        </Form.Item>
        <Button type='primary' htmlType="submit" >сохранить</Button>
        <Button type='primary'><Link to='/'>на главную</Link></Button>

      </Form>

    </div>
  );
};

const WrappedEditAccountPage = Form.create({ name: 'normal_login' })(withRouter(EditAccountPage));
export default WrappedEditAccountPage;