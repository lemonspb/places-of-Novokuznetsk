import React,{useContext} from "react";
import { withRouter,Redirect } from "react-router";
import firebases from "../../services/base"
import { Button, Form,Input,Icon,Upload } from 'antd';
import { AuthContext } from "../Auth/Auth";

import './ RegistrationPage.scss'


const EditAccountPage = (props,{ history }) => {

  const { currentUser } = useContext(AuthContext);


 function  normFile(e){
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };


    const handleEditProfile = (event) =>{
        event.preventDefault();
        props.form.validateFields((err, values) => {
          if (!err) {
         console.log(values.upload)
         
          const avatarStgRef =  firebases.storage().ref("Usuarios/" + currentUser.uid + `/${values.upload[0].name}`).put(values.upload[0].originFileObj);
          avatarStgRef.then((snapshot)=>{
            snapshot.ref.getDownloadURL().then((url)=>{ 
                currentUser.updateProfile({
                    photoURL: url       
                }).then(()=>{
                  firebases.database().ref("Usuarios/" + currentUser.uid).set({
                    "photoUri": url   
                  });
              });
            });
        });
                    firebases.auth().onAuthStateChanged((user) => {
                        if (user) { 
                          user.updateProfile({
                            displayName: values.name
                          })
                        }
         
                        }); 

                        

                      } 
                      })


      
    }

  
    

  return (
      <Form onSubmit={handleEditProfile} className='form-register' >
     <Form.Item label="Upload" >
          {props.form.getFieldDecorator('upload', {
             valuePropName: 'fileList',
             getValueFromEvent: normFile,
          })(
            <Upload name="logo" listType="picture" multiple={true}>
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>,
          )}
        </Form.Item>
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