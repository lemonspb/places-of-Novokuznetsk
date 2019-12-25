import React, { useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import firebases from "../../services/base"
import { Button, Form, Input, Icon, Upload, message } from 'antd';
import { AuthContext } from "../Auth/Auth";

import './ RegistrationPage.scss'


const EditAccountPage = (props, { history }) => {

  const { currentUser } = useContext(AuthContext);
  const [newName, setNewName] = useState([]);
  const [edituccess, setEditSucsess] = useState(false)
  function normFile(e) {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };





  const handleEditProfile = (event) => {
    event.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values.upload)

        const avatarStgRef = firebases.storage().ref("Usuarios/" + currentUser.uid + `/${values.upload[0].name}`).put(values.upload[0].originFileObj);
        avatarStgRef.then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            currentUser.updateProfile({
              photoURL: url
            }).then(() => {
              firebases.database().ref("Usuarios/" + currentUser.uid).set({
                "photoUri": url
              });
            }).then(() => {
              firebases.database().ref('placeNVKZ/').on('value', (snapshot) => {
                const listUsers = snapshot.val()
                for (let variable in listUsers) {
                  if (listUsers[variable].id === currentUser.uid) {
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


        if (values.name.length !== 0) {
          const user = firebases.auth().currentUser;
          user.updateProfile({
            displayName: values.name
          }).then(() => {
            firebases.database().ref('placeNVKZ/').on('value', (snapshot) => {
              const listUsers = snapshot.val()
              for (let variable in listUsers) {
                if (listUsers[variable].id === currentUser.uid) {
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
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }



  return (
    <div className='form-wrap'>
      <Form onSubmit={handleEditProfile} className='form-register' >
        <Form.Item >
          {props.form.getFieldDecorator('upload', {
            valuePropName: 'file',
            getValueFromEvent: normFile,

            rules: [{ required: false, message: 'Please input your password!' }],
          })(
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"

              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              multiple={false}
            >
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>,
          )}
        </Form.Item>
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
      </Form>

    </div>
  );
};

const WrappedEditAccountPage = Form.create({ name: 'normal_login' })(withRouter(EditAccountPage));
export default WrappedEditAccountPage;